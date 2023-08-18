/** @jsxImportSource @emotion/react */

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const { setCertifiedImage } = useImageContext(); // 이미지 저장 Context 사용
  const navigate = useNavigate();

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

        const reader = new FileReader();
        reader.onload = () => {
          setCertifiedImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // 인증에 성공했을 경우
        if (
          certificationResults.location === "통과" &&
          certificationResults.date === "통과"
        ) {
          // 이미지 URL을 생성
          // const imageURL = URL.createObjectURL(file);

          // 이미지 저장 Context에 인증된 이미지 URL 추가
          // setCertifiedImage(imageURL);
          setCertifiedImage({
            imageURL,
            placeName,
            x,
            y,
          });
          toast.success("인증에 성공했습니다.");
          navigate("/crop_image");
        }

        // 장소만 인증에 성공했을 경우
        if (
          certificationResults.location === "통과" &&
          certificationResults.date === "미통과"
        ) {
          toast.error("시간 인증에 실패했습니다.");
        }

        // 시간만 인증에 성공했을 경우
        if (
          certificationResults.location === "미통과" &&
          certificationResults.date === "통과"
        ) {
          toast.error("장소 인증에 실패했습니다.");
        }

        // 장소와 시간 모두 인증에 실패했을 경우
        if (
          certificationResults.location === "미통과" &&
          certificationResults.date === "미통과"
        ) {
          toast.error("장소와 시간 인증에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("Error during certification:", error);
      toast.error("인증에 실패했습니다.");
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
