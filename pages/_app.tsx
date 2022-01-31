import "../styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import type { AppProps } from "next/app";
import { NavigationBar } from "../src/components/navigationBar/NavigationBar";

import { useRef } from "react";
import { Toast } from "primereact/toast";

function MyApp({ Component, pageProps }: AppProps) {
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast}></Toast>
      <NavigationBar></NavigationBar>
      <Component toast={toast} {...pageProps} />
    </>
  );
}

export default MyApp;
