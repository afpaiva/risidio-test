import { useEffect } from "react";
import { useUiStore } from "../store/ui-store";

export const Modal = () => {
  const { isUiOpen, setUiOpened, highlighted } = useUiStore();

  const handleClose = (e) => {
    e.stopPropagation();
    setUiOpened(false);
    document.body.requestPointerLock =
      document.body.requestPointerLock ||
      document.body.mozRequestPointerLock ||
      document.body.webkitRequestPointerLock;
    document.body.requestPointerLock();
  };

  useEffect(() => {
    if (isUiOpen && !highlighted) setUiOpened(false);
    if (isUiOpen && highlighted) {
      document.exitPointerLock();
    }
  }, [isUiOpen]);

  return (
    highlighted &&
    isUiOpen && (
      <div className="modal-background" onClick={(e) => e.stopPropagation()}>
        <div className="modal-container">
          <div className="modal-title">
            {highlighted}
            <img
              src="/assets/img/close.png"
              width={25}
              height={25}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modal-body">This pop up is opened</div>
        </div>
      </div>
    )
  );
};
