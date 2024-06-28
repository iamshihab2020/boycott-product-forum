import { useState, useEffect, useContext } from "react";
import SeeMyQueries from "./SeeMyQueries";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import DynamicBanner from "../shared/DynamicBanner/DynamicBanner";

const MyQueriesContainer = () => {
  const [userQueries, setUserQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchUserQueries = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://boycott-product-forum-server.vercel.app/myQueries/${userId}`,
            { withCredentials: true }
          );
          setUserQueries(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user queries:", error);
        setLoading(false);
      }
    };

    fetchUserQueries();
  }, [userId]);

  const [gridLayout, setGridLayout] = useState("grid-cols-3");

  const handleGridLayoutChange = (layout) => {
    setGridLayout(`grid-cols-${layout}`);
  };

  const handleDelete = async (deletedQueId) => {
    try {
      await axios.delete(
        `https://boycott-product-forum-server.vercel.app/queries/${deletedQueId}`
      );
      setUserQueries((prevQueries) =>
        prevQueries.filter((que) => que._id !== deletedQueId)
      );
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  return (
    <div>
      <div>
        <DynamicBanner
          header={"Add queries to contribute in this community"}
          isButton
        />
      </div>

      <div className="px-3 md:px-24 animate__animated animate__zoomIn">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner color="red" size="large" />
          </div>
        ) : userQueries.length ? (
          <div>
            <div className="mt-6 flex justify-center gap-2">
              <Button
                onClick={() => handleGridLayoutChange(3)}
                className={`rounded-md cursor-pointer ${
                  gridLayout === "grid-cols-3"
                    ? "bg-[#FF204E] text-white"
                    : "bg-[#00224D]"
                }`}
              >
                3
              </Button>
              <Button
                onClick={() => handleGridLayoutChange(2)}
                className={`rounded-md cursor-pointer ${
                  gridLayout === "grid-cols-2"
                    ? "bg-[#FF204E] text-white"
                    : "bg-[#00224D]"
                }`}
              >
                2
              </Button>
              <Button
                onClick={() => handleGridLayoutChange(1)}
                className={`rounded-md cursor-pointer ${
                  gridLayout === "grid-cols-1"
                    ? "bg-[#FF204E] text-white"
                    : "bg-[#00224D]"
                }`}
              >
                1
              </Button>
            </div>
            <div className="mt-16 flex justify-center">
              <div
                className={`flex items-center justify-center flex-wrap lg:grid ${gridLayout}  gap-y-20 w-full pb-12 gap-6`}
              >
                {userQueries.map((query) => (
                  <div key={query._id} className="flex justify-center">
                    <SeeMyQueries query={query} onDelete={handleDelete} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <Typography variant="h3" className="text-[#A0153E] mb-6">
              {" "}
              No Queries to show. Start adding queries.
            </Typography>
            <Link to={`/addqueries`}>
              <Button className="bg-[#FF204E] flex items-center justify-center gap-2 lg:text-base">
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Add Queries
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueriesContainer;
