import { TransformControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import useFocusMesh from "../stores/useFocusMesh";

export default function MeshControls() {
  const transformControlRef = useRef<TransformControlsImpl>(null);
  const focusMesh = useFocusMesh((state) => state.focusMesh);
  const changeLog = useFocusMesh((state) => state.changeLog);
  const setChangeLog = useFocusMesh((state) => state.setChangeLog);
  const [initialPosition, setInitialPosition] = useState<THREE.Vector3 | null>(
    null
  );

  const meshId = focusMesh ? focusMesh?.userData.id : "";

  useEffect(() => {
    if (focusMesh && transformControlRef.current) {
      (transformControlRef.current as TransformControlsImpl).attach(focusMesh);
      const box = new THREE.Box3().setFromObject(focusMesh);
      const center = new THREE.Vector3();
      box.getCenter(center);
      setInitialPosition(center);
      transformControlRef.current.position.copy(center);
    }
  }, [focusMesh]);

  const handleDistance = () => {
    if (focusMesh && transformControlRef.current) {
      const box = new THREE.Box3().setFromObject(focusMesh);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const distanceVector = center.sub(initialPosition as THREE.Vector3);
      const findLog = changeLog.find((log) => log.meshId === meshId);
      if (findLog) {
        const newChangeLog = changeLog.map((log) => {
          if (log.meshId === meshId) {
            return {
              ...log,
              moveVector: distanceVector,
            };
          }
          return log;
        });
        setChangeLog(newChangeLog);
        return;
      }
      setChangeLog([
        ...changeLog,
        {
          meshId,
          moveVector: distanceVector,
        },
      ]);
    }
  };

  return (
    focusMesh && (
      <TransformControls
        ref={transformControlRef}
        mode="translate"
        onMouseUp={handleDistance}
      />
    )
  );
}
