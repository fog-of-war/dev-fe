/** @jsxImportSource @emotion/react */

import { useImageContext } from "../context/CertifiedImageContext";

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
  const { addCertifiedImage } = useImageContext(); // 이미지 저장 Context 사용

  // 사진 인증
  const handleCertificationClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];

      if (file) {
        const { certificationResults } = await PhotoCertificationLogic(
          file,
          x,
          y
        );
        console.log("Certification Results:", certificationResults);

        if (
          certificationResults.location === "통과" &&
          certificationResults.date === "통과"
        ) {
          // 이미지 URL을 생성
          const imageURL = URL.createObjectURL(file);

          // 이미지 저장 Context에 인증된 이미지 URL 추가
          addCertifiedImage(imageURL);
          console.log("인증 성공 : ", imageURL);
        }
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
