import styled from "@emotion/styled";
import colors from "../../../../constants/colors";

export const SearchList = styled.ul`
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-top: 11px;
  border-top: 0.5px solid ${colors.paleGrey};
  overflow: auto;
  scrollbar-width: none;
  height: 100%;
`;
