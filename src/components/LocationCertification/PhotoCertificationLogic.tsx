import exifr from "exifr";
import { toast } from "react-hot-toast";

interface PhotoData {
  latitude?: number;
  longitude?: number;
  date?: Date;
}

interface CertificationResults {
  location: "통과" | "미통과";
  date: "통과" | "미통과";
}

const PhotoCertificationLogic = async (
  file: File,
  place_latitude: number,
  place_longitude: number
): Promise<{
  photoData: PhotoData;
  certificationResults: CertificationResults;
}> => {
  const photoData: PhotoData = {};
  const certificationResults: CertificationResults = {
    location: "미통과",
    date: "미통과",
  };

  try {
    const exifData = await readExifData(file);

    if (!exifData) {
      toast.error("사진의 위치정보를 찾을 수 없습니다.");
      return { photoData, certificationResults };
    }
    const longitude = exifData?.longitude;
    const latitude = exifData?.latitude;

    const dateStr = exifData?.DateTimeOriginal;

    if (dateStr) {
      const date = new Date(dateStr);
      photoData.longitude = longitude;
      photoData.latitude = latitude;
      photoData.date = date;

      const photoLongitude = longitude; // 사진의 경도
      const photoLatitude = latitude; // 사진의 위도
      const photoDate = new Date(dateStr);

      // 사진을 찍은 자정 시간을 계산
      const photoMidnight = new Date(photoDate);
      photoMidnight.setHours(0, 0, 0, 0);

      const distance = calculateDistance(
        photoLongitude,
        photoLatitude,
        place_longitude, // 수정된 부분: 장소의 경도
        place_latitude // 수정된 부분: 장소의 위도
      );

      // 자정까지의 시간 차이를 계산
      const timeDiff = Math.abs(photoMidnight.getTime() - new Date().getTime());

      // 100m 이내의 거리이면 통과, 그렇지 않으면 미통과
      const locationResult = distance > 100 ? "미통과" : "통과";

      // 자정까지의 시간만 통과
      const dateResult = timeDiff <= 24 * 60 * 60 * 1000 ? "통과" : "미통과";

      certificationResults.location = locationResult;
      certificationResults.date = dateResult;
    }
  } catch (error) {
    console.error("사진 처리 중 오류:", error);
  }

  return { photoData, certificationResults };
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

export default PhotoCertificationLogic;
