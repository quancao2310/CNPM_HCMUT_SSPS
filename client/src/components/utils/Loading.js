import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  borderColor: "red",
  margin: "auto"
};

function Loading() {
  return (
    <div className="my-4">
      <ClipLoader
        color="#ffffff"
        cssOverride={override}
        size={150}
      />
    </div>
  );
}

export default Loading;