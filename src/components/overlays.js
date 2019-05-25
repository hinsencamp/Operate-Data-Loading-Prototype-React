// loads data locally, requires diagram to be rendered to be able to render

import React, { useEffect, useState } from "react";
import { withDataManager } from "./dataManager";

function Overlays({ subscribe, publish, DATA_STATE }) {
  const [diagramState, setDiagramState] = useState(DATA_STATE.UNKNOWN);
  const [overlayState, setOverlayState] = useState(DATA_STATE.UNKNOWN);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!isSubscribed) {
      subscribe(["diagram-state"], newDiagramStatus => {
        if (newDiagramStatus.state !== diagramState) {
          setDiagramState(newDiagramStatus.state);

          if (newDiagramStatus.state === DATA_STATE.LOADING) {
            loadOverlays();
          }
        }
      });
      setIsSubscribed(true);
    }
  });

  function loadOverlays() {
    setOverlayState(DATA_STATE.LOADING);
    setTimeout(
      () => {
        setOverlayState(DATA_STATE.LOADED);
      },
      2500,
      "funky"
    );
  }

  return diagramState === DATA_STATE.LOADED &&
    overlayState === DATA_STATE.LOADED ? (
    <div className="overlays-panel">
      <h3>Overlays</h3>
      <div className="overlays-canvas">
        <span>diagram state: {diagramState}</span>
        <span>overlay state: {overlayState}</span>
      </div>
    </div>
  ) : (
    <div className="overlay-state">
      <span>overlay state: {overlayState}</span>
    </div>
  );
}

export default withDataManager(Overlays);
