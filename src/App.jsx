import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three"

function App() {
  return (
    <>
      <Canvas className="canvas-scene">
        <Suspense fallback={null}>
        <OrbitControls
                mouseButtons={{
                  LEFT: THREE.MOUSE.PAN,
                  MIDDLE: THREE.MOUSE.ROTATE,
                  RIGHT: THREE.MOUSE.PAN,
                }}
        />
          <Physics debug>
            <Scene />
          </Physics>
          <Environment preset="city" background />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
