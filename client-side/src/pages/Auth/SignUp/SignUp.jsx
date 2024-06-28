import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Toast from "../../shared/Toast/Toast";

const SignUp = () => {
  const navigate = useNavigate();

  const { createUser } = useContext(AuthContext);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const showToast = (message, isSuccess) => {
    setToast({ message, isSuccess });
    setTimeout(() => {
      setToast(null);
      navigate("/", { replace: true });
      window.location.reload();
    }, 4000);
  };


  const onSubmit = async (data) => {
    try {
      const { email, password, photoURL, displayName, phone  } = data;
      const user = await createUser(
        email,
        password,
        displayName,
        photoURL,
        phone
      );
      console.log(user);
      reset();
      showToast("Your account has been created. Redirecting to Home...", true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showToast("Email is already in use.", false);
      } else {
        showToast("An error occurred. Please try again later.", false);
      }
    }
  };


  const inputDesign =
    "peer h-full w-full rounded-md border border-[#00224D] border-t-transparent !border-t-[#00224D] bg-transparent px-3 py-3 font-sans text-sm font-normal text-[#00224D] outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#00224D] placeholder-shown:border-t-[#00224D] focus:border-2 focus:border-[#00224D] focus:border-t-transparent focus:!border-t-[#00224D] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

  return (
    <>
      {toast && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
      <div className="min-h-screen mt-10 pb-20 px-5 lg:px-36 flex flex-row items-center justify-center">
      
        <div className="animate__animated animate__fadeInRight border-[#00224D] border-2 font-sans w-full lg:w-1/2 mx-auto mt-8 relative flex flex-col items-center text-[#00224D] bg-transparent shadow-xl rounded-xl p-14">
          <Typography variant="h3" color="#00224D">
            Sign Up
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-screen-lg mt-8 mb-2 w-full sm:w-[400px] space-y-4"
          >
            <div className="flex flex-col gap-6 mb-1 md:px-5">
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-[#00224D]">
                Your Name
              </h6>
              <div className="relative h-11 w-full">
                <input
                  type="text"
                  placeholder="Name"
                  name="displayName"
                  className={inputDesign}
                  {...register("displayName", { required: "Name is required" })}
                />
                {errors.displayName && (
                  <p className="text-red-500">{errors.displayName.message}</p>
                )}
              </div>
            </div>
      
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
                Your Phone Number
              </h6>
              <div className="relative h-11 w-full">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  className={inputDesign}
                  {...register("phone", {
                    maxLength: {
                      value: 11,
                      message: "Phone number must be 11 digits long",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
      
            <div className="flex flex-col gap-6 mb-1 md:px-5">
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-[#00224D]">
                Your Photo URL
              </h6>
              <div className="relative h-11 w-full">
                <input
                  type="url"
                  placeholder="Photo URL"
                  name="photoURL"
                  className={inputDesign}
                  {...register("photoURL", {
                    pattern: {
                      value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                      message: "Invalid URL",
                    },
                  })}
                />
                {errors.photoURL && (
                  <p className="text-red-500">{errors.photoURL.message}</p>
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
                value="Submit"
                className="w-full p-2 bg-[#FF204E] text-white mt-5 cursor-pointer hover:bg-[#892136] duration-200 rounded-md"
              />
            </div>
          </form>
        </div>
      
        <div className="w-1/2 hidden lg:inline-block animate__animated animate__fadeInLeft ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/012/185/506/original/free-palestine-the-boy-stand-with-flag-illustration-background-pray-for-palestine-flag-wallpaper-flyer-banner-t-shirt-post-illustration-free-vector.jpg"
            alt=""
            className="min-h-full"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
