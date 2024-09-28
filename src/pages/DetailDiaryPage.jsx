import React, { useEffect, useState } from 'react';
import { getDiaryInfo } from '../apis/Diary/apis';
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/DetailDiaryPage.scss';
import Back from '../assets/diary/back.svg';
import Menu from '../assets/diary/Menu.svg';
import Edit from '../assets/diary/Edit.svg';
import Delete from "../assets/diary/Delete.svg";
import Apis from '../apis/Apis';

const DetailDiaryPage = () => {

    const navigate = useNavigate();
    const [isMenu, setIsMenu] = useState(false);
    const [diary, setDiary] = useState(null);
    const { id } = useParams();

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
      const fetchInfo = async () => {
        const info = await getDiaryInfo(id);
        if(info) {
            setDiary(info)
        }
      };
      fetchInfo();
    }, []);

    console.log(diary);

    const deteteDiary = () => {
      Apis.delete("/api/v1/diary/" + id)
      .then((res) => {
        console.log(res)
      });
      navigate('/')
    }

    const isPublic = () => {
      Apis.put("/api/v1/diary/share/"+id)
      .then((res) => {
        console.log(res)
        window.location.reload();
      })
    }
    
    return (
      <>
        {isMenu && (
          <div className="Detail--Menu--Box">
            <div className="Detail--Menu--Item" onClick={() => isPublic()}>
              <img src={Edit} alt="Edit" />
              <div>{diary && diary.isShared ? "비공개" : "공개"}</div>
            </div>
            <div className="Detail--Menu--Item" onClick={() => deteteDiary()}>
              <img src={Delete} alt="Delete" />
              <div>삭제</div>
            </div>
          </div>
        )}
        <div className="Detail--Wrapper">
          <div className="Detail--Header">
            <img
              src={Back}
              alt="back"
              className="Detail--Back"
              onClick={() => navigate('/')}
            />
            <img
              src={Menu}
              alt="Menu"
              className="Detail--Menu"
              onClick={() => setIsMenu(!isMenu)}
            />
          </div>
          <img
            src={diary && diary.imageUrl}
            className="Detail--Diary--Img"
            alt="img"
          />
          <div className="Detail--Title">{diary && diary.title}</div>
          <div className="Detail--Content">{diary && diary.content}</div>
          { diary &&
            <div className="Detail--About">
              - &nbsp;
              <div>{diary.writer}</div>
              &nbsp;
              <div>
                {diary.createAt[0]}년 {diary.createAt[1]}월 {diary.createAt[2]}일
              </div>
              &nbsp; -
            </div>
          }
        </div>
      </>
    );
};

export default DetailDiaryPage;