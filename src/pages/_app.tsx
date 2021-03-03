import { SideBar } from "../components/SideBar";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
        <div>
          <SideBar />
          <Component {...pageProps} />
        </div>
    );
}

export default MyApp
