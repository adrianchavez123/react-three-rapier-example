// https://pmndrs.github.io/react-three-rapier/

import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Debug,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useMemo, useRef } from "react";
import * as THREE from "three";
const PhysicsScene = () => {
  const count = 100;
  const cubeTransformations = useMemo(() => {
    const cubesPositions = [];
    const cubesRotations = [];
    const cubesScales = [];
    for (let i = 0; i < count; i++) {
      cubesPositions.push([
        (Math.random() - 0.5) * 5,
        Math.random() * 20,
        (Math.random() - 0.5) * 5,
      ]);
      cubesRotations.push([0, 0, 0]);
      cubesScales.push([0.2, 0.2, 0.2]);
    }
    return {
      positions: cubesPositions,
      rotations: cubesRotations,
      scales: cubesScales,
    };
  }, []);
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Debug />
      <RigidBody>
        <mesh castShadow position={[0, 1.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#CC3941" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          position-y={-1}
          rotation-x={-Math.PI * 0.5}
          receiveShadow
          geometry={new THREE.BoxGeometry(8, 8, 0.35)}
        >
          {/* <boxGeometry args={[8, 8, 0.35]} /> */}
          <meshStandardMaterial color="#C7CAC7" />
        </mesh>
      </RigidBody>
      <InstancedRigidBodies
        positions={cubeTransformations.positions}
        rotations={cubeTransformations.rotations}
        scale={cubeTransformations.scales}
      >
        <instancedMesh args={[null, null, count]} castShadow>
          <boxGeometry />
          <meshBasicMaterial color="#CC3841" />
        </instancedMesh>
      </InstancedRigidBodies>
    </Physics>
  );
};

export default PhysicsScene;
