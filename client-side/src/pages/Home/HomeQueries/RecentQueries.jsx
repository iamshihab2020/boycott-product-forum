import { useState, useEffect } from "react";
import axios from "axios";
import RecentQueryCard from "./RecentQueryCard";

const RecentQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://boycott-product-forum-server.vercel.app/allqueries"
        );
        setQueries(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="px-3 md:px-24 animate__animated animate__zoomIn">
        <div className="mt-16 flex ">
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-y-20 w-full  pb-12 gap-6`}
          >
            {queries.map((query) => (
              <div
                key={query._id}
                className="flex justify-center lg:justify-between"
              >
                <RecentQueryCard query={query} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentQueries;
