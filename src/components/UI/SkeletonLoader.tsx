/** @jsxImportSource @emotion/react */

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
}

const SkeletonLoader = ({
  width = "100%",
  height = "100%",
}: SkeletonLoaderProps) => {
  return (
    <div
      css={{
        width: width,
        height: height,
        borderRadius: "10px",
        border: "1px solid #d0d0d0",
        backgroundColor: "#f2f2f2",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, #e0e0e0, transparent)`,
          animation: "loading 1.5s infinite",
        },
        "@keyframes loading": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
      }}
    />
  );
};

export default SkeletonLoader;
