import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Layout from '../components/layout/Layout'

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
    {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
            <MainPage />
        ),
      },
    ]
    },
]);

export default Router;
