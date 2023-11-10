import {Outlet} from "react-router-dom";
import GlobalStyle from "../src/assets/style/GlobalStyle"

import {Footer} from "./components/Footer.jsx";
import {Header} from "./components/Header.jsx";

function App() {
  return (
    <div>
    <GlobalStyle />
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
