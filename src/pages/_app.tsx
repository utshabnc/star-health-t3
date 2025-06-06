import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { trpc } from "../utils/trpc";
import "../assets/scripts/Graph";

import "../styles/globals.css";
import { NavFoot } from "../components/NavFoot";
import Head from "next/head";

import { queryClient, QueryClientProvider , ReactQueryDevtools } from "../utils/queryClient";

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
  return (
    <>
      <Head>
        <title>StarHealth</title>
        <meta property="og:title" content="StarHealth" key="title" />
      </Head>
      <SessionProvider session={session}>
        <NavFoot>
          <Component {...pageProps} />
          <ToastContainer />
        </NavFoot>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
