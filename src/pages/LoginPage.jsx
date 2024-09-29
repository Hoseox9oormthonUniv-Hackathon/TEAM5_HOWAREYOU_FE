import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Apis from "../apis/Apis";
import Kakao from "../assets/login/Kakao.svg";
import "../styles/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  useEffect(() => {
    const handleSocialLogin = async () => {
      const params = new URL(document.URL).searchParams;
      const code = params.get("code");

      if (code) {
        const response = await Apis.post(`/api/v1/auth/kakao`, {
          authorizationCode: code,
        });
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
        navigate("/");
      }
    };
    handleSocialLogin();
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = process.env.REACT_APP_KAKAO_LOGIN_URL;
  };

  return (
    <div className="LoginPage--Wrapper">
      <div className="LoginPage--TextBox">
        <div className="LoginPage--TextBox--Strong">
          <span style={{ color: "#FF9D00" }}>오늘은 뭐했어?</span>와 함께
        </div>
        <div>나만의 하루, 소중한 추억을</div>
        <div>인공지능을 사용하여</div>
        <div>쉽게 기록해보세요!</div>
      </div>
      <img
        src={Kakao}
        alt="kakao-login-btn"
        className="LoginPage--Login--Btn"
        onClick={() => handleLogin()}
      />
    </div>
  );
};

export default LoginPage;
