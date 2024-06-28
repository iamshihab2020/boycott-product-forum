import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import PropTypes from "prop-types";
import RecommendationCard from "./RecommendationCard";

const Recommendations = ({ queryId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://boycott-product-forum-server.vercel.app/recommendation`
        );
        setRecommendations(
          response.data.filter(
            (recommendation) => recommendation.query_id === queryId
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [queryId]);

  return (
    <div>
      <Typography variant="h4" className="mt-10 mb-5 text-[#5D0E41]">
        All Recommendations
      </Typography>
      <div className="shadow-md border-2 p-3 rounded-xl">
        {loading ? (
          <Typography>Loading recommendations...</Typography>
        ) : recommendations.length === 0 ? (
          <Typography>No recommendations to show</Typography>
        ) : (
          recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation._id}
              recommendation={recommendation}
            />
          ))
        )}
      </div>
    </div>
  );
};

Recommendations.propTypes = {
  queryId: PropTypes.string.isRequired,
};

export default Recommendations;
