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

        document.addEventListener('click', (e: any) => {
          if(e?.target?.id == 'graphLauncher'){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById("graphPlaceholder").innerHTML = domLoading;
            console.log('Graph Tab loaded');     
            setTimeout(() => {
              
              document.getElementById('graphDiseaseDropDown')?.addEventListener('click', (e: any) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.getElementById("graphPlaceholder").innerHTML = domLoading;
                const diseaseName = e?.target?.value.toString().toLowerCase()
                                      .replace(/[\s,\,\/]{1,}/g,'-')
                                      .replace(/\./g,'')
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const baseUrl = `${location.origin.toString()}/api/`;
  
  function loadGraphToDisease(disease = null){
    console.log(`Passed value id: `, disease);
    const urlDisease = `${baseUrl}/genetics/condition/${disease ?? '10q26-deletion-syndrome'}`;
    
    httpRequest(urlDisease)
    .then(async (result) => {
      console.log(`**** Using promise now`);

      let disease = JSON.parse(result as string);
      disease = disease?.condition;
      const diseaseRelations: any = disease['related-gene-list'];
      
      /** Start of multiple parsing */
      let _geneRequest = null; //TOBE REMOVED
      const allNodes = [];
      for(const relation of (diseaseRelations || [])){
        const _geneId = relation['related-gene']['gene-symbol'];
        let _urlComplement = `chromosome/${_geneId}`

        if(isNaN(_geneId))
          _urlComplement = `gene/${_geneId.toString().toLowerCase()}`

        const _urlGenes = `${baseUrl}/genetics/${_urlComplement}`;
        try{
          _geneRequest = (await httpRequest(_urlGenes));
          const _geneResult = JSON.parse(_geneRequest as string);

          let _parsedResult: any;

          if(_geneResult?.gene)
            _parsedResult = DiseaseRelationParser.genes(_geneResult);
    
          if(_geneResult?.chromosome)
            _parsedResult = DiseaseRelationParser.chromosomes(_geneResult);
    
          allNodes.push(..._parsedResult.chromosomeNodes);

        }catch(err){}
      }

      const chromosomeEdges = [...allNodes].map((edge) => (
        { from: edge.id, to: 0 }
      ));
      
      const nodes = [{ id: 0, label: `${disease?.name}`, group: 0 }, ...allNodes];
      renderGraph({ nodes: nodes, edges: chromosomeEdges});

    });
    
  }

  function renderGraph(data: object){

    const container = document.getElementById("graphPlaceholder");
    const options = {
      nodes: {
        shape: "dot",
        size: 16,
        font: {
          color: 'black'
        }
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new vis.Network(container, data, options);

  }

  function httpRequest(url: string){

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      try {
        xhr.open('GET',url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
            if(xhr.status == 500){
              return reject('');    
            }  
            resolve(xhr.responseText);
          }
        }  
      } catch (error) {
        reject('');
      }

    })

  }

  type DisieaseRelationType = {
    chromosomes: Array<string> | string, 
    chromosomeNodes: Array<object> | string
  }

  let relationId = 0;
  class DiseaseRelationParser {

    static genes(dataSource: any): DisieaseRelationType {
      const chromosomes = dataSource['gene']['related-health-condition-list'] ?? [];
      const chromosomeNodes = [...chromosomes].map(gene => (
        { 
          id: ++relationId, 
          label: `${gene['related-health-condition']?.name}`, group: 'gene' 
        }
      ));
      return { chromosomes, chromosomeNodes }
    }

    static chromosomes(dataSource: any) : DisieaseRelationType {
      let chromosomes = dataSource['chromosome']['chromosome-summary']['related-health-condition-list']['related-health-condition'] ?? [];
      if(chromosomes?.name)
        chromosomes = [chromosomes];
        const chromosomeNodes = [...chromosomes].map(chromo => (
          { 
            id: ++relationId, 
            label: `${chromo?.name?._text}`, group: 'chromo' 
          }
      ));
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
