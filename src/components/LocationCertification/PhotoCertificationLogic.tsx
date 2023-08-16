import exifr from "exifr";

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
  file: File
): Promise<{
  photoData: PhotoData;
  certificationResults: CertificationResults;
}> => {
  const photoData: PhotoData = {};
  const certificationResults: CertificationResults = {
    location: "통과",
    date: "통과",
  };

  try {
    const exifData = await readExifData(file);
    const latitude = exifData?.latitude;
    const longitude = exifData?.longitude;
    const dateStr = exifData?.DateTimeOriginal;

    if (dateStr) {
      const date = new Date(dateStr);
      photoData.latitude = latitude;
      photoData.longitude = longitude;
      photoData.date = date;

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

      certificationResults.location = locationResult;
      certificationResults.date = dateResult;
    }
  } catch (error) {
    console.error("Error processing photo:", error);
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
