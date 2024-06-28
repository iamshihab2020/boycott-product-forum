import PropTypes from "prop-types";
import {
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";

const RecommendationCard = ({ recommendation }) => {
  const {
    re_title,
    re_productName,
    re_image,
    re_reason,
    currentTime,
    userName,
    photoURL,
  } = recommendation;

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  return (
    <div>
      <div className="mb-4 p-5 border-b rounded-lg">
        <div className="flex  items-start gap-3">
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src={photoURL}
              className="border border-[#FF204E] shadow-xl shadow-[rgb(255,218,224)] ring-4 ring-[#FF204E]"
            />
          </div>
          <div>
            <div className="flex gap-4">
              <Typography variant="h5">{userName}</Typography>
              <Typography variant="sm" className="text-[#00224D]">
                {currentTime}
              </Typography>
            </div>
            <Typography variant="para" className="text-[#00224D] text-lg">
              {re_title}
            </Typography>
            <Typography variant="p" className="text-[#00224D] text-lg">
              <span className="font-bold">Product Name: </span>
              {re_productName}
            </Typography>
            <div className="py-3">
              <img
                src={re_image}
                alt={`Image of ${re_productName}`}
                className="max-h-36  "
              />
            </div>
            <div>
              <Button onClick={() => handleOpen("sm")} variant="sm">
                View More
              </Button>
              <Dialog
                open={
                  size === "xs" ||
                  size === "sm" ||
                  size === "md" ||
                  size === "lg" ||
                  size === "xl" ||
                  size === "xxl"
                }
                size={size || "md"}
                handler={handleOpen}
                className="p-5"
              >
                <DialogHeader>{re_title}</DialogHeader>
                <DialogBody>
                  <div>
                    <span>
                      <span className="font-bold">Product Name: </span>
                      {re_productName}
                    </span>
                    <br />
                    <span>
                      <span className="font-bold">Recommendation Reason: </span>
                      {re_reason}
                    </span>
                    <br />
                    <img src={re_image} className="h-80" alt={`Image of ${re_productName}`} />
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="gradient"
                    color="red"
                    onClick={() => handleOpen(null)}
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecommendationCard.propTypes = {
  recommendation: PropTypes.object.isRequired,
};

export default RecommendationCard;
