/** @jsxImportSource @emotion/react */

import { KeyboardEvent } from "react";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputValue: string;
  placeholder?: string;
}

const SearchBar = ({
  onChange,
  onKeyDown,
  inputValue,
  placeholder,
}: SearchBarProps) => {
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
      }}
    >
      <img
        src="/images/searchIcon.png"
        alt="search_icon"
        css={{ height: 18 }}
      />
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
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
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
