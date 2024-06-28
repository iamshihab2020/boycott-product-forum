/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // console.log(location.pathname);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-5">
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to={`/login`} replace></Navigate>;
};

export default PrivateRoutes;
