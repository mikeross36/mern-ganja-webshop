import PulsLoader from "react-spinners/PulseLoader";

export default function Loader() {
  return (
    <div>
      <PulsLoader
        style={loaderStyle}
        color="#1d976c"
        size={50}
        speedMultiplier={0.7}
      />
    </div>
  );
}

const loaderStyle: React.CSSProperties | undefined = {
  width: "300px",
  height: "50vh",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};
