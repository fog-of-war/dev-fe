/** @jsxImportSource @emotion/react */

import React from "react";

interface SpacingProps {
  size: number;
  direction: "horizontal" | "vertical";
}

const Spacing = ({ size, direction }: SpacingProps) => {
  return (
    <div
      css={{
        flex: "none",
        height: direction === "vertical" ? `${size}px` : undefined,
        width: direction === "horizontal" ? `${size}px` : undefined,
      }}
    />
  );
};

export default React.memo(Spacing);
