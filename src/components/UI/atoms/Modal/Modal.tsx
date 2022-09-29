import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

interface TModal {
  children: ReactNode;
}
const Modal = (props: TModal) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLLIElement>("#portal");
    setMounted(true);
  }, []);
  return mounted && ref.current
    ? createPortal(
        <Overlay>
          <ModalContainer>{props.children}</ModalContainer>
        </Overlay>,
        ref.current,
      )
    : null;
};

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
`;
const Overlay = styled.div`
  display: block;
  position: fixed;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;
