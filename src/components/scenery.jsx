import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneryColliders } from "./scenery-colliders";

export const Scenery = () => {
  const scenery = useLoader(GLTFLoader, "/assets/3d/scene.glb");

  return (
    <>
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <primitive object={scenery.scene} />
      </mesh>
      
      <SceneryColliders />
    </>
  );
};
