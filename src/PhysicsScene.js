// https://pmndrs.github.io/react-three-rapier/

import {
  CapsuleCollider,
  CuboidCollider,
  Debug,
  Physics,
  RigidBody,
} from "@react-three/rapier";

const PhysicsScene = () => {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Debug />
      <RigidBody position={[0, 1.5, 0]} colliders={false}>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        {/* <CuboidCollider args={[0.25, 0.25, 0.25]} position={[-2, -1, -2.5]} /> */}
        <mesh castShadow>
          <boxGeometry />
          <meshStandardMaterial color="#CC3941" />
        </mesh>
      </RigidBody>
      <RigidBody colliders="trimesh">
        {/* <RigidBody colliders="hull"> */}
        <mesh position={[-1.5, 1.5, 0]}>
          <torusKnotGeometry args={[0.5, 0.15, 100, 100]} />
          <meshBasicMaterial color="orange" />
        </mesh>
      </RigidBody>
      {/* <RigidBody colliders="ball"> */}
      <RigidBody colliders={false} position={[0, 1.5, -1.5]}>
        <CapsuleCollider args={[0.375, 0.6]} />
        <mesh>
          <sphereGeometry args={[0.75, 64, 64]} />
          <meshBasicMaterial color="purple" />
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
