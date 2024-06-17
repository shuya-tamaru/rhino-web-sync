import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import Model from "./Model";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/Addons.js";

export default function ModelSettings() {
  const model = useGLTF("/model.glb") as unknown as GLTF & ObjectMap;
  model.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material as THREE.MeshStandardMaterial;
      material.side = THREE.DoubleSide;
      material.transparent = true;
      material.envMapIntensity = 1.5;
    }
  });

  return <Model model={model} />;
}
