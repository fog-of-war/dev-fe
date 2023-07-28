/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface BottomModalProps {
  children: React.ReactNode;
}

const BottomModal = ({ children }: BottomModalProps) => {
  return (
    <div
      css={css`
        padding: 20px 20px;
        background-color: white;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        position: fixed;
        width: 90%;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.25);
      `}
    >
      {children}
    </div>
  );
};

export default BottomModal;
