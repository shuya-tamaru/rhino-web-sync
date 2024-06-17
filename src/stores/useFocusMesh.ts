import { create } from "zustand";
import * as THREE from "three";

interface IChangeLog {
  meshId: string;
  moveVector?: THREE.Vector3;
  userText?: { key: string; value: string };
}

interface FocusMeshProps {
  focusMesh: THREE.Mesh | null;
  setFocusMesh: (state: THREE.Mesh | null) => void;
  changeLog: IChangeLog[];
  setChangeLog: (state: IChangeLog[]) => void;
}

export default create<FocusMeshProps>((set) => ({
  focusMesh: null,
  setFocusMesh: (state: THREE.Mesh | null) => {
    set(() => {
      return { focusMesh: state };
    });
  },
  changeLog: [],
  setChangeLog: (state: IChangeLog[]) => {
    set(() => {
      return { changeLog: state };
    });
  },
}));
