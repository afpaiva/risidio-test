import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import { HitGetter } from "./components/hit-getter";
import { Modal } from "./ui/modal";
import { ToolsBar } from "./ui/tools-bar";

function App() {
  return (
    <>
      <div id="pointer" />
      <Modal />
      <ToolsBar />
      <Canvas className="canvas-scene">
        <Suspense fallback={null}>
          <Physics debug>
            <Scene />
          </Physics>
          <HitGetter />
          <Environment preset="city" background />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
