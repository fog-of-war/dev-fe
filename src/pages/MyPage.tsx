/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import colors from "../constants/colors";
import UserProfile from "../components/ProfileCard/UserProfile";
import AdvPlaceList from "../components/AdventurePlace/AdvPlaceList";
import PageHeader from "../components/UI/PageHeader";
import ProfileActionButton from "../components/EditProfile/ProfileActionButton";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../api/user";
import { LINK } from "../constants/links";
import { clearAllLocalStorage } from "../utils/localStorage";
import useAuth from "../hooks/useAuth";
import ProfileActionModal from "../components/EditProfile/ProfileActionModal";
import DotButton from "../components/UI/DotButton";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { clearCurrentUser } = useAuth();

  const handleLogout = async () => {
    clearCurrentUser();
    clearAllLocalStorage();
    navigate(LINK.AUTH_PAGE);
  };

  const handleDelete = async () => {
    await deleteUser();
    clearCurrentUser();
    clearAllLocalStorage();
    navigate(LINK.AUTH_PAGE);
  };

  const handleTerms = async () => {
    window.location.href = 'https://sapienslee.notion.site/8ab55e74cc254589a018ef709dc4ca11';
  };

  return (
    <>
      <PageHeader headerTitle="마이페이지" />
      <MyPageLayout>
        <Container>
          <UserProfile />
          <div style={{ position: "relative" }}>
            <DotButton setModalState={setIsModalOpen} />
            {isModalOpen && (
              <ProfileActionModal>
                <ActionButtonContainer>
                  <ProfileActionButton
                    buttonType="logout"
                    onConfirm={handleLogout}
                    message="로그아웃 하시겠습니까?"
                    confirmMessage="로그아웃시 로그인 페이지로 이동합니다."
                    successMessage="로그아웃이 완료되었습니다."
                    buttonText="로그아웃"
                  />
                  <LineDiv />
                  <ProfileActionButton
                    buttonType="delete"
                    onConfirm={handleDelete}
                    message="정말 탈퇴 하시겠습니까?"
                    confirmMessage="탈퇴한 계정은 복구할 수 없습니다."
                    successMessage="회원 탈퇴가 완료되었습니다."
                    buttonText="회원탈퇴"
                  />
                  <LineDiv />
                  <ProfileActionButton
                    buttonType="terms"
                    onConfirm={handleTerms}
                    message="개인정보처리약관으로 이동하시겠습니까?"
                    confirmMessage=""
                    successMessage=""
                    buttonText="개인정보처리약관"
                  />
                </ActionButtonContainer>
              </ProfileActionModal>
            )}
          </div>
        </Container>
        <AdvPlaceList />
      </MyPageLayout>
    </>
  );
};

export default MyPage;

const MyPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 420px;
  height: 100%;
  padding: 20px;
  padding-top: 60px;
`;

const ActionButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
`;

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.paleGrey};
`;
