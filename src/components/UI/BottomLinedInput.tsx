/** @jsxImportSource @emotion/react */

import { ForwardedRef, forwardRef } from "react";
import colors from "../../constants/colors";

interface BottomLinedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
  resetFiled?: () => void;
  label?: string;
}

const BottomLinedInput = forwardRef(
  (
    { isFocused, resetFiled, label, ...props }: BottomLinedInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}>
        <label
          htmlFor="search"
          css={{
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "20px",
            color: "#B5DCC6",
          }}
        >
          {label}
        </label>
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
      </>
    );
  }
);

export default BottomLinedInput;
