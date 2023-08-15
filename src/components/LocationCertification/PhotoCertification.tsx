import React, { useState } from "react";
import exifr from "exifr";

const PhotoCertification = () => {
  // 컴포넌트의 상태를 정의합니다. photoData 객체는 추출한 EXIF 데이터를 저장합니다.
  const [photoData, setPhotoData] = useState<{
    latitude?: number;
    longitude?: number;
    date?: Date;
  }>({});

  // 파일 입력이 변경되었을 때 호출되는 핸들러 함수입니다.
  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // 선택한 파일의 EXIF 데이터를 읽어옵니다.
      const exifData = await readExifData(file);
      const latitude = exifData?.latitude; // 이미지의 위도 정보
      const longitude = exifData?.longitude; // 이미지의 경도 정보
      const dateStr = exifData?.DateTimeOriginal; // 이미지의 촬영 날짜 및 시간 정보

      if (dateStr) {
        // 날짜 문자열을 Date 객체로 변환합니다.
        const date = new Date(dateStr);
        // photoData 상태를 업데이트하여 위도, 경도 및 날짜 정보를 저장합니다.
        setPhotoData({ latitude, longitude, date });
      }
    }
  };

  // 파일의 EXIF 데이터를 읽어오는 비동기 함수입니다.
  const readExifData = async (file: File): Promise<any> => {
    try {
      // exifr 라이브러리를 사용하여 파일의 GPS(EXIF) 데이터를 읽어옵니다.
      const exifData = await exifr.parse(file, { gps: true });
      return exifData; // 읽어온 데이터를 반환합니다.
    } catch (error) {
      console.error("Error reading EXIF data:", error);
      return undefined; // 에러가 발생한 경우 undefined를 반환합니다.
    }
  };

  // 컴포넌트의 렌더링 부분입니다.
  return (
    <div>
      {/* 파일 입력 요소를 렌더링하고, 파일 선택 시 핸들러 함수를 호출합니다. */}
      <input
        type="file"
        accept=".heic, .heif, image/*"
        onChange={handleFileInputChange}
      />
      {/* 위도 및 경도 데이터가 존재할 경우에만 해당 정보를 표시합니다. */}
      {photoData.latitude && photoData.longitude && (
        <p>
          위도: {photoData.latitude}, 경도: {photoData.longitude}
        </p>
      )}
      {/* 날짜 데이터가 존재할 경우에만 해당 정보를 표시합니다. */}
      {photoData.date && <p>날짜 및 시간: {photoData.date.toLocaleString()}</p>}
    </div>
  );
};

export default PhotoCertification;
