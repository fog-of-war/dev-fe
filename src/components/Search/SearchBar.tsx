/** @jsxImportSource @emotion/react */

import { ForwardedRef, forwardRef } from "react";
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue?: string;
  placeholder?: string;
}

const SearchBar = forwardRef(
  (
    { inputValue, placeholder, ...props }: SearchBarProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const navigate = useNavigate();

    return (
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          width: "100%",
          height: "45px",
          padding: "0 20px",
          borderRadius: "10px",
          background: "white",
          border: "1px solid #d9d9d9",
          zIndex: 70,
        }}
      >
        <BackButton
          size={18}
          onClick={() => {
            navigate(-1);
          }}
        />
        <input
          type="text"
          value={inputValue}
          css={{
            border: "none",
            outline: "none",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "-0.5px",
            flex: 1,
            "&::placeholder": {
              color: "#aaa",
            },
          }}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default SearchBar;
