// context which manages the communication between
// components

import React, { useState } from "react";

const DataManagerContext = React.createContext({});

function withDataManager(Component) {
  function WithDataManager(props) {
    return (
      <DataManagerContext.Consumer>
        {contextValue => <Component {...props} {...contextValue} />}
      </DataManagerContext.Consumer>
    );
  }

  withDataManager.WrappedComponent = Component;

  withDataManager.displayName = `WithModal(${Component.displayName ||
    Component.name ||
    "Component"})`;

  return WithDataManager;
}

const DATA_STATE = {
  UNAVAILABLE: "unavailable",
  LOAD_FAILED: "failed",
  LOADING: "loading",
  UNKNOWN: "unknown",
  LOADED: "loaded"
};

function DataManager(props) {
  const [subscriptions, setSubscriptions] = useState([]);

  function subscribe(topics, callback) {
    setSubscriptions(prevSubscriptions => [
      ...prevSubscriptions,
      { topics, callback }
    ]);
  }

  function publish(topic, value) {
    subscriptions.forEach(subscriber => {
      const isSubscribed = !!subscriber.topics.find(
        subscriberTopic => subscriberTopic === topic
      );

      if (isSubscribed) {
        subscriber.callback(value);
      }
    });
  }

  return (
    <DataManagerContext.Provider
      value={{
        subscribe,
        publish,
        DATA_STATE
      }}
    >
      {props.children}
    </DataManagerContext.Provider>
  );
}

export { DataManager, withDataManager };
