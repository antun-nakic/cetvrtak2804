import React from "react";

const iscrtajUsredCrvenogDiva = (PrimljenaKomponenta) => {
  return function () {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <PrimljenaKomponenta />
      </div>
    );
  };
};

export default iscrtajUsredCrvenogDiva;
