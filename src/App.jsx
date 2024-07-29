import React, { Suspense } from "react";
import "./App.css";
import Products from "./components/Products.jsx";
const LazyProduct = React.lazy(() => import("./components/Products.jsx"));
const App = () => {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback="Loading Products.....">
        <Products />
      </Suspense>
    </div>
  );
};

export default App;
