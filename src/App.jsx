import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/scene";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier";
import { Environment, OrbitControls } from "@react-three/drei";
import { Modal } from "./ui/modal";
import { ToolsBar } from "./ui/tools-bar";
import { Logo } from "./ui/logo";
import { useUiStore } from "./store/ui-store";
import { Bloom } from "@react-three/postprocessing";

function App() {
  const { builderMode, setBuilderMode } = useUiStore();
  useEffect(() => {
    setBuilderMode(false);
  }, []);

  return (
    <>
      <Logo />
      <Modal />
      <ToolsBar />
      <Canvas className="canvas-scene">
        {builderMode && <OrbitControls />}
        <Suspense fallback={null}>
          <Physics debug={builderMode}>
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
