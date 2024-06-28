/* eslint-disable react/prop-types */

import PropTypes from "prop-types";

import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const DynamicBanner = ({header, para, isButton}) => {
  return (
    <section className=" m-3 md:m-9 lg:m-10 lg:mx-24 animate__animated  animate__zoomIn ">
      <div className="p-10 flex items-center justify-center flex-col rounded-l-xl border text-center border-[#00224D] bg-[url('https://images.unsplash.com/photo-1620990943104-e9e26b7d2442?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] rounded-xl bg-no-repeat  bg-cover bg-center bg-opacity-30">
        <Typography
          variant="h3"
          className="text-[#FFFF] font-black lg:text-5xl"
        >
          {header}
        </Typography>
        <Typography className="mt-2 mb-6 !text-base font-normal text-[#FFFF]">
          {para}
        </Typography>

        {isButton && (
          <Link to={`/addqueries`}>
            <Button className="bg-[#FF204E] flex items-center justify-center gap-2 lg:text-base">
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Add Queries
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

DynamicBanner.propTypes = {
  header: PropTypes.string,
  para: PropTypes.string,
  isButton: PropTypes.bool,
};
export default DynamicBanner;