import { ToastBar, Toaster } from "react-hot-toast";
import colors from "../constants/colors";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontSize: "16px",
          padding: "12px 16px",
          color: colors.darkGrey,
          backgroundColor: colors.accent,
        },
        success: {
          iconTheme: {
            primary: "#5cb27a",
            secondary: "white",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
          }}
        />
      )}
    </Toaster>
  );
};

export default ToasterContext;
