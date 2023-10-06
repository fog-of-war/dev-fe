import { toast } from "react-hot-toast";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === "object" && error !== null && "message" in error;
}

export function getErrorMessage(error: unknown) {
  if (isErrorWithMessage(error)) return error.message;
  return String(error);
}

export function errorLoging(error: unknown, message: string) {
  const errorMessage = getErrorMessage(error);
  console.log(message, errorMessage);
}

export function errorLogingAndToast(error: unknown, message: string) {
  const errorMessage = getErrorMessage(error);
  console.log(message, errorMessage);
  toast.error(errorMessage);
}
