import React from "react";
import ReactDOM from "react-dom/client";
import _ from "lodash";
import "./index.less";
const App = function () {

  return (
    <div className="wrap">
      <div> page3 </div> 
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root1")).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
