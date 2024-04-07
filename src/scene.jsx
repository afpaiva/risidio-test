import { useKeyboard, useMouseCapture } from "./hooks";
import { Player } from "./components/player";
import { Walls } from "./components/walls";
import { Scenery } from "./components/scenery";

export const Scene = () => {
  const keyboard = useKeyboard();
  const mouse = useMouseCapture();

  const getInput = (keyboard, mouse) => {
    let [x, y, z] = [0, 0, 0];

    if (keyboard["s"]) z += 1.0;
    if (keyboard["w"]) z -= 1.0;
    if (keyboard["d"]) x += 1.0;
    if (keyboard["a"]) x -= 1.0;
    if (keyboard[" "]) y += 1.0;

    return {
      move: [x, y, z],
      look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight],
      running: keyboard["Shift"],
    };
  };

  return (
    <group>
      <Scenery />
      <Walls />
      <Player walk={0.15} jump={2} input={() => getInput(keyboard, mouse)} />
    </group>
  );
};
