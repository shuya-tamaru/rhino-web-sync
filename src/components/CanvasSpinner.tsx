import { Html } from "@react-three/drei";
import { ThreeDots } from "react-loader-spinner";

function CanvasSpinner() {
  return (
    <Html style={{ width: "100%" }}>
      <style>
        {`@keyframes flash {
            0%,100% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }
        }`}
      </style>
      <div style={{ background: "#000", width: "100%", height: "100%" }}>
        <ThreeDots
          width={"40px"}
          height={"40"}
          color={"red"}
          radius="9"
          ariaLabel="mutating-dots-loading"
          visible={true}
        />
        <p
          style={{
            textAlign: "center",
            color: "#fff",
            fontWeight: "600",
            animation: `flash 1.0s linear infinite`,
          }}
        >
          Loading...
        </p>
      </div>
    </Html>
  );
}

export default CanvasSpinner;
