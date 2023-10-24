/** @jsxImportSource @emotion/react */

import { PulseLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <PulseLoader color="#36d7b7" />
    </div>
  );
};

export default LoadingSpinner;
