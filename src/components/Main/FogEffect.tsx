import React from "react";

interface FogEffectProps {
  isLoaded: boolean;
}

const FogEffect: React.FC<FogEffectProps> = ({ isLoaded }) => {
  return (
    <>
      <div>
        <img
          src="/images/map/fogTop.png"
          alt="안개 탑 이미지"
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            width: 300,
            height: 200,
            zIndex: 2,
            transition: "transform 0.5s",
            transform: `translateX(${isLoaded ? 0 : -300}px)`,
          }}
        />
      </div>
      <div>
        <img
          src="/images/map/fogBottom.png"
          alt="안개 바텀 이미지"
          style={{
            position: "absolute",
            top: 100,
            left: 10,
            width: 300,
            height: 200,
            zIndex: 2,
            transition: "transform 0.5s",
            transform: `translateX(${isLoaded ? 0 : 300}px)`,
          }}
        />
      </div>
    </>
  );
};

export default FogEffect;
