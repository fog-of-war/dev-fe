/** @jsxImportSource @emotion/react */

interface BottomModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BottomModal = ({ children, ...props }: BottomModalProps) => {
  return (
    <div
      css={{
        padding: "20px 20px",
        backgroundColor: "white",
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
        position: "fixed",
        width: "100%",
        maxWidth: "420px",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.25)",
        zIndex: "90",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default BottomModal;
