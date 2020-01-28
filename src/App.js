import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import "./assets/style/main.scss";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Content />
      </Router>
    </>
  );
}

export default App;
