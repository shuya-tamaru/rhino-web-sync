"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import WebglCanvas from "./WebglCanvas";

export default function TopPageWrapper() {
  return (
    <Box w="100%" h="100vh" bg="#fff" color="#666">
      <WebglCanvas />
    </Box>
  );
}
