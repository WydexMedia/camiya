import React from "react";
import { FadeLoader } from "react-spinners";

const Loader: React.FC = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <FadeLoader color="#0f766e" height={18} width={5} radius={2} margin={2}/>
  </div>
);

export default Loader;
