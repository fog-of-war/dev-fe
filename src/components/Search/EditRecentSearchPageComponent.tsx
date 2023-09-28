/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import colors from "../../constants/colors";
import styled from "@emotion/styled";
import { SearchList } from "./RecentSearch/RecentSearchesPanel";
import { RecentSearch } from "../../types/types";
import { useDeleteComfirmModal } from "../../hooks/useDeleteComfirmModal";
import useRecentSearch from "../../hooks/search/useRecentSearch";

import BackButton from "../UI/BackButton";
import EditSearchItem from "./RecentSearch/EditSearchItem";
import Button from "../UI/Button";
import RecentSearchesDeleteModal from "./RecentSearch/RecentSearchesDeleteModal";

const EditRecentSearchPageComponent = () => {
  const navigate = useNavigate();

  // 선택한 최근 검색어들을 담는 상태
  const [selectedSearches, setSelectedSearches] = useState<RecentSearch[]>([]);

  // 최근 검색어들을 관리하는 로직을 담은 커스텀 훅
  const { recentSearchHistory, deleteSelectedRecentSearchHistory } =
    useRecentSearch();

  // 삭제 확인 모달을 관리하는 커스텀 훅
  const deleteConfirmModal = useDeleteComfirmModal();

  /** 최근검색어 선택 핸들러 */
  const handleSelect = (targetSearch: RecentSearch) => {
    if (selectedSearches.includes(targetSearch)) {
      setSelectedSearches((prevSelecedSearches) =>
        prevSelecedSearches.filter((search) => search !== targetSearch)
      );
    } else {
      setSelectedSearches((prevSelecedSearches) => [
        ...prevSelecedSearches,
        targetSearch,
      ]);
    }
  };

  /** 최근검색어 전체 선택 핸들러 */
  const handleSelectAll = () => {
    if (selectedSearches.length === recentSearchHistory.length) {
      setSelectedSearches([]);
    } else {
      setSelectedSearches(recentSearchHistory);
    }
  };

  /** 선택된 최근검색어 삭제 핸들러 */
  const handleDeleteSelected = () => {
    deleteSelectedRecentSearchHistory(selectedSearches);
    setSelectedSearches([]);
    deleteConfirmModal.onClose();
  };

  return (
    <Layout>
      <RecentSearchesDeleteModal
        onClose={deleteConfirmModal.onClose}
        onDelete={handleDeleteSelected}
      />

      <Header>
        <BackButton onClick={() => navigate(-1)} size={18} />
        <Title>
          최근검색 편집&nbsp;
          <ColoredText>{recentSearchHistory.length}</ColoredText>
        </Title>
      </Header>

      <SearchList>
        {recentSearchHistory.map((search: RecentSearch) => {
          const isSelected = selectedSearches.includes(search);
          return (
            <EditSearchItem
              key={search.id}
              search={search}
              isSelected={isSelected}
              handleClick={handleSelect}
            />
          );
        })}
      </SearchList>

      <ButtonsContainer>
        <Button
          onClick={handleSelectAll}
          variant="secondary"
          css={{ width: "100%" }}
        >
          전체선택
        </Button>
        <Button
          onClick={deleteConfirmModal.onOpen}
          variant="primary"
          css={{ width: "100%" }}
        >
          삭제 {selectedSearches.length}
        </Button>
      </ButtonsContainer>
    </Layout>
  );
};

export default EditRecentSearchPageComponent;

const Layout = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  gap: 20px;
  background-color: white;
  z-index: 70;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Title = styled.h4`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ColoredText = styled.span`
  color: ${colors.lightGrey};
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  width: calc(100% - 40px);
  gap: 10px;
`;
