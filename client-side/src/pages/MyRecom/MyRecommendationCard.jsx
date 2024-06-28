import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import axios from "axios";

const MyRecommendationCard = ({ recommendation, onDelete }) => {
  const { _id, re_title, re_productName, re_reason } = recommendation;

  const handleDelete = () => {
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
            `https://boycott-product-forum-server.vercel.app/recommendations/${_id}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage to get the token
              },
            }
          );
          Swal.fire({
            title: "Deleted!",
            text: "This recommendation has been deleted.",
            icon: "success",
          });
          onDelete(_id);
        } catch (error) {
          console.error("Error deleting recommendation:", error);
        }
      }
    });
  };

  return (
    <tr>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {re_productName}
        </Typography>
      </td>
      <td className={`p-4 bg-blue-gray-50/50`}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {re_title}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {re_reason}
        </Typography>
      </td>
      <td className={`p-4 bg-blue-gray-50/50`}>
        <Typography
          as="a"
          href="#"
          variant="small"
          color="red"
          className="font-bold"
          onClick={handleDelete}
        >
          Delete
        </Typography>
      </td>
    </tr>
  );
};

MyRecommendationCard.propTypes = {
  recommendation: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MyRecommendationCard;
