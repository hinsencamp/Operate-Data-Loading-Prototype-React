// context which loads data which is gobally consumed
import React, { useState, useEffect } from "react";
import { withDataManager } from "./dataManager";

function Polling({ publish, DATA_STATE }) {
  const [tick, setTick] = useState(false);

  useEffect(() => {
    publish("polling-tick", { pollingTick: true });
    // setTimeOut();
    // pollTimer();
  }, [tick]);

  function setTimeOut() {
    setTimeout(
      () => {
        setTick(prevTick => !prevTick);
      },
      3000,
      "funky"
    );
  }

  function pollTimer() {
    var timeleft = 3;
    var downloadTimer = setInterval(function() {
      console.log("next tick in:", timeleft);
      timeleft -= 1;
      if (timeleft <= 0) clearInterval(downloadTimer);
    }, 1000);
  }

  return null;
}

export default withDataManager(Polling);
