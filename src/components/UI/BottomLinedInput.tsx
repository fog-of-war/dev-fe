/** @jsxImportSource @emotion/react */

import { ForwardedRef, forwardRef } from "react";
import colors from "../../constants/colors";

interface BottomLinedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
  resetFiled?: () => void;
}

const BottomLinedInput = forwardRef(
  (
    { isFocused, resetFiled, ...props }: BottomLinedInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        css={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          width: "100%",
          marginBottom: "6px",
          borderBottom: isFocused
            ? `2px solid ${colors.primary}`
            : `1px solid ${colors.primary}`,
          borderColor: "#aaa",
          padding: "6px 0",
        }}
      >
        <input
          type="text"
          css={{
            width: "100%",
            fontSize: "20px",
            color: colors.mainFont,
            border: "none",
            outline: "none",
          }}
          ref={ref}
          {...props}
        />
        {resetFiled && (
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "4px 0 4px 4px",
            }}
            onClick={resetFiled}
          >
            <img
              src="/images/resetInputIcon.png"
              alt="reset_input"
              height={26}
            />
          </div>
        )}
      </div>
    );
  }
);

export default BottomLinedInput;
