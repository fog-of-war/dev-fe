import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosBase } from "./axios";
import { postRefreshToken } from "./auth";
import { setDataToLocalStorage } from "../utils/localStorage";
import { STORAGE_KEY } from "../constants/storage";
import { toast } from "react-hot-toast";
import { MESSAGE } from "../constants/messages";
import axios from "axios";

export default function AxiosNavigation() {
  const navigate = useRef(useNavigate());

  useEffect(() => {
    const interceptor = axiosBase.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;

        console.log("응답에러");

        //토큰이 만료되을 때
        if (status === 401) {
          if (error.response.data.message === "Unauthorized") {
            console.log("토큰 만료");

            const originRequest = config;
            //리프레시 토큰 api
            const response = await postRefreshToken();
            //리프레시 토큰 요청이 성공할 때
            if (response?.status === 200) {
              console.log("토큰 요청 성공");
              const newAccessToken = response.data.access_token;
              const newRefreshToken = response.data.refresh_token;
              setDataToLocalStorage(STORAGE_KEY.ACCESS_TOKEN, newAccessToken);
              setDataToLocalStorage(STORAGE_KEY.REFRESH_TOKEN, newRefreshToken);
              axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
              console.log("요청을 이어서 진행합니다.");
              //진행중이던 요청 이어서하기
              originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(originRequest);
              //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
            } else if (response?.status === 404) {
              toast.error(MESSAGE.LOGIN.EXPIRED);
              navigate.current("/auth");
            } else {
              toast.error(MESSAGE.LOGIN.EXPIRED);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosBase.interceptors.response.eject(interceptor);
    };
  }, []);
  return <></>;
}
