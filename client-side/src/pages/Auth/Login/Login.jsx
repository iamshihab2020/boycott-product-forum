import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../shared/Toast/Toast";
import { Button } from "@material-tailwind/react";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const { signIn, handleGoogleSignIn } = useContext(AuthContext);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (message, isSuccess) => {
    setToast({ message, isSuccess });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    await signIn(email, password)
      .then((res) => {
        const loggedIn = res.user;
        console.log(loggedIn);
        const user = { email };
        showToast(
          "You have been successfully logged in. Go to Home Page to continue...",
          true
        );

        axios
          .post("https://boycott-product-forum-server.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              navigate(location?.state ? location?.state : "/");
            }
          });
      })
      .catch((error) => {
        console.log("Error: " + error);
        showToast("Incorrect email or password.", false);
      });
  };

  const handleGoogleRedirect = async () => {
    try {
      await handleGoogleSignIn();
      showToast("Google sign-in successful. Go To Home Page", true);
      navigate("/", { replace: true });
    } catch (error) {
      showToast("Google sign-in failed. Please try again.", false);
    }
  };

  const inputDesign =
    "peer h-full w-full rounded-md border border-[#00224D] border-t-transparent !border-t-[#00224D] bg-transparent px-3 py-3 font-sans text-sm font-normal text-[#00224D] outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#00224D] placeholder-shown:border-t-[#00224D] focus:border-2 focus:border-[#00224D] focus:border-t-transparent focus:!border-t-[#00224D] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

  return (
    <>
      {toast && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
      <div className="min-h-screen mt-10 pb-20 px-5 lg:px-36 flex flex-row items-center justify-center">
        <div className="w-1/2 hidden lg:inline-block animate__animated animate__fadeInRight ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/012/185/506/original/free-palestine-the-boy-stand-with-flag-illustration-background-pray-for-palestine-flag-wallpaper-flyer-banner-t-shirt-post-illustration-free-vector.jpg"
            alt=""
            className="min-h-full"
          />
        </div>

        <div className="animate__animated animate__fadeInLeft border-[#00224D] border-2 font-sans w-full lg:w-1/2 mx-auto mt-8 relative flex flex-col items-center text-[#00224D] bg-transparent shadow-xl rounded-xl p-14">
          <Typography variant="h3" color="#00224D">
            Log In
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-screen-lg mt-8 mb-2 w-full sm:w-[400px] space-y-4"
          >
            <div className="flex flex-col gap-6 mb-1 md:px-5">
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-[#00224D]">
                Your Email
              </h6>
              <div className="relative h-11 w-full">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className={inputDesign}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 mb-1 md:px-5">
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-[#00224D]">
                Your Password
              </h6>
              <div className="relative h-11 w-full">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={inputDesign}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).{6,}$/i,
                      message:
                        "Password must contain at least one uppercase letter, one digit, and be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="md:px-5">
              <input
                type="submit"
                value="Log In"
                className="w-full p-2 bg-[#FF204E] text-white mt-5 cursor-pointer hover:bg-[#892136] duration-200 rounded-md"
              />
            </div>
            <div className="flex flex-col items-center gap-6 mb-1 md:px-5 py-3">
              <h6 className="block -mb-3 text-center font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-[#00224D]">
                Or
              </h6>
              <div>
                <Button
                  className="bg-[#00224D] text-lg flex items-center gap-4"
                  onClick={handleGoogleRedirect}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 32 32"
                    data-name="Layer 1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
                      fill="#00ac47"
                    />
                    <path
                      d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
                      fill="#4285f4"
                    />
                    <path
                      d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
                      fill="#ffba00"
                    />
                    <polygon
                      fill="#2ab2db"
                      points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
                    />
                    <path
                      d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
                      fill="#ea4435"
                    />
                    <polygon
                      fill="#2ab2db"
                      points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
                    />
                    <path
                      d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
                      fill="#4285f4"
                    />
                  </svg>
                  <span className="text-base">Log In with Google</span>
                </Button>
              </div>
            </div>
            <div className="text-center">
              <p>
                New to this forum?{" "}
                <Link to={`/signup`} className="text-[#FF204E] font-bold">
                  Sign Up{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
