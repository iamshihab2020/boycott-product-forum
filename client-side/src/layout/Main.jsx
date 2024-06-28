
import { Outlet } from "react-router-dom";
import NavMain from "../pages/shared/NavMain/NavMain";
import Footer from "../pages/shared/Footer/Footer";
// import { Navbars } from "../pages/shared/NavMain/NavMainn";

const Main = () => {
  return (
    <>
      < NavMain/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default Main;