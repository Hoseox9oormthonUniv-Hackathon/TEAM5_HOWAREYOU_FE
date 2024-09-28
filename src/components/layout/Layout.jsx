import { Outlet } from "react-router-dom";
import "../../styles/components/layout/Layout.scss";
// import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="Layout_Container">
      <div className="Header_Container">
        {/* <Header /> */}
      </div>
      <div className="Content_Container">
        <Outlet />
      </div>
      <div className="Footer_Container">
        <Footer />
      </div>
    </div>
  );
}
