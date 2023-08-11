import { useLoading } from "../../context/LoadingContext";
import LoadingBar from "./LoadingBar";

const LoadingComponent = () => {
  const { loading, loadingMessage } = useLoading();

  return loading ? <LoadingBar text={loadingMessage} /> : null;
};

export default LoadingComponent;
