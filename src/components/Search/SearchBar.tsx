/** @jsxImportSource @emotion/react */

import { ForwardedRef, forwardRef } from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue: string;
  placeholder?: string;
  isSearchIcon?: boolean;
}

const SearchBar = forwardRef(
  (
    { inputValue, placeholder, isSearchIcon, ...props }: SearchBarProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          height: "45px",
          padding: "0 20px",
          borderRadius: "10px",
          background: "white",
          boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.25)",
          zIndex: 70,
        }}
      >
        {isSearchIcon && (
          <img
            src="/images/searchIcon.png"
            alt="search_icon"
            css={{ height: 18 }}
          />
        )}
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
