import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicDiaryList } from "../apis/Diary/apis";
import "../styles/DiaryListPage.scss";

const DiaryListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState(null);

  useEffect(() => {
    if (
      !sessionStorage.getItem(
        "accessToken" || !sessionStorage.getItem("refreshToken")
      )
    ) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      const diaries = await getPublicDiaryList();
      if (diaries) {
        setList(diaries);
      }
    };
    fetchList();
  }, []);

  // 날짜 변환 함수 추가
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="DiaryList--Wrapper">
      <div className="DiaryList--Diary">
        {list && list.length > 0 ? (
          list.map((diary, index) => (
            <div
              key={index}
              className="DiaryList--Diary--Box"
              onClick={() => navigate(`/diary/${diary.diaryId}`)}
            >
              <div className="DiaryList--Diary--Box--Date">
                {formatDate(diary.createAt)}
              </div>
              <div className="DiaryList--Diary--Box--Title">{diary.title}</div>
              <div className="DiaryList--Diary--Box--Content">
                {diary.content}
              </div>
            </div>
          ))
        ) : (
          <div className="DiaryList--Diary--Box">
            <div className="DiaryList--Diary--Box--Not">
              존재하는 일기가 없어요!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryListPage;
