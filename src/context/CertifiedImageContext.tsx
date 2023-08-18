import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextProps {
  certifiedImages: string[];
  addCertifiedImage: (image: string) => void;
}

const ImageContext = createContext<ImageContextProps>({
  certifiedImages: [],
  addCertifiedImage: () => {},
});

export const useImageContext = () => useContext(ImageContext);

interface ImageProviderProps {
  children: ReactNode;
}

export function CertifiedImageProvider({ children }: ImageProviderProps) {
  // children 속성을 명시적으로 타입 지정합니다
  const [certifiedImages, setCertifiedImages] = useState<string[]>([]);

  const addCertifiedImage = (image: string) => {
    setCertifiedImages((prevImages) => [...prevImages, image]);
  };

  return (
    <ImageContext.Provider value={{ certifiedImages, addCertifiedImage }}>
      {children}
    </ImageContext.Provider>
  );
}
