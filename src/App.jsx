import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/scene";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import { Modal } from "./ui/modal";
import { ToolsBar } from "./ui/tools-bar";
import { Logo } from "./ui/logo";
import { Bloom } from "@react-three/postprocessing";

function App() {
  return (
    <>
      <Logo />
      <Modal />
      <ToolsBar />
      <Canvas className="canvas-scene">
        <Suspense fallback={null}>
          <Physics>
            <Scene />
          </Physics>
          <Environment preset="city" background />
          <Bloom
            luminanceThreshold={0.9}
            luminanceSmoothing={0.1}
            height={300}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
