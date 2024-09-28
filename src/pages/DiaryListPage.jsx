import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicDiaryList } from '../apis/Diary/apis';
import '../styles/DiaryListPage.scss';

const DiaryListPage = () => {
    const navigate = useNavigate()
    const [list, setList] = useState(null);

    useEffect(() => {
      const fetchList = async () => {
        const diaries = await getPublicDiaryList();
        if (diaries) {
          setList(diaries);
        }
      };
      fetchList();
    }, [])
    console.log(list)
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
                  {diary.createAt[0]}년 {diary.createAt[1]}월{" "}
                  {diary.createAt[2]}일
                </div>
                <div className="DiaryList--Diary--Box--Title">
                  {diary.title}
                </div>
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