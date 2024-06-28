/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const SeeMyQueries = ({ query, onDelete }) => {
  const {
    _id,
    displayName,
    photoURL,
    dateTime,
    recommendationCount,
    name,
    brand,
    image,
    title,
    details,
  } = query;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00224D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://boycott-product-forum-server.vercel.app/queries/${_id}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "This query has been deleted.",
            icon: "success",
          });
          onDelete(_id);
        } catch (error) {
          console.error("Error deleting query:", error);
        }
      }
    });
  };

  return (
    <div className="flex items-start justify-center">
      <div className="max-w-md ">
        <Card className="mt-4 max-h-[800px]">
          <CardHeader color="white" className="relative max-h-96 p-10">
            <img
              src={image}
              alt="card-image"
              className="object-cover h-full w-full"
            />
          </CardHeader>
          <CardBody className="mt-3">
            <Typography variant="h5" className="mb-2 text-[#5D0E41]">
              {title}
            </Typography>

            <Typography className="text-[#00224D] flex items-center justify-end gap-2 mt-6">
              <p className="font-bold">Posted on: </p>
              {dateTime}
            </Typography>

            <div className="flex items-center justify-end gap-4 mt-2 text-[#00224D]">
              <Avatar src={photoURL} alt={`Image of ${displayName}`} />
              <div>
                <Typography variant="h6">{displayName}</Typography>
              </div>
            </div>
          </CardBody>

          <CardFooter className="pt-0 mt-2">
            <div className="flex items-end justify-between flex-wrap gap-4">
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
                    <span>{recommendationCount}</span>
                  </span>
                </Button>
              </Tooltip>

              <Link to={`/queries/${_id}`}>
                <Tooltip content="Click to more about this" placement="bottom">
                  <Button size="sm" className="bg-[#FF204E]">
                    <span className="flex items-center  justify-center gap-2 text-base">
                      View Details
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
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>
                  </Button>
                </Tooltip>
              </Link>

              <Link to={`/update-queries/${_id}`}>
                <Tooltip content="Update this query" placement="bottom">
                  <Button size="sm" className="bg-[#5D0E41]">
                    <span className="flex items-center  justify-center gap-2 text-base">
                      Update
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </span>
                  </Button>
                </Tooltip>
              </Link>

              <Tooltip content="Delete this query" placement="bottom">
                <Button
                  size="sm"
                  className="bg-red-600"
                  onClick={() => handleDelete(_id)}
                >
                  <span className="flex items-center  justify-center gap-2 text-base">
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>
                </Button>
              </Tooltip>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

SeeMyQueries.propTypes = {
  query: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SeeMyQueries;
