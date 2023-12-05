import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  borderColor: "red",
  margin: "auto"
};

function Loading({ loading }) {
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading my-5">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
}

export default Loading;