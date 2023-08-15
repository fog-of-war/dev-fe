/** @jsxImportSource @emotion/react */

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <>
      <div
        css={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
      />
      <div
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          padding: "20px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          gap: "10px",
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
