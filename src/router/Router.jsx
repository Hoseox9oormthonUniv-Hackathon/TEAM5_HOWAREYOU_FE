import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "../components/layout/Layout";

const GenerateDiaryPage = lazy(() => import("../pages/GenerateDiaryPage"));
const MyPage = lazy(() => import("../pages/MyPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DetailDiaryPage = lazy(() => import("../pages/DetailDiaryPage"));
const DiaryListPage = lazy(() => import("../pages/DiaryListPage"));

const Router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/diary/:id",
    element: (
      <Suspense>
        <DetailDiaryPage />
      </Suspense>
    ),
  },
  {
    path: "/write",
    element: (
      <Suspense>
        <GenerateDiaryPage />
      </Suspense>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "/list",
        element: (
          <Suspense>
            <DiaryListPage />
          </Suspense>
        ),
      },
      {
        path: "/my",
        element: (
          <Suspense>
            <MyPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
