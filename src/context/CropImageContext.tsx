import React, { createContext, useState, useContext, ReactNode } from "react";

interface CropImageContextProps {
  croppedImage: string | null;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const CropImageContext = createContext<CropImageContextProps | undefined>(
  undefined
);

interface CropImageProviderProps {
  children: ReactNode;
}

export const useCroppedImage = (): CropImageContextProps => {
  const context = useContext(CropImageContext);
  if (!context) {
    throw new Error("CropImageProvider에 문제가 발생했습니다.");
  }
  return context;
};

export const CropImageProvider = ({ children }: CropImageProviderProps) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  return (
    <CropImageContext.Provider value={{ croppedImage, setCroppedImage }}>
      {children}
    </CropImageContext.Provider>
  );
};
