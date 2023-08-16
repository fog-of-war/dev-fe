import React, { useState } from "react";
import PhotoCertificationLogic from "./PhotoCertificationLogic";

interface PhotoData {
  latitude?: number;
  longitude?: number;
  date?: Date;
}

interface CertificationResults {
  location: "통과" | "미통과";
  date: "통과" | "미통과";
}

const PhotoCertification = () => {
  const [photoData, setPhotoData] = useState<PhotoData>({});
  const [certificationResults, setCertificationResults] =
    useState<CertificationResults>({
      location: "통과",
      date: "통과",
    });

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const { photoData, certificationResults } = await PhotoCertificationLogic(
        file
      );

      setPhotoData(photoData);
      setCertificationResults(certificationResults);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".heic, .heif, image/*"
        onChange={handleFileInputChange}
      />
      {photoData.latitude && photoData.longitude && (
        <p>
          위도 및 경도: {photoData.latitude}, {photoData.longitude} (
          {certificationResults.location})
        </p>
      )}
      {photoData.date && (
        <p>
          날짜 및 시간: {photoData.date.toLocaleString()} (
          {certificationResults.date})
        </p>
      )}
    </div>
  );
};

export default PhotoCertification;
