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
    const urlGenes = `${baseUrl}/genetics/chromosome/$id`;

    httpRequest(urlDisease, parseDisease);
    
  }

  function parseDisease(diseaseData){
    console.log(`Load from parse Disease`);
    
    let disease = JSON.parse(diseaseData);
    disease = disease?.condition;
    const geneId = disease['related-gene-list'][0]['related-gene']['gene-symbol'];

    const nodes = [{ id: 0, label: `${disease?.name}`, group: 0 }];
    
    const edges = [/* { from: 1, to: 0 } */];
    
    // create a network
    const container = document.getElementById("graphPlaceholder");
    const data = { nodes: nodes, edges: edges,};

    const options = {
      nodes: {
        shape: "dot", size: 30,
        font: { size: 32, color: "#ffffff",},
        borderWidth: 2,
      },
      edges: { width: 2,},
    };

    new vis.Network(container, data, options);
     
  }

  function httpRequest(url, callback){

    const xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        callback(xhr.responseText)
      }
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
