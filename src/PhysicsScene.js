// https://pmndrs.github.io/react-three-rapier/

import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
const PhysicsScene = () => {
  const cubeRef = useRef();
  const spinner = useRef();
  const isJump = useRef(false);
  const allKeys = useKeyboardControls((keys) => keys);
  console.log(allKeys);

  const cubeMovementHandler = () => {
    if (allKeys.forward) {
      cubeRef.current.applyImpulse({ x: 0, y: 0, z: -0.3 });
    }
    if (allKeys.backward) {
      cubeRef.current.applyImpulse({ x: 0, y: 0, z: 0.3 });
    }
    if (allKeys.leftward) {
      cubeRef.current.applyImpulse({ x: -0.3, y: 0, z: 0.3 });
    }
    if (allKeys.rightward) {
      cubeRef.current.applyImpulse({ x: 0.3, y: 0, z: 0.3 });
    }
    if (isJump.current) {
      if (allKeys.jump) {
        cubeRef.current.applyImpulse({ x: 0, y: 40, z: 0.3 });
        isJump.current = false;
      }
    }
  };
  useFrame((state) => {
    const getElapsedTime = state.clock.getElapsedTime();
    spinner.current.setNextKinematicTranslation({
      x: 0,
      y: Math.abs(Math.sin(getElapsedTime)),
      z: 0,
    });

    const eulerRotationAngle = new THREE.Euler(0, getElapsedTime, 0);
    const quaternionRotation = new THREE.Quaternion().setFromEuler(
      eulerRotationAngle
    );

    spinner.current.setNextKinematicRotation(quaternionRotation);
    cubeMovementHandler();
  });
  const cubeClickHandler = () => {
    cubeRef.current.applyImpulse({ x: -25, y: 0, z: 0 });
  };

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Debug />
      <RigidBody
        ref={cubeRef}
        position={[2.5, 2.5, 0]}
        onCollisionEnter={() => (isJump.current = true)}
        onCollisionExit={() => (isJump.current = false)}
      >
        <mesh castShadow onClick={cubeClickHandler}>
          <boxGeometry />
          <meshStandardMaterial color="#CC3941" />
        </mesh>
      </RigidBody>
      <RigidBody ref={spinner} position-y={-0.65} type="kinematicPosition">
        <mesh receiveShadow>
          <boxGeometry args={[1, 0.35, 15]} />
          <meshBasicMaterial color="orange" />
        </mesh>
      </RigidBody>

      <RigidBody
        type="fixed"
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        restitution={0.5}
      >
        <mesh receiveShadow>
          <boxGeometry args={[15, 15, 0.35]} />
          <meshStandardMaterial color="#C7CAC7" />
        </mesh>
      </RigidBody>
    </Physics>
  );
};

export default PhysicsScene;
