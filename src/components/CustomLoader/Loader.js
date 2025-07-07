import React from "react";

const Loader = () => {
  return (
    <div className="text-center py-4">
      <i className="fas fa-spinner fa-spin fa-2x text-primary" />
      <p className="mt-2 mb-0">Loading data...</p>
    </div>
  );
};

export default Loader;
