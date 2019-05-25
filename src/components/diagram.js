// UI element to enter data
import React, { useEffect, useState } from "react";
import { withDataManager } from "./dataManager";

function Diagram({ subscribe, publish, DATA_STATE }) {
  const [diagram, setDiagram] = useState({});
  const [diagramState, setDiagramState] = useState(DATA_STATE.UNKNOWN);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    publish("diagram-state", { state: diagramState });
  }, [diagramState]);

  useEffect(() => {
    if (!isSubscribed) {
      subscribe(["filter"], newFilter => {
        if (newFilter.workflow !== diagram.workflow) {
          setDiagramState(DATA_STATE.LOADING);
          // Add fetching Data here
          setTimeout(
            () => {
              setDiagram({ workflow: newFilter.workflow });
              setDiagramState(DATA_STATE.LOADED);
            },
            1500,
            "funky"
          );
        }
      });
      setIsSubscribed(true);
    }
  });

  return (
    <div className="diagram-panel">
      <h3>Diagram</h3>
      <span>diagram state: {diagramState}</span>
      {diagramState === DATA_STATE.LOADED &&
        (Object.keys(diagram).length > 0 && (
          <div className="diagram-canvas">
            <span>{diagram.workflow}</span>
          </div>
        ))}
    </div>
  );
}

export default withDataManager(Diagram);
