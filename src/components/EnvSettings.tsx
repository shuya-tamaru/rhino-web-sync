import { Environment } from "@react-three/drei";

export default function EnvSettings() {
  return (
    <>
      <Environment
        files={[
          "/environmentMap/px.jpg",
          "/environmentMap/nx.jpg",
          "/environmentMap/py.jpg",
          "/environmentMap/ny.jpg",
          "/environmentMap/pz.jpg",
          "/environmentMap/nz.jpg",
        ]}
      />
      <ambientLight intensity={1.0} />
      <directionalLight position={[38.8, 31.5, -45.6]} intensity={1} />
    </>
  );
}
