/** @jsxImportSource @emotion/react */

import colors from "../constants/colors";
import BottomModal from "./BottomModal";
import PlaceImages from "./Certification/PlaceImages";
import PlaceTitle from "./Certification/PlaceTitle";
import PhotoCertificationLogic from "./LocationCertification/PhotoCertificationLogic";
import Button from "./UI/Button";

const DUMMY_DATA = {
  name: "숭례문",
  category: "역사적 명소",
  icon: "/dev/categoryIcon.png",
  images: [
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
  ],
  point: 500,
};

interface CertificationModalProps {
  placeName: string;
  category: string;
  roadAddress: string;
  x: number;
  y: number;
}

const CertificationModal = ({
  placeName,
  category,
  roadAddress,
  x,
  y,
}: CertificationModalProps) => {
  // 사진 인증
  const handleCertificationClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];

      if (file) {
        const { photoData, certificationResults } =
          await PhotoCertificationLogic(file, x, y);
        console.log("x:", x, "y:", y);

        console.log("Photo Data:", photoData);
        console.log("Certification Results:", certificationResults);
      }
    } catch (error) {
      console.error("Error during certification:", error);
    }
  };
  return (
    <BottomModal>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <PlaceTitle
          name={placeName}
          category={category}
          roadAddress={roadAddress}
          icon={DUMMY_DATA.icon}
        />
        <PlaceImages
          images={DUMMY_DATA.images}
          onClick={() => {
            console.log("하위");
          }}
        />
        <div css={{ display: "flex", justifyContent: "center" }}>
          <div css={{ display: "flex", fontSize: 18, fontWeight: "bold" }}>
            인증시&nbsp;
            <div css={{ color: colors.primary }}>+{DUMMY_DATA.point}</div>
            &nbsp;포인트 획득
          </div>
        </div>
        <Button>
          <label css={{ display: "flex", gap: 8, cursor: "pointer" }}>
            <input
              type="file"
              accept=".heic, .heif, image/*"
              style={{ display: "none" }}
              onChange={handleCertificationClick}
            />
            <img src="images/buttonIcon.svg" alt="button" />
            인증하기
          </label>
        </Button>
      </div>
    </BottomModal>
  );
};

export default CertificationModal;
