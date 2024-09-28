import React, { useEffect, useState } from 'react';
import '../../styles/components/layout/Footer.scss';

import Home from '../../assets/footer/Home.svg';
import Write from "../../assets/footer/Write.svg";
import List from "../../assets/footer/List.svg";
import My from "../../assets/footer/My.svg";
import activeHome from "../../assets/footer/activeHome.svg";
import activeWrite from "../../assets/footer/activeWrite.svg";
import activeList from "../../assets/footer/activeList.svg";
import activeMy from "../../assets/footer/activeMy.svg";
import { useLocation, useNavigate } from 'react-router-dom';

const menus = [
  {
    name: "홈",
    url: "/",
    src: Home,
    activeSrc: activeHome,
  },
  {
    name: "일기작성",
    url: "/write",
    src: Write,
    activeSrc: activeWrite,
  },
  {
    name: "일기목록",
    url: "/list",
    src: List,
    activeSrc: activeList
  },
  {
    name: "내 정보",
    url: "/my",
    src: My,
    activeSrc: activeMy
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  return (
    <div className="Footer--Wrapper">
      {menus.map((menu) => {
        return (
          <div
            key={menu.name}
            className={`Footer--Menu ${activeMenu === menu.url ? "active" : ""}`}
            onClick={() => {
              setActiveMenu(menu.url);
              navigate(menu.url);
            }}
          >
            <img
              className="Footer--Menu--Icon"
              src={activeMenu === menu.url ? menu.activeSrc : menu.src}
              alt="menu-icon"
              style={{ width: "24px", height: "24px" }}
            />

            <span
              className={`Footer--Menu--Text ${
                activeMenu === menu.url ? "active" : ""
              }`}
            >
              {menu.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Footer;