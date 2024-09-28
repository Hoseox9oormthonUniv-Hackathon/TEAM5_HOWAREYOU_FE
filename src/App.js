import React from "react";
import Router from "./router/Router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
