/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import colors from "../../../constants/colors";
import Button from "../../UI/Button";

const ButtonModal = () => {
  return (
    <ModalLayout>
      <ButtonBox>
        <Button
          size="small"
          variant="textOnly"
          style={{
            border: "none",
            borderRadius: "0px",
            color: colors.secondary,
          }}
        >
          수정
        </Button>
      </ButtonBox>
      <ButtonBox>
        <Button
          size="small"
          variant="textOnly"
          style={{
            border: "none",
            borderRadius: "0px",
            color: colors.secondary,
          }}
        >
          삭제
        </Button>
      </ButtonBox>
    </ModalLayout>
  );
};

export default ButtonModal;

const ModalLayout = styled.div`
  width: 45px;
  height: 70px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  right: 15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button:hover {
    background-color: ${colors.pastel};
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
