import { useKeyboard, useMouseCapture } from "../hooks";
import { Player } from "./player";
import { Walls } from "./walls";
import { Scenery } from "./scenery";
import { useUiStore } from "../store/ui-store";

export const Scene = () => {
  const { builderMode } = useUiStore();
  const keyboard = useKeyboard();
  const mouse = useMouseCapture(builderMode);

  const getInput = (keyboard, mouse) => {
    let [x, y, z] = [0, 0, 0];

    if (keyboard["s"]) z += 1.0;
    if (keyboard["w"]) z -= 1.0;
    if (keyboard["d"]) x += 1.0;
    if (keyboard["a"]) x -= 1.0;

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
      {!builderMode && (
        <Player walk={0.15} jump={1} input={() => getInput(keyboard, mouse)} />
      )}
    </group>
  );
};
