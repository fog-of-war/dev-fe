import React, { useState } from "react";
import exifr from "exifr";

const PhotoCertification = () => {
  const [photoData, setPhotoData] = useState<{
    latitude?: number;
    longitude?: number;
    date?: Date;
  }>({});

  const [certificationResults, setCertificationResults] = useState<{
    location: "통과" | "미통과";
    date: "통과" | "미통과";
  }>({
    location: "통과",
    date: "통과",
  });

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const exifData = await readExifData(file);
      const latitude = exifData?.latitude;
      const longitude = exifData?.longitude;
      const dateStr = exifData?.DateTimeOriginal;

      if (dateStr) {
        const date = new Date(dateStr);
        setPhotoData({ latitude, longitude, date });

        // 목데이터 거제 집 근처 좌표
        const mockLatitude = 34.86168611111111;
        const mockLongitude = 128.63741944444445;
        const mockDate = new Date();

        const distance = calculateDistance(
          latitude,
          longitude,
          mockLatitude,
          mockLongitude
        );
        const timeDiff = Math.abs(date.getTime() - mockDate.getTime());

        const locationResult = distance > 100 ? "미통과" : "통과";
        const dateResult = timeDiff >= 24 * 60 * 60 * 1000 ? "미통과" : "통과";

        setCertificationResults({
          location: locationResult,
          date: dateResult,
        });
      }
    }
  };

  const readExifData = async (file: File): Promise<any> => {
    try {
      const exifData = await exifr.parse(file, { gps: true });
      return exifData;
    } catch (error) {
      console.error("Error reading EXIF data:", error);
      return undefined;
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
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
