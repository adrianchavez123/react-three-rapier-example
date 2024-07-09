// https://pmndrs.github.io/react-three-rapier/

import {
  CapsuleCollider,
  CuboidCollider,
  Debug,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useRef } from "react";

const PhysicsScene = () => {
  const cubeRef = useRef();
  const secondCubeRef = useRef();
  const clickHandler = () => {
    // cubeRef.current.addForce({ x: 0, y: 0, z: -10 });
    // cubeRef.current.applyImpulse({ x: 2, y: 7, z: 0 });
    // cubeRef.current.applyImpulseAtPoint(
    //   { x: 2, y: 7, z: 0 },
    //   { x: 2, y: 0, z: 0 }
    // );
    // cubeRef.current.addTorque({ x: 0, y: 5, z: 0 });
    cubeRef.current.applyTorqueImpulse({ x: 0, y: 5, z: 0 });
  };

  const cubeClickHandler = () => {
    secondCubeRef.current.applyImpulse({ x: 8, y: 0, z: 0 });
  };
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Debug />
      <RigidBody
        ref={cubeRef}
        onCollisionEnter={() => {
          console.log("colision enter");
        }}
        onCollisionExit={() => {
          console.log("colision exit");
        }}
        onSleep={() => {
          console.log("sleeping");
        }}
        onWake={() => {
          console.log("wake");
        }}
        gravityScale={1}
        restitution={0}
        friction={0}
      >
        <mesh castShadow position={[1.5, 2.5, 0]} onClick={clickHandler}>
          <boxGeometry />
          <meshStandardMaterial color="#CC3941" />
        </mesh>
      </RigidBody>
      <RigidBody ref={secondCubeRef}>
        <mesh position={[-1.5, 1.5, 0]} onClick={cubeClickHandler}>
          <boxGeometry />
          <meshBasicMaterial color="#CC3941" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow>
          <boxGeometry args={[8, 8, 0.35]} />
          <meshStandardMaterial color="#C7CAC7" />
        </mesh>
      </RigidBody>
    </Physics>
  );
};

export default PhysicsScene;
