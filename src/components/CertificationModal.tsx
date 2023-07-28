/** @jsxImportSource @emotion/react */

import colors from "../constants/colors";
import BottomModal from "./BottomModal";
import PlaceImages from "./Certification/PlaceImages";
import PlaceTitle from "./Certification/PlaceTitle";
import Button from "./UI/Button";

const DUMMY_DATA = {
  name: "숭례문",
  category: "역사적 명소",
  icon: "/dev/categoryIcon.png",
  images: [
    "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
    "https://i.namu.wiki/i/yVl7fn_IBAp2giYJhk-pRn9C1b8po7VCoD7-HemHRX0Ahp6E9VKMvUUHrKYnO-cJvqBGlsXWroRuHF_TEEi-VWzrHFPKTFXOSAqE-tiIqlobtj0LynjnzXxqjuuCR2n4r_gLmz_7Iz2w5Zdl9IbMWg.webp",
  ],
  point: 500,
};

const CertificationModal = () => {
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
          name={DUMMY_DATA.name}
          category={DUMMY_DATA.category}
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
        <Button onClick={() => {}}>
          <div css={{ display: "flex", gap: 8 }}>
            <img src="images/buttonIcon.svg" alt="button" />
            인증하기
          </div>
        </Button>
      </div>
    </BottomModal>
  );
};

export default CertificationModal;
