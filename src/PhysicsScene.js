// https://pmndrs.github.io/react-three-rapier/

import { Text3D, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  Debug,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
const PhysicsScene = () => {
  const sphereRef = useRef();
  const [touch, setTouch] = useState(false);
  const sphereHandler = () => {
    sphereRef.current.applyImpulse({ x: 0, y: 2.25, z: -2.25 });
  };
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Debug />
      <RigidBody ref={sphereRef} position={[0, 2.5, 5]} colliders="hull">
        <mesh castShadow onClick={sphereHandler}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#CC3941" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" position={[0, 0.175, -5]}>
        <CuboidCollider
          args={[1, 1, 1]}
          sensor
          onIntersectionEnter={() => setTouch(true)}
          onIntersectionExit={() => setTouch(false)}
        />
      </RigidBody>

      <RigidBody type="fixed" restitution={0.4}>
        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow>
          <boxGeometry args={[15, 15, 0.35]} />
          <meshStandardMaterial color="#C7CAC7" />
        </mesh>
      </RigidBody>

      {touch && (
        <Text3D font="./fonts/2.json" position={[-1.75, 3, -5]}>
          Goal
          <meshBasicMaterial />
        </Text3D>
      )}
    </Physics>
  );
};

export default PhysicsScene;
