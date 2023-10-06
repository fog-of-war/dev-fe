import React, { ReactElement } from "react";

// 에러 폴백 컴포넌트에 전달되는 오류 정보를 정의하는 타입
export type ErrorFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType; // 발생한 오류 객체
  reset: (...args: unknown[]) => void; // 에러 상태를 초기화하는 메서드
};

// 에러 폴백 컴포넌트의 타입 정의
export type ErrorFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>
) => JSX.Element;

// 에러 바운더리 컴포넌트의 속성 타입 정의
type Props = {
  errorFallback: ErrorFallbackType; // 오류 폴백 컴포넌트
  children: ReactElement; // 에러가 발생하지 않을 때 렌더링할 자식 요소
  resetQuery?: () => void; // 오류 상태를 초기화하는 메서드
  keys?: unknown[]; // 오류 상태를 초기화할 때 사용할 키 값 배열
};

// 에러 경계 컴포넌트의 상태 타입 정의
type State = {
  hasError: boolean; // 오류가 발생했는지 여부
  error: Error | null; // 발생한 오류 객체
};

// 초기 상태 값
const initialState = { hasError: false, error: null };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState; // 초기 상태 설정
  }

  // 자식 컴포넌트에서 발생한 오류를 처리하는 메서드
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }; // 오류 상태를 설정
  }

  // 에러 바운더리 컴포넌트의 상태를 초기화하는 메서드
  resetErrorBoundary = () => {
    const { resetQuery } = this.props;
    resetQuery?.(); // resetQuery가 존재하는 경우 호출
    this.setState(initialState); // 상태를 초기 상태로 재설정
  };

  // 배열 변경 여부를 확인하는 메서드
  changedArray = (
    prevArray: Array<unknown> = [],
    nextArray: Array<unknown> = []
  ) => {
    return (
      prevArray.length !== nextArray.length ||
      prevArray.some((item, index) => {
        return !Object.is(item, nextArray[index]);
      })
    );
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { error } = this.state;
    const { keys } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      this.changedArray(prevProps.keys, keys)
    ) {
      this.resetErrorBoundary(); // 키 값이 변경되면 에러 상태 초기화
    }
  }

  render() {
    const { hasError, error } = this.state; // 상태 변수 추출
    const isErrExist = hasError && error !== null; // 오류 발생 여부 확인

    if (isErrExist) {
      return this.props.errorFallback({
        error: error,
        reset: this.resetErrorBoundary,
      }); // 오류 처리 컴포넌트 렌더링
    }
    return this.props.children; // 자식 요소 렌더링
  }
}

export default ErrorBoundary;
