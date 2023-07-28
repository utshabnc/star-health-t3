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

    const visLib = document.createElement('script');
    visLib.src = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js';
    document.getElementsByTagName('head')[0]?.appendChild(visLib);

    document.addEventListener('click', (e) => {
      if(e?.target?.id == 'graphLauncher'){
        console.log('Graph Tab loaded');        
        setTimeout(() => {
          initialLoad();
        },1000 / 2)
      }
    });
  }, 5000);

  function initialLoad(){
    //
    const color = "gray";
    const len = undefined;

    const nodes = [
      { id: 0, label: "0", group: 0 },
      { id: 1, label: "1", group: 0 },
      { id: 2, label: "2", group: 0 },
      { id: 3, label: "3", group: 1 },
      { id: 4, label: "4", group: 1 },
      { id: 5, label: "5", group: 1 },
      { id: 6, label: "6", group: 2 },
      { id: 7, label: "7", group: 2 },
      { id: 8, label: "8", group: 2 },
      { id: 9, label: "9", group: 3 },
      { id: 10, label: "10", group: 3 },
      { id: 11, label: "11", group: 3 },
      { id: 12, label: "12", group: 4 },
      { id: 13, label: "13", group: 4 },
      { id: 14, label: "14", group: 4 },
      { id: 15, label: "15", group: 5 },
      { id: 16, label: "16", group: 5 },
      { id: 17, label: "17", group: 5 },
      { id: 18, label: "18", group: 6 },
      { id: 19, label: "19", group: 6 },
      { id: 20, label: "20", group: 6 },
      { id: 21, label: "21", group: 7 },
      { id: 22, label: "22", group: 7 },
      { id: 23, label: "23", group: 7 },
      { id: 24, label: "24", group: 8 },
      { id: 25, label: "25", group: 8 },
      { id: 26, label: "26", group: 8 },
      { id: 27, label: "27", group: 9 },
      { id: 28, label: "28", group: 9 },
      { id: 29, label: "29", group: 9 },
    ];
    const edges = [
      { from: 1, to: 0 },
      { from: 2, to: 0 },
      { from: 4, to: 3 },
      { from: 5, to: 4 },
      { from: 4, to: 0 },
      { from: 7, to: 6 },
      { from: 8, to: 7 },
      { from: 7, to: 0 },
      { from: 10, to: 9 },
      { from: 11, to: 10 },
      { from: 10, to: 4 },
      { from: 13, to: 12 },
      { from: 14, to: 13 },
      { from: 13, to: 0 },
      { from: 16, to: 15 },
      { from: 17, to: 15 },
      { from: 15, to: 10 },
      { from: 19, to: 18 },
      { from: 20, to: 19 },
      { from: 19, to: 4 },
      { from: 22, to: 21 },
      { from: 23, to: 22 },
      { from: 22, to: 13 },
      { from: 25, to: 24 },
      { from: 26, to: 25 },
      { from: 25, to: 7 },
      { from: 28, to: 27 },
      { from: 29, to: 28 },
      { from: 28, to: 0 },
    ];

    // create a network
    const container = document.getElementById("graphPlaceholder");
    const data = {
      nodes: nodes,
      edges: edges,
    };
    const options = {
      nodes: {
        shape: "dot",
        size: 30,
        font: {
          size: 32,
          color: "#ffffff",
        },
        borderWidth: 2,
      },
      edges: {
        width: 2,
      },
    };
    const network = new vis.Network(container, data, options);

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
