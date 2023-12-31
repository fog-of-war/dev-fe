import styled from "@emotion/styled";
import { ErrorFallbackProps } from "./ErrorBoundary";
import colors from "../../constants/colors";

const ErrorFallback = (props: ErrorFallbackProps) => {
  return (
    <ErrorFallbackLayout>
      <ErrorFallbackContainer>
        <ErrorMesageTitle>에러가 발생했습니다.</ErrorMesageTitle>
        <ErrorMessage>{props.error.toString()}</ErrorMessage>
        <RetryButton onClick={() => props.reset()}>다시시도</RetryButton>
      </ErrorFallbackContainer>
    </ErrorFallbackLayout>
  );
};

export default ErrorFallback;

const ErrorFallbackLayout = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorFallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.pastel};
  padding: 20px;
  border-radius: 10px;
`;

const RetryButton = styled.button`
  background-color: ${colors.primary};
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
`;

const ErrorMesageTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.darkGrey};
  padding-bottom: 10px;
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  color: ${colors.darkGrey};
  padding-bottom: 20px;
`;
