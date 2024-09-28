import React, { useEffect, useState } from 'react';
import '../styles/MainPage.scss';

import Sad from '../assets/main/Sad.svg';
import Angry from "../assets/main/Angry.svg";
import Soso from "../assets/main/Soso.svg";
import Smile from "../assets/main/Smile.svg";
import Happy from "../assets/main/Happy.svg";
import { getInfo } from '../apis/Info/apis';
import { recentDiary } from "../apis/Diary/apis";
import { useNavigate } from 'react-router-dom';

const emotionBlocks = [
  {
    src: Sad,
  },
  {
    src: Angry,
  },
  {
    src: Soso,
  },
  {
    src: Smile,
  },
  {
    src: Happy,
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [recentList, setRecentList] = useState();

    useEffect(() => {
      if(!sessionStorage.getItem('accessToken' || !sessionStorage.getItem('refreshToken'))) {
        navigate('/login')
      }
    }, []);

    useEffect(() => {
      const fetchInfo = async () => {
        const info = await getInfo(); // getInfo 호출
        if (info) {
          setName(info.name);
        }
      };
      const fetchRecentList = async () => {
        const list = await recentDiary();
        setRecentList(list ? list : null);
      }
      fetchInfo(); // fetchInfo 실행
      fetchRecentList();
    }, []);
  
    const formatDate = (isoString) => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
      const day = date.getDate();
      return `${year}년 ${month}월 ${day}일`;
    };
  return (
    <>
      {name && recentList && (
        <div className="MainPage--Wrapper">
          <div className="MainPage--TopBox">
            <div className="MainPage--Hello">안녕하세요, {name}님</div>
            <div className="MainPage--How">오늘 하루는</div>
            <div className="MainPage--How">잘 보내셨나요?</div>
            <div className="MainPage--Emotion--Block">
              {emotionBlocks.map((block, index) => (
                <img src={block.src} alt="" key={index} />
              ))}
            </div>
          </div>
          <div className="MainPage--Middle--Text">최근에 작성한 일기</div>
          <div className="MainPage--Recent--Diary">
            {recentList && recentList.length > 0 ? (
              recentList.map((diary, index) => (
                <div
                  key={index}
                  className="MainPage--Recent--Diary--Box"
                  onClick={() => navigate(`/diary/${diary.diaryId}`)}
                >
                  <div className="MainPage--Recent--Diary--Box--Date">
                    {formatDate(diary.createAt)}
                  </div>
                  <div className="MainPage--Recent--Diary--Box--Title">
                    {diary.title}
                  </div>
                  <div className="MainPage--Recent--Diary--Box--Content">
                    {diary.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="MainPage--Recent--Diary--Box">
                <div className="MainPage--Recent--Diary--Box--Not">
                  존재하는 일기가 없어요!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;