import React from "react";
import ReactDOM from "react-dom/client";
import _ from "lodash";
import { hellow } from "@/hellow";
import "./index.less";
import { Search } from "@/components/search";
import axios from "axios";
const App = function () {
  const arr = [1, 2, 3, 4];
  _.forEach();
  axios.get("http://10.8.145.144:8080/cibStyle/getUserRole").then((res) => {
    console.log(res);
  });
  return (
    <div className="wrap">
      <div> 测试一下 </div> 
      <Search />
      <div className="head"> {hellow("hellow", "丁秀", "word")} </div>{" "}
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root1")).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
