# Operate-Data-Loading-Prototype-React

#Components 

## SubscriptionManager Context 
pub/sub based implementation. Make `publish`, `subscribe` and `Loading state` available to all child component via props.


## GlobalDataLoad
Loads data which is needed by multiple not directly related components.

Dependencies: 
* dataManager
  * publishes loading state 
  * publishes fetched data 
* polling 
  * subscribed to polling message 

## Polling 
Sets a fixed intervall used to regularly fetch data to update the app.

Dependencies: 
* dataManager
  * publishes intervall

## Regular Components
User focused components.

### Header 
shows metrics which are loaded globally and polled in regular intervalls.

Dependencies: 
* dataManager
  * subscribed to fetched data. 


### Filter 
Allows user to enter workflow name. 

Dependencies: 
* dataManager
  * publishes new workflow name

### Diagram
Shows diagram based on workflow name. 

Dependencies: 
* dataManager
  * publishes diagram loading state
  * subscribed to new workflow name



### Overlays 
Fetches overlays data for diagram, data is dependend on selected filter. Overlays can only be rendered after diagram has successfully loaded.

Dependencies: 
* dataManager
  * subscribed to diagram loading state
  * subscribed to new workflow name


 
