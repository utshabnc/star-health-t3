import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import 'react-toastify/dist/ReactToastify.css';
import '../assets/vis/dist/vis.css'
import { ToastContainer } from 'react-toastify';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NavFoot } from "../components/NavFoot";
import Head from "next/head";
import { chown } from "fs";

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

  setTimeout(() => {

    const loadVisLib = setTimeout(() => {

      if(document != undefined){

        const visLib = document.createElement('script');
        visLib.src = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js';
        document.getElementsByTagName('head')[0]?.appendChild(visLib);

        document.addEventListener('click', (e) => {
          if(e?.target?.id == 'graphLauncher'){
            console.log('Graph Tab loaded');     
            setTimeout(() => {
              
              document.getElementById('graphDiseaseDropDown')?.addEventListener('click', (e) => {

                const diseaseName = e?.target?.value.toString().toLowerCase().replace(/ /g,'-').replace(/\./g,'');                
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

  const baseUrl = `http://localhost:3000/api/`;
  
  function loadGraphToDisease(disease = null){
    console.log(`Passed value id: `, disease);
    
    const urlDisease = `${baseUrl}/genetics/condition/${disease ?? '10q26-deletion-syndrome'}`;
    
    httpRequest(urlDisease)
    .then(async (result) => {
      console.log(`Using promise now`);

      let disease = JSON.parse(result as string);
      disease = disease?.condition;
      const geneId: any = disease['related-gene-list'][0]['related-gene']['gene-symbol'];
      let urlComplement = `chromosome/${geneId}`
      if(isNaN(geneId))
        urlComplement = `gene/${geneId.toString().toLowerCase()}`

      const urlGenes = `${baseUrl}/genetics/${urlComplement}`;
      
      const geneRequest = await httpRequest(urlGenes);
      const geneResult = JSON.parse(geneRequest as string);
      
      let parsedResult: any;

      if(geneResult?.gene)
        parsedResult = DiseaseRelationParser.genes(geneResult);

      if(geneResult?.chromosome)
        parsedResult = DiseaseRelationParser.chromosomes(geneResult);

      const { chromosomes, chromosomeNodes } = parsedResult;

      const chromosomeEdges = [...chromosomes].map(() => (
        { from: DiseaseRelationParser.relationId--, to: 0 }
      ));

      const nodes = [{ id: 0, label: `${disease?.name}`, group: 0 }, ...chromosomeNodes];
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

    new vis.Network(container, data, options);

  }

  function httpRequest(url: string){

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('GET',url,true);
      xhr.send();
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          resolve(xhr.responseText)
        }
      }

    })

  }

  type DisieaseRelationType = {
    chromosomes: Array<string> | string, 
    chromosomeNodes: Array<object> | string
  }

  class DiseaseRelationParser {

    static relationId = 0;

    static genes(dataSource: any): DisieaseRelationType {
      const chromosomes = dataSource['gene']['related-health-condition-list'] ?? [];
      const chromosomeNodes = [...chromosomes].map(gene => (
        { id: ++this.relationId, label: `${gene['related-health-condition']?.name}`, group: 'gene' }
      ))

      return { chromosomes, chromosomeNodes }
    }

    static chromosomes(dataSource: any) : DisieaseRelationType {
      let chromosomes = dataSource['chromosome']['chromosome-summary']['related-health-condition-list']['related-health-condition'] ?? [];
      if(chromosomes?.name)
        chromosomes = [chromosomes];
        const chromosomeNodes = [...chromosomes].map(chromo => (
          { id: ++this.relationId, label: `${chromo?.name?._text}`, group: 'chromo' }
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
