// UI element to enter data
import React, { useState, useEffect } from "react";
import { withDataManager } from "./dataManager";

function Filter({ publish }) {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState({});

  useEffect(() => {
    publish("filter", filter);
  }, [filter]);

  return (
    <div className="filters-panel">
      <h3>Filters</h3>
      <p className="workflow-filter">
        <span>Workflow</span>
        <input onChange={e => setInputValue(e.target.value)} />
      </p>
      <button onClick={() => setFilter({ workflow: inputValue })}>Apply</button>
    </div>
  );
}

export default withDataManager(Filter);
