import React, { useCallback, useEffect } from "react";
import { ObjectMap, useThree } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import useFocusMesh from "@/stores/useFocusMesh";
import MeshControls from "./MeshControls";

type Props = {
  model: GLTF & ObjectMap;
};

function Model({ model }: Props) {
  const { raycaster } = useThree();
  const setFocusMesh = useFocusMesh((state) => state.setFocusMesh);

  const getRayCastPosition = useCallback(
    (e: MouseEvent) => {
      const intersectObjects = raycaster.intersectObjects(model.scene.children);
      const firstIntersectObject = intersectObjects[0];
      if (
        firstIntersectObject &&
        firstIntersectObject.object instanceof THREE.Mesh
      ) {
        setFocusMesh(firstIntersectObject.object as THREE.Mesh);
      }
    },
    [model.scene.children, raycaster, setFocusMesh]
  );

  useEffect(() => {
    window.addEventListener("dblclick", getRayCastPosition);
    return () => window.removeEventListener("dblclick", getRayCastPosition);
  }, [getRayCastPosition]);

  return (
    <>
      <primitive object={model.scene} />
      <MeshControls />
    </>
  );
}

export default React.memo(Model);
