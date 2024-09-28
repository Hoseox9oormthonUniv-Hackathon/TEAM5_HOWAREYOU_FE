import Apis from "../Apis";

export const recentDiary = async () => {
  try {
    const response = await Apis.get("/api/v1/diary/recent");
    return response.data.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching info:", error);
    return null; // 오류 발생 시 null 반환
  }
};

export const getDiaryInfo = async (diaryId) => {
  try {
    const response = await Apis.get("/api/v1/diary/" + diaryId);
    return response.data.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching info:", error);
    return null; // 오류 발생 시 null 반환
  }
}

export const getPublicDiaryList = async () => {
  try {
    const response = await Apis.get("/api/v1/diary/");
    return response.data.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching info:", error);
    return null; // 오류 발생 시 null 반환
  }
}

export const getMyDiary = async () => {
  try {
    const response = await Apis.get("/api/v1/diary/my");
    return response.data.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching info:", error);
    return null; // 오류 발생 시 null 반환
  }
}
