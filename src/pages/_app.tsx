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
              initialLoad();
            },1000)
          }
        });
        clearInterval(loadVisLib);     
        
      }

    }, 2000);

  }, 5000);

  const baseUrl = `http://localhost:3000/api/`;
  
  function initialLoad(){
    const urlDisease = `${baseUrl}/genetics/condition/15q24-microdeletion`;
    
    httpRequest(urlDisease)
    .then(async (result) => {
      console.log(`Using promise now`);
      let nodeId = 0;

      let disease = JSON.parse(result);
      disease = disease?.condition;
      const geneId = disease['related-gene-list'][0]['related-gene']['gene-symbol'];
      const urlGenes = `${baseUrl}/genetics/chromosome/${geneId}`;
      
      let geneRequest = await httpRequest(urlGenes);
      geneRequest = JSON.parse(geneRequest);
      const chromosomes = geneRequest['chromosome']['chromosome-summary']['related-health-condition-list']['related-health-condition']
      
      const chromosomeNodes = [...chromosomes].map(chromo => (
        { id: ++nodeId, label: `${chromo?.name?._text}`, group: 0 }
      ))

      const chromosomeEdges = [...chromosomes].map(chromo => (
        { from: nodeId--, to: 0 }
      ));

      const nodes = [{ id: 0, label: `${disease?.name}`, group: 0 }, ...chromosomeNodes];
      
      // create a network
      const container = document.getElementById("graphPlaceholder");
      const data = { nodes: nodes, edges: chromosomeEdges,};
  
      const options = {
        nodes: {
          shape: "dot",
          size: 16,
          font: {
            color: 'white'
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

    });
    
  }

  function httpRequest(url){

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
