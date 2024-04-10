import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/scene";
import { Suspense, useState } from "react";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import { Modal } from "./ui/modal";
import { ToolsBar } from "./ui/tools-bar";
import { Logo } from "./ui/logo";
import { Bloom } from "@react-three/postprocessing";
import { Loader } from "@react-three/drei";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <Logo />
      <Modal />
      <ToolsBar />
      <Canvas className="canvas-scene">
        <Suspense fallback={null}>
          <Physics>
            <Scene onLoaded={handleLoaded} />
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
