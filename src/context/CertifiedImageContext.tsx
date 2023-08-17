import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextProps {
  certifiedImages: any[]; // 'any' 대신 이미지에 적합한 타입으로 대체해야 합니다
  addCertifiedImage: (image: any) => void; // 'any' 대신 적절한 타입으로 대체해야 합니다
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
  const [certifiedImages, setCertifiedImages] = useState<any[]>([]);

  const addCertifiedImage = (image: any) => {
    // 'any' 대신 적절한 타입으로 대체해야 합니다
    setCertifiedImages((prevImages) => [...prevImages, image]);
  };

  return (
    <ImageContext.Provider value={{ certifiedImages, addCertifiedImage }}>
      {children}
    </ImageContext.Provider>
  );
}
