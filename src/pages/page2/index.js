import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import { Search } from "@/components/search";

// import _ from "lodash";
const App = () => {
  return <div className="wrap"> 
  <div>页面2</div>
  <Search />
  <div>测试热更新</div>
   </div>;
};
ReactDOM.createRoot(document.getElementById("root1")).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
