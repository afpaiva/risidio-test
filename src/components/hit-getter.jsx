import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Raycaster, Vector2 } from "three";
import { useUiStore } from "../store/ui-store";

export const HitGetter = () => {
  const { setHighlighted, setUiOpened } = useUiStore();
  const { camera, scene, gl } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  useFrame(() => {
    mouse.x = gl.domElement.clientWidth / 2 - gl.domElement.clientWidth / 2;
    mouse.y =
      -(gl.domElement.clientHeight / 2) + gl.domElement.clientHeight / 2;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const movieTitle = intersects.find((intersect) =>
        intersect.object.name.includes("interaction")
      );
      if (movieTitle) {
        setHighlighted(movieTitle.object.name);
      } else {
        setHighlighted(null);
      }
    }
  });

  const handleClick = () => {
    setUiOpened(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return;
};
