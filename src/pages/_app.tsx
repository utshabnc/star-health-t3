// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NavFoot } from "../components/NavFoot";
import Head from "next/head";

{
  /* <React.StrictMode>
    <BrowserRouter>
      <NavFoot>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='doctor/:id' element={<DoctorDetails />} />
          <Route path='doctor/:id/reviews' element={<DoctorReviews />} />
          <Route path='drug/:id' element={<DrugDetails />} />
          <Route path='manufacturer/:id' element={<ManufacturerDetails />} />
          <Route path='state/:id' element={<StateDetails />} />
          <Route path='search' element={<StateDetails />} />

        </Routes>
      </NavFoot>
    </BrowserRouter>
  </React.StrictMode> */
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  let domLoading: any = null;
  setTimeout(() => {

    const loadVisLib = setTimeout(() => {

      if(document != undefined){

        const visLib = document.createElement('script');
        visLib.src = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js';
        document.getElementsByTagName('head')[0]?.appendChild(visLib);

        domLoading = document.getElementById('domLoading')?.innerHTML;
        if(document.getElementById('initialLoadingSpinner'))
          document.getElementById('initialLoadingSpinner').style.display = 'none';
        
        if(document.getElementById('headMapPlaceholder'))
          document.getElementById('headMapPlaceholder').style.display = 'block';

        document.addEventListener('click', (e: any) => {
          if(e?.target?.id == 'graphLauncher'){

            document.getElementById('graphPlaceholder').innerHTML = domLoading;
            console.log('Graph Tab loaded');     
            setTimeout(() => {
              
              document.getElementById('graphDiseaseDropDown')?.addEventListener('click', (e: any) => {
                
                document.getElementById('graphPlaceholder').innerHTML = domLoading;
                let diseaseName = e?.target?.value.toString().split('/');
                diseaseName = diseaseName[diseaseName.length - 1];
                loadGraphToDisease(diseaseName);

              });

              loadGraphToDisease();
            },1000)
          }
        });
        clearInterval(loadVisLib);     
        
      }

    }, 2000);

  }, 5000);

  function loadGraphToDisease(disease = null){

    const urlDisease = `/api/genetics/condition/${disease ?? '10q26-deletion-syndrome'}`;
    
    fetch(urlDisease).then(async (result) => {

      let disease = await result.json();
      disease = disease?.condition;
      const diseaseRelations: any = disease['related-gene-list'];
      
      const allNodes = [];
      DiseaseRelationParser.resetTotals();

      for(const relation of (diseaseRelations || [])){
        const _geneId = relation['related-gene']['gene-symbol'];
        let _urlComplement = `chromosome/${_geneId}`

        if(isNaN(_geneId)) _urlComplement = `gene/${_geneId.toString().toLowerCase()}`
        const _urlGenes = `/api/genetics/${_urlComplement}`;

        try{
          const _geneRequest = await fetch(_urlGenes);
          const _geneResult = await _geneRequest.json();
          let _parsedResult: any;
          
          if(_geneResult?.gene) _parsedResult = DiseaseRelationParser.genes(_geneResult);
          if(_geneResult?.chromosome) _parsedResult = DiseaseRelationParser.chromosomes(_geneResult);
          allNodes.push(..._parsedResult.chromosomeNodes);

        }catch(err){}
      }

      const chromosomeEdges = [...allNodes].map((edge) => ({ from: edge.id, to: 0 }));
      const nodes = [{ id: 0, label: `${disease?.name}`, group: 0 }, ...allNodes];
      renderGraph({ nodes: nodes, edges: chromosomeEdges});

    });
    
  }

  function renderGraph(data: object){

    const container = document.getElementById("graphPlaceholder");
    const options = {
      nodes: {
        shape: "dot", size: 16,
        font: { color: 'black' }
      },
      groups:{
        gene: {
          color: { background: 'red', border: 'black' }
        },
        chromo: {
          color: { background: 'yellow', border: 'black' }
        }
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
    };

    new vis.Network(container, data, options);
    document.getElementById('totalGenesPlaceholder').innerHTML = globals.totalGenes;
    document.getElementById('totalChromosPlaceholder').innerHTML = globals.totalChromosomes;

  }

  type DisieaseRelationType = {
    chromosomes: Array<string> | string, 
    chromosomeNodes: Array<object> | string
  }

  const globals = {
    relationId: 0,
    totalGenes: 0,
    totalChromosomes: 0
  }

  class DiseaseRelationParser {

    static resetTotals(){
      globals.totalGenes = 0;
      globals.totalChromosomes = 0;
    }

    static addOneGenes(){
      globals.totalGenes++;
      return ++globals.relationId;
    }

    static addOneChromo(){
      globals.totalChromosomes++;
      return ++globals.relationId;
    }

    static genes(dataSource: any): DisieaseRelationType {
      const chromosomes = dataSource['gene']['related-health-condition-list'] ?? [];
      const chromosomeNodes = [...chromosomes].map(gene => (
        {id: DiseaseRelationParser.addOneGenes(), label: `${gene['related-health-condition']?.name}`, group: 'gene'}
      ));
      DiseaseRelationParser.totalGenes = chromosomeNodes.length;
      return { chromosomes, chromosomeNodes }
    }

    static chromosomes(dataSource: any) : DisieaseRelationType {
      let chromosomes = dataSource['chromosome']['chromosome-summary']['related-health-condition-list']['related-health-condition'] ?? [];
      if(chromosomes?.name)
        chromosomes = [chromosomes];
        const chromosomeNodes = [...chromosomes].map(chromo => (
          {id: DiseaseRelationParser.addOneChromo(), label: `${chromo?.name?._text}`, group: 'chromo'}
      ));
      DiseaseRelationParser.totalChromosomes = chromosomeNodes.length;
      return { chromosomes, chromosomeNodes }
    }

  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>StarHealth</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
      </Head>
      <NavFoot>
        <Component {...pageProps} />
        <ToastContainer />
      </NavFoot>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
