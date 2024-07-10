import { KeyboardControls, OrbitControls } from "@react-three/drei";
import PhysicsScene from "./PhysicsScene";
import Effect from "./Effect";
import { useRef } from "react";

const Scene = () => {
  const circleMesh = useRef();
  return (
    <>
      <OrbitControls />
      <Effect ref={circleMesh} />
      <mesh position-x={1}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>

      <mesh position-x={-1}>
        <boxGeometry />
        <meshBasicMaterial color="rgb(106,115,180)" />
      </mesh>
      <mesh position-z={-12} ref={circleMesh}>
        <circleGeometry args={[7, 64]} />
        <meshBasicMaterial color="orange" />
      </mesh>
    </>
  );
};

export default Scene;
