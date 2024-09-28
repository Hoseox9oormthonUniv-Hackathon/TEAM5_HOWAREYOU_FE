import React, { useEffect, useState } from 'react';
import '../styles/MyPage.scss';
import { getMyDiary } from '../apis/Diary/apis';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate()
    const [list, setList] = useState(null)
  useEffect(() => {
    const fetchList = async () => {
      const diaries = await getMyDiary();
      if (diaries) {
        setList(diaries);
      }
    };
    fetchList();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  console.log(list)
    return (
      <div className="MyPage--Wrapper">
        <div className="MyPage--TopText">내가 작성한 일기</div>
        <div className="MyPage--Diary--Wrapper">
          {list &&
            list.map((diary, index) => (
              <div className="MyPage--Diary--Box" key={index} onClick={() => navigate('/diary/'+diary.diaryId)}>
                <div className="MyPage--Diary--Box--Date">
                  {formatDate(diary.createAt)}
                </div>
                <div className="MyPage--Diary--Box--Title">{diary.title}</div>
                <div className="MyPage--Diary--Box--Content">
                  {diary.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
};

export default MyPage;