import { useRef } from "react";
import { createPortal } from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import { useOutsideClick } from "../hooks";

type PropTypes = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({
  children,
  showModal,
  setShowModal,
}: PropTypes) {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, () => {
    setShowModal(false);
  });

  if (!showModal) return null;
  return createPortal(
    <main className="modal__overlay">
      <div className="modal__container" ref={modalRef}>
        <div className="modal__close" onClick={() => setShowModal(false)}>
          <FaWindowClose
            size={25}
            color="#000000"
            style={{ cursor: "pointer" }}
          />
        </div>
        {children}
      </div>
    </main>,
    document.getElementById("modal") as HTMLDivElement
  );
}
