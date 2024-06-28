/* eslint-disable no-unused-vars */
import { useLoaderData, useParams } from "react-router-dom";
import {
  Typography,
  Tooltip,
  Button,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import AddRecommendation from "./AddRecommendation";
import Recommendations from "./Recommendations";

import PrivateRoutes from "../../routes/PrivateRoutes";
import { useState, useEffect } from "react";
import axios from "axios";

const QueryDetails = () => {
  const queryDetails = useLoaderData();
  const { id } = useParams();
  const [dislikeCount, setDislikeCount] = useState(queryDetails.dislikeCount);

  if (!queryDetails) {
    // Loader while data is being fetched
    return <Spinner className="h-16 w-16 text-[#FF204E]" />;
  }

  const {
    userId,
    _id,
    displayName,
    email,
    photoURL,
    dateTime,
    recommendationCount,
    name,
    brand,
    image,
    title,
    details,
  } = queryDetails;

  const handleDislike = async () => {
    try {
      const response = await axios.put(`/api/queries/dislike/${_id}`);
      if (response.data.modifiedCount === 1) {
        setDislikeCount(dislikeCount + 1);
      }
    } catch (error) {
      console.error("Error updating dislike count:", error);
    }
  };

  return (
    <div className="animate__animated  animate__zoomIn">
      <Typography variant="h1" className="text-center mt-16 text-[#FF204E]">
        More Details About: {name}
      </Typography>

      <div className="p-5 md:p-20 flex items-start justify-center lg:justify-start flex-col lg:flex-row gap-14 ">
        <div className="w-full lg:w-1/2 border-r-2 border-[#5D0E41] h-[400px] py-10 flex items-center justify-center">
          <img
            src={image}
            alt={`${name} Image`}
            className="h-full  rounded-xl"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          <Typography variant="h2" className="text-[#5D0E41] mb-5">
            {title}
          </Typography>
          <Typography variant="lead" className="text-[#00224D]">
            <span className="font-bold">Product Name:</span> {name}
          </Typography>
          <Typography variant="lead" className="text-[#00224D]">
            <span className="font-bold">Brand Name:</span> {brand}
          </Typography>
          <Typography variant="lead" className="text-[#00224D]">
            <span className="font-bold">
              Alternate Reason / Boycott Reason:
            </span>{" "}
            {details}
          </Typography>
          <Typography variant="lead" className="text-[#00224D]">
            <span className="font-bold">Posted On:</span> {dateTime}
          </Typography>
          <div className="mt-5">
            <Tooltip content="Total Recommendation" placement="bottom">
              <Button size="sm" className="bg-[#65B741] text-base">
                <span className="flex items-center  justify-center gap-2">
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
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                  <span>Total Recommendation</span>
                  <span>{recommendationCount}</span>
                </span>
              </Button>
            </Tooltip>

            
            <Tooltip content="Dislike This!" placement="bottom">
              <Button
                size="sm"
                className="bg-red-500 text-base"
                onClick={handleDislike}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span>{dislikeCount}</span>
                </span>
              </Button>
            </Tooltip>
          </div>

          <div className="mt-5">
            <span className="font-bold">Created By</span>

            <div className="border-[#00224D] border-2 max-w-80 p-2 rounded-lg mt-3">
              <div className="flex items-center gap-4 ">
                <Avatar src={photoURL} alt="avatar" variant="rounded" />
                <div>
                  <Typography variant="h6">{displayName}</Typography>
                  <Typography variant="sm" className="text-[#00224D]">
                    {email}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <AddRecommendation queryDetails={queryDetails} />
          <div>
            <Recommendations queryId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryDetails;
