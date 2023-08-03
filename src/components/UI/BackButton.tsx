const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick}>
      <img src="/images/backBtn.png" alt="back_button" height={20} />
    </div>
  );
};

export default BackButton;
