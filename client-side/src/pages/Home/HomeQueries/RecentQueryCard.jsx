import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";


const RecentQueryCard = ({ query }) => {
  const {
    displayName,
    photoURL,
    dateTime,
    name,
    brand,
    image,
    title,
    details,
  } = query;

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
              <Avatar
                src={photoURL}
                alt={`Image of ${displayName}`}
               
              />
              <div>
                <Typography variant="h6">{displayName}</Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

RecentQueryCard.propTypes = {
  query: PropTypes.object.isRequired,
};
export default RecentQueryCard;
