import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Spinner, Typography, Card } from "@material-tailwind/react";
import DynamicBanner from "../shared/DynamicBanner/DynamicBanner";
import RecommendationCard from "./RecommendationCard";
import { AuthContext } from "../../providers/AuthProvider";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const userId = user ? user.uid : null;
  const [userQueries, setUserQueries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserQueries = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://boycott-product-forum-server.vercel.app/myQueries/${userId}`,
            { withCredentials: true }
          );
          setUserQueries(response.data);
        }
      } catch (error) {
        console.error("Error fetching user queries:", error);
      }
    };

    fetchUserQueries();
  }, [userId]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userQueryIds = userQueries.map((query) => query._id);
        const response = await axios.get(
          `https://boycott-product-forum-server.vercel.app/recommendation`,
          { withCredentials: true }
        );
        const filteredRecommendations = response.data.filter((recommendation) =>
          userQueryIds.includes(recommendation.query_id)
        );
        setRecommendations(filteredRecommendations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userQueries]);

  return (
    <div>
      <DynamicBanner header="Recommendations For Me" />
      <div className="px-3 md:px-24 animate__animated animate__zoomIn">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner color="red" size="large" />
          </div>
        ) : recommendations.length ? (
          <div className="mt-16 flex justify-center flex-wrap gap-y-20 w-full pb-12 gap-6">
            <Card className="h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                      >
                        User
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                      >
                        Product
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                      >
                        Title
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                      >
                        Reason
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((recommendation) => (
                    <RecommendationCard
                      key={recommendation._id}
                      recommendation={recommendation}
                    />
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <Typography variant="h3" className="text-[#A0153E] mb-6">
              {" "}
              No Recommendations to show.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsForMe;
