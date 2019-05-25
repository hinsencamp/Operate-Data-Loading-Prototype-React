// context which loads data which is gobally consumed
import React, { useState, useEffect } from "react";
import { withDataManager } from "./dataManager";

function GlobalDataLoad({ publish, subscribe, DATA_STATE }) {
  const [metrics, setMetrics] = useState({});
  const [metricState, setMetricState] = useState(DATA_STATE.UNKNOWN);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (Object.keys(metrics).length === 0) {
      loadMetrics();
    }
  });

  useEffect(() => {
    if (!isSubscribed) {
      subscribe(["polling-tick"], pollingTick => {
        if (pollingTick) {
          loadMetrics();
        }
      });
      setIsSubscribed(true);
    }
  });

  useEffect(() => {
    publish("metrics-state", { state: metricState });
  }, [metricState]);

  useEffect(() => {
    publish("metrics", metrics);
  }, [metrics]);

  function loadMetrics() {
    setMetricState(DATA_STATE.LOADING);
    setTimeout(
      () => {
        setMetrics({ running: 100, active: 50, incident: 50 });
        setMetricState(DATA_STATE.LOADED);
      },
      500,
      "funky"
    );
  }

  return null;
}

export default withDataManager(GlobalDataLoad);
