/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface DotButtonProps {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DotButton = ({ setModalState }: DotButtonProps) => {
  const handleDotButtonClick = () => {
    setModalState((prev) => !prev);
  };

  return (
    <DotButtonWrapper onClick={handleDotButtonClick}>
      <ButtonImg src="/images/dotButton.svg" alt="comment_delete_button" />
    </DotButtonWrapper>
  );
};

export default DotButton;

const DotButtonWrapper = styled.button`
  width: 6px;
  height: 20px;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;
`;

const ButtonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
