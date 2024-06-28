
import { Button, Tooltip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const QueriesCard = ({ query }) => {
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

  return (
    <div className="flex items-start justify-center">
      <div className="max-w-md">
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

            <Typography className="text-[#5D0E41] flex items-center gap-2">
              <span className="font-bold">Product name: </span>
              {name}
            </Typography>
            <Typography className="text-[#5D0E41] flex items-center gap-2">
              <span className="font-bold">Brand name: </span>
              {brand}
            </Typography>
            <Typography className="text-[#00224D] flex items-center flex-wrap gap-2">
              <span className="font-bold mt-3 text-[#5D0E41]">
                Alternation Reason :
              </span>{" "}
              {details}
            </Typography>
            <Typography className="text-[#00224D] flex items-center justify-end gap-2 mt-3">
              <span className="font-bold">Posted on: </span>
              {dateTime}
            </Typography>

            <div className="flex items-center justify-end gap-4 mt-2 text-[#00224D]">
              <Avatar src={photoURL} alt={`Image of ${displayName}`} />
              <div>
                <Typography variant="h6">{displayName}</Typography>
              </div>
            </div>
          </CardBody>

          <CardFooter className="pt-0 mt-8">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <Tooltip content="Recommend This!" placement="bottom">
                <Button size="sm" className="bg-[#65B741] text-base">
                  <span className="flex items-center justify-center gap-2">
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
                    <span className="flex items-center justify-center gap-2 text-base">
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
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

QueriesCard.propTypes = {
  query: PropTypes.object.isRequired,
};

export default QueriesCard;
