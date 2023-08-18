import { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextProps {
  certifiedImage: {
    imageURL: string | null;
    placeName: string | null;
    x: number | null;
    y: number | null;
  };
  setCertifiedImage: React.Dispatch<
    React.SetStateAction<{
      imageURL: string | null;
      placeName: string | null;
      x: number | null;
      y: number | null;
    }>
  >;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const useImageContext = (): ImageContextProps => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("ImageProvider에 문제가 발생했습니다.");
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export function CertifiedImageProvider({ children }: ImageProviderProps) {
  const [certifiedImage, setCertifiedImage] = useState<{
    imageURL: string | null;
    placeName: string | null;
    x: number | null;
    y: number | null;
  }>({
    imageURL: null,
    placeName: null,
    x: null,
    y: null,
  });

  return (
    <ImageContext.Provider value={{ certifiedImage, setCertifiedImage }}>
      {children}
    </ImageContext.Provider>
  );
}
