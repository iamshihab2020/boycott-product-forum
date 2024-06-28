import PropTypes from "prop-types";
import { Typography, Avatar } from "@material-tailwind/react";


const RecommendationCard = ({ recommendation }) => {
  const { re_productName, re_title, re_reason,userName,photoURL } = recommendation;


  return (
    <tr>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal flex items-center gap-2">
          <Avatar src={photoURL} alt="avatar" />{userName}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {re_productName}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {re_title}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {re_reason}
        </Typography>
      </td>
    </tr>
  );
};

RecommendationCard.propTypes = {
  recommendation: PropTypes.object.isRequired,
};

export default RecommendationCard;
