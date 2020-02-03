import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import "./assets/style/main.scss";
import { useHistory } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Content />
        <Scroll />
      </Router>
    </>
  );
}

function Scroll() {
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  return null;
}

export default App;
