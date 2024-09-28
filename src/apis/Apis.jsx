import axios from "axios";

const Apis = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

//요청시 AccessToken 계속 보내주기
Apis.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    config.headers["accessToken"] = null;
    return config;
  }
  if (config.headers && token) {
    const accessToken = token;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  }
});

Apis.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    let reIssueRequestDto = {
      refreshToken: sessionStorage.getItem("refreshToken"),
    };
    if (err.response && err.response.status === 401) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_ENDPOINT + "/api/v1/auth/reissue",
          reIssueRequestDto
        );
        console.log(response)
        if (response) {
          sessionStorage.setItem("accessToken", response.data.data.accessToken);
          sessionStorage.setItem(
            "refreshToken",
            response.data.data.refreshToken
          );

          return await Apis.request(originalConfig);
        }
      } catch (err) {
        console.error(err);
        redirectToLogin(); // 토큰 재발급 실패 시 로그인 화면으로 이동
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

function redirectToLogin() {
  // window.location.href = "/login";
}

export default Apis;
