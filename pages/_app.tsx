import "antd/dist/antd.css";
import "../styles/globals.css";
import globalStyles from "../styles/globalStyles";
import type { AppProps } from "next/app";
import Router from "next/router";
import { wrapper } from "../stores/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// https://vpilip.com/next-js-page-loading-indicator-improve-ux-of-next-js-app/
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(MyApp);
