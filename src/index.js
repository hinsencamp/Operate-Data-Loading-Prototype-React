import React from "react";
import ReactDOM from "react-dom";

import { DataManager } from "./components/dataManager";
import Filter from "./components/filter";
import Overlays from "./components/overlays";
import Diagram from "./components/diagram";
import Header from "./components/header";
import Polling from "./components/polling";
import GlobalDataLoad from "./components/globalDataLoad";

import "./styles.css";

function App() {
  return (
    <DataManager>
      <div className="App">
        <h1>Operate Data Management Prototype</h1>
        <GlobalDataLoad />
        <Polling />
        <Header />
        <div className="content">
          <Filter />
          <div className="diagram-section">
            <Diagram />
            <Overlays />
          </div>
        </div>
      </div>
    </DataManager>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
