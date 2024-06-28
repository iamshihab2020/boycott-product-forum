/* eslint-disable no-unused-vars */
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const AddRecommendation = ({ queryDetails }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

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

  const timestamp = Date.now();
  const date = new Date(timestamp);
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Dhaka",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleAddRecommendation = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the "Add" button is clicked
    const form = e.target;
    const re_title = form.re_title.value;
    const re_productName = form.re_productName.value;
    const re_image = form.re_image.value;
    const re_reason = form.re_reason.value;

    const addRecommendation = {
      re_title,
      re_productName,
      re_image,
      re_reason,
      currentTime: formatDate(date),
      query_id: _id,
      queryTitle: title,
      productName: name,
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      photoURL: user.photoURL,
    };

    form.reset();

    // Retrieve the token
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await axios.post(
        "https://boycott-product-forum-server.vercel.app/recommendation",
        addRecommendation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.insertedId) {
        setOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Recommendation added successfully",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#00224D",
        }).then(() => {
          window.location.reload();
        });
      } else {
        throw new Error("Failed to add Recommendation");
      }
    } catch (error) {
      console.error("Error adding Recommendation:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add Recommendation",
        icon: "error",
        confirmButtonColor: "#00224D",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-5">
        <Tooltip content="Click to add a recommendation" placement="bottom">
          <Button
            onClick={handleOpen}
            className="lg:text-base flex items-center gap-2 bg-[#A0153E]"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add a Recommendation
          </Button>
        </Tooltip>

        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <form onSubmit={handleAddRecommendation}>
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" className="text-[#A0153E]">
                  Add a Recommendation
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Fill up this for Recommendation.
                </Typography>

                <Typography className="-mb-2" variant="h6">
                  Title
                </Typography>
                <Input
                  label="Title"
                  size="lg"
                  className="focus:border-[#A0153E]"
                  name="re_title"
                />

                <Typography className="-mb-2" variant="h6">
                  Product Name
                </Typography>
                <Input
                  label="Product Name"
                  size="lg"
                  className="focus:border-[#A0153E]"
                  name="re_productName"
                />

                <Typography className="-mb-2" variant="h6">
                  Product Image Link
                </Typography>
                <Input
                  label="Product Name"
                  size="lg"
                  className="focus:border-[#A0153E]"
                  name="re_image"
                />

                <Typography className="-mb-2" variant="h6">
                  Recommendation Reason
                </Typography>
                <Input
                  label="Recommendation Reason"
                  size="lg"
                  className="focus:border-[#A0153E]"
                  name="re_reason"
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  className="bg-[#A0153E]"
                  onClick={handleOpen}
                  fullWidth
                  type="submit"
                >
                  Add
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

AddRecommendation.propTypes = {
  queryDetails: PropTypes.object.isRequired,
};

export default AddRecommendation;
