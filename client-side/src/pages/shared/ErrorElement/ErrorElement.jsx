import { useLottie } from "lottie-react";
import errorElementAnimation from "../../../assets/lottie/errorElement.json";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ErrorElement = () => {
  const options = {
    animationData: errorElementAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-8">
        <div>{View}</div>
        <Link to={`/`}>
          <Button variant="gradient" size="md" color="red" textColor="#FF204E">
            <span className="flex items-center gap-2 text-center justify-center">
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
              Back To Home
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorElement;
