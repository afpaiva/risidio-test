import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import { HitGetter } from "./components/hit-getter";
import { Modal } from "./ui/modal";
import { ToolsBar } from "./ui/tools-bar";
import { Logo } from "./ui/logo";

function App() {
  return (
    <>
      <div id="pointer" />
      <Logo />
      <Modal />
      <ToolsBar />
      <Canvas className="canvas-scene">
        <Suspense fallback={null}>
          <Physics>
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
