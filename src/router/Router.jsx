import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Layout from '../components/layout/Layout'
import DetailDiaryPage from "../pages/DetailDiaryPage";
import DiaryListPage from "../pages/DiaryListPage";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/diary/:id",
    element: <DetailDiaryPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/list",
        element: <DiaryListPage />,
      },
    ],
  },
]);

export default Router;
