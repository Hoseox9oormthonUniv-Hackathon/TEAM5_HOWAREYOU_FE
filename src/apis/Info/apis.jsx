import Apis from "../Apis";

export const getInfo = async () => {
  try {
    const response = await Apis.get("/api/v1/member/");
    return response.data.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching info:", error);
    return null; // 오류 발생 시 null 반환
  }
};
