import React from "react";
import "./loader.css"; // We'll move CSS here

const Loader = () => {
  return (
    <div className="skeleton">
      <span className="loading-text"></span>
    </div>
  );
};

export default Loader;
