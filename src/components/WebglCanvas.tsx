import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import CanvasSpinner from "./CanvasSpinner";
import ModelSettings from "./ModelSettings";
import EnvSettings from "./EnvSettings";
import { Box, Flex } from "@chakra-ui/react";
import Interfaces from "./Interfaces";

export default function WebglCanvas() {
  return (
    <Flex w="100%" h="100%">
      <Canvas
        style={{
          width: "70%",
          height: "100%",
          background: "#fff",
          transition: "all 0.3s ease-in-out",
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 20000,
          position: [38.8, 31.5, -45.6],
        }}
        shadows
        gl={{ antialias: true }}
      >
        <OrbitControls makeDefault />
        {/* <Perf /> */}
        <Suspense fallback={<CanvasSpinner />}>
          <ModelSettings />
          <EnvSettings />
        </Suspense>
      </Canvas>
      <Box w="30%" bg="gray.50" borderLeft={"1px #dcdcdc solid"}>
        <Interfaces />
      </Box>
    </Flex>
  );
}
