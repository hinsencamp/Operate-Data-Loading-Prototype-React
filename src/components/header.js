// UI element to enter data
import React, { useState, useEffect } from "react";
import { withDataManager } from "./dataManager";

function Header({ subscribe }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    if (!isSubscribed) {
      subscribe(["metrics"], newMetrics => {
        if (metrics !== newMetrics) {
          setMetrics(newMetrics);
        }
      });
      setIsSubscribed(true);
    }
  });

  return (
    <div className="header">
      <ul className="header-metrics">
        <li>running:{metrics.running}</li>
        <li>active:{metrics.active}</li>
        <li>incident:{metrics.incident}</li>
      </ul>
    </div>
  );
}

export default withDataManager(Header);
