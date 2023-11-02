import styled from "@emotion/styled";
import colors from "../../../../constants/colors";

export const SearchPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 12px;
  background-color: white;
`;

export const SearchBarLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  width: 100%;
  height: 45px;
  padding: 0 20px;
  border-radius: 10px;
  background: white;
  z-index: 70;
`;

export const SearchList = styled.ul`
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-top: 11px;
  border-top: 0.5px solid ${colors.paleGrey};
  overflow: auto;
  scrollbar-width: none;
  height: 100%;
`;
