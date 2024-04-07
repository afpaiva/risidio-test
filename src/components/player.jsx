import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";
import { Raycaster, Quaternion } from "three";
import { clamp, lerp } from "three/src/math/MathUtils";
import * as THREE from "three";

export const Player = ({
  walk = 3,
  jump = 4,
  input = () => ({ move: [0, 0, 0], look: [0, 0] }),
}) => {
  const api = useRef(null); 
  const mesh = useRef(); 
  const { camera } = useThree(); 

  let phi = 0; 
  let theta = 0; 
  
  const speed = new Vector3(walk / 2, jump, walk); 
  const offset = new Vector3(0, 0, 0); 
  const gaze = new Quaternion(); 
  const yaw = new Quaternion(); 
  const pitch = new Quaternion(); 
  const cameraOffset = new Vector3(0, 1, 2); 
  const down = new Vector3(0, -1, 0); 
  const yAxis = new Vector3(0, 1, 0); 
  const xAxis = new Vector3(1, 0, 0); 
  const raycaster = new Raycaster(new Vector3(0, 0, 0), down, 0, 2); 

  const updateOrientation = ([x, y]) => {
    const cameraSpeed = 3; 
    const step = 0.3; 
    phi = lerp(phi, -x * cameraSpeed, step); 
    theta = lerp(theta, -y * cameraSpeed, step); 
    theta = clamp(theta, -Math.PI / 3, Math.PI / 3); 

    yaw.setFromAxisAngle(yAxis, phi); 
    pitch.setFromAxisAngle(xAxis, theta); 
    gaze.multiplyQuaternions(yaw, pitch).normalize(); 
  };

  useFrame(() => {
    if (!api.current || !mesh.current) return;
    const position = api.current.translation(); 
    const { move, look, running } = input(); 

    updateOrientation(look); 

    raycaster.set(position, down);
    
    offset
      .fromArray(move)
      .normalize()
      // eslint-disable-next-line @react-three/no-clone-in-loop
      .multiply(running ? speed.clone().multiplyScalar(2.5) : speed)
      .applyQuaternion(yaw);

    api.current.applyImpulse(offset, true);

    // eslint-disable-next-line @react-three/no-new-in-loop
    const newPosition = new THREE.Vector3(position.x, position.y, position.z);
    camera.position.lerp(
      // eslint-disable-next-line @react-three/no-clone-in-loop
      newPosition.add(cameraOffset.clone().applyQuaternion(yaw)),
      0.25
    );

    camera.quaternion.copy(gaze);
  });
  
  return (
    <RigidBody
      ref={api}
      lockRotations
      position={[0,3.01, 0]}
      friction={0.5}
      restitution={0.5}
      colliders="ball"
    >
      <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
        <meshPhysicalMaterial metalness={0.5} roughness={0} />
        <sphereGeometry args={[.4, 16, 16]} />
      </mesh>
    </RigidBody>
  );
};