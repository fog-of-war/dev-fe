/** @jsxImportSource @emotion/react */

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal = ({ children, isOpen, ...props }: ModalProps) => {
  return (
    <>
      <div
        css={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          visibility: isOpen ? "visible" : "hidden",
        }}
      />
      <div
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: isOpen ? "translate(-50%, -50%)" : "translate(-50%, -75%)",
          opacity: isOpen ? 1 : 0,
          zIndex: 1001,
          padding: "20px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          gap: "10px",
          visibility: isOpen ? "visible" : "hidden",
          transition: "all 0.1s ease-out",
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
