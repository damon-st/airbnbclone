import "../styles/globals.css";
import type { AppProps } from "next/app";

import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progres = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 50,
});

Router.events.on("routeChangeStart", progres.start);
Router.events.on("routeChangeComplete", progres.finish);
Router.events.on("routeChangeError", progres.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
