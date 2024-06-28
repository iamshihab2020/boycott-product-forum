import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { Spinner, Typography, Card } from "@material-tailwind/react";
import DynamicBanner from "../shared/DynamicBanner/DynamicBanner";
import MyRecommendationCard from "./MyRecommendationCard";

const MyRecom = () => {
  const { user, token } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `https://boycott-product-forum-server.vercel.app/recommendations?userEmail=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setRecommendations(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, token]);

  const handleDelete = async (deletedId) => {
    try {
      await axios.delete(
        `https://boycott-product-forum-server.vercel.app/recommendations/${deletedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Add this line
        }
      );

      setRecommendations((prevRecommendations) =>
        prevRecommendations.filter(
          (recommendation) => recommendation._id !== deletedId
        )
      );
    } catch (error) {
      console.error("Error deleting recommendation:", error);
    }
  };

  return (
    <div>
      <DynamicBanner header="My Recommendations" />
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
                        className="font-bold "
                      >
                        Product
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold "
                      >
                        Title
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold "
                      >
                        Reason
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-[#00224D] p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((recommendation) => (
                    <MyRecommendationCard
                      key={recommendation._id}
                      recommendation={recommendation}
                      onDelete={handleDelete}
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

export default MyRecom;
