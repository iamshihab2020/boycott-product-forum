import React, { useContext, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Toast from "../Toast/Toast";

const NavMain =  () => {
  const { user, logOut } = useContext(AuthContext);
  const [toast, setToast] = useState(null);

  const showToast = (message, isSuccess) => {
    setToast({ message, isSuccess });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        showToast("You have logged out", false);
      })
      .catch(() =>
        showToast("An error occurred. Please try again later.", false)
      );
  };

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 w-full mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Home */}
      <Typography
        as="li"
        variant="medium"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? " pending"
              : isActive
              ? "bg-transparent hover:bg-transparent text-[#FF204E] font-bold"
              : "hover:bg-transparent hover:text-[#FF204E] text-[#00224D] duration-150 hover:-translate-y-1 "
          }
          to={`/`}
        >
          Home
        </NavLink>
      </Typography>
      {/* Queries */}
      <Typography
        as="li"
        variant="medium"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? " pending"
              : isActive
              ? "bg-transparent hover:bg-transparent text-[#FF204E] font-bold"
              : "hover:bg-transparent hover:text-[#FF204E] text-[#00224D] duration-150 hover:-translate-y-1 "
          }
          to={`/queries`}
        >
          Queries
        </NavLink>
      </Typography>

      {/* Conditionally render these buttons if user exists */}
      {user && (
        <>
          {/* Recommendation for Me */}
          <Typography
            as="li"
            variant="medium"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? " pending"
                  : isActive
                  ? "bg-transparent hover:bg-transparent text-[#FF204E] font-bold"
                  : "hover:bg-transparent hover:text-[#FF204E] text-[#00224D] duration-150 hover:-translate-y-1 "
              }
              to={`/recommendedforme`}
            >
              Recommendation for Me
            </NavLink>
          </Typography>

          {/* My Queries */}
          <Typography
            as="li"
            variant="medium"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? " pending"
                  : isActive
                  ? "bg-transparent hover:bg-transparent text-[#FF204E] font-bold"
                  : "hover:bg-transparent hover:text-[#FF204E] text-[#00224D] duration-150 hover:-translate-y-1 "
              }
              to={`/myqueries`}
            >
              My Queries
            </NavLink>
          </Typography>

          {/* My Recommendation */}
          <Typography
            as="li"
            variant="medium"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? " pending"
                  : isActive
                  ? "bg-transparent hover:bg-transparent text-[#FF204E] font-bold"
                  : "hover:bg-transparent hover:text-[#FF204E] text-[#00224D] duration-150 hover:-translate-y-1 "
              }
              to={`/myrecom`}
            >
              My Recommendation
            </NavLink>
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <Navbar className="mx-auto  bg-transparent min-w-full px-4 py-2 lg:px-8 lg:py-5 text-[#00224D] animate__animated  animate__zoomIn">
      <div className="container mx-auto flex items-center justify-between ">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold lg:text-xl text-[#FF204E]"
        >
          BoyCott Forum
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          {user ? (
            <>
              {" "}
              <Button
                onClick={handleLogOut}
                fullWidth
                variant="gradient"
                size="md"
                color="red"
                textcolor="#FF204E"
                className="hidden lg:inline-block"
              >
                <span className="flex items-center gap-2">Log Out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to={`/login`}>
                <Button
                  fullWidth
                  variant="gradient"
                  size="md"
                  color="red"
                  textcolor="#FF204E"
                  className="hidden lg:inline-block"
                >
                  <span className="flex items-center gap-2">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                      />
                    </svg>
                    Log in
                  </span>
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            {user ? (
              <>
                <Button
                  onClick={handleLogOut}
                  fullWidth
                  variant="gradient"
                  size="sm"
                  color="red"
                  textcolor="#FF204E"
                >
                  <span className="flex items-center  justify-center gap-2">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                      />
                    </svg>
                    Log Out
                  </span>
                </Button>
              </>
            ) : (
              <>
                <Link to={`/login`}>
                  <Button
                    fullWidth
                    variant="gradient"
                    size="sm"
                    color="red"
                    textcolor="#FF204E"
                  >
                    <span className="flex items-center  justify-center gap-2">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                        />
                      </svg>
                      Log in
                    </span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Collapse>
      {toast && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
    </Navbar>
  );
}
export default NavMain