import { useRecoilState } from "recoil";
import { navigateModalState, navigateModalUrlState } from "../store/modalAtom";
import { useState } from "react";

export function useNavigateModal() {
  const [isOpen, setIsOpen] = useRecoilState(navigateModalState);
  const [navigateModalUrl, setNavigateModalUrl] = useRecoilState(
    navigateModalUrlState
  );

  const onOpen = ({
    naverUrl,
    kakaoUrl,
  }: {
    naverUrl: string;
    kakaoUrl: string;
  }) => {
    setIsOpen(true);
    setNavigateModalUrl({ kakaoUrl, naverUrl });
  };

  const onClose = () => {
    setIsOpen(false);
    setNavigateModalUrl({ kakaoUrl: "", naverUrl: "" });
  };

  return {
    isOpen,
    onOpen,
    onClose,
    navigateModalUrl,
  };
}
