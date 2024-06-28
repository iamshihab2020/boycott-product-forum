import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DynamicBanner from "../shared/DynamicBanner/DynamicBanner";
import QueriesCard from "./QueriesCard";
import { Button, Input } from "@material-tailwind/react";

const Queries = () => {
  const allQueries = useLoaderData();
  const [gridLayout, setGridLayout] = useState("grid-cols-3");
  const [searchText, setSearchText] = useState("");

  const handleGridLayoutChange = (layout) => {
    setGridLayout(`grid-cols-${layout}`);
  };

  const filteredQueries = allQueries.filter((query) =>
    query.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <DynamicBanner header={`All Queries`} para={""} isButton={false} />

      <div className="px-3 md:px-24 animate__animated animate__zoomIn">
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
        <div className="flex items-center justify-center">
          <div className="flex w-72 items-center justify-center gap-6 my-10">
            <Input
              size="md"
              label="Search by product name"
              type="text"
              placeholder="Search by product name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className={`flex items-center justify-center flex-wrap lg:grid ${gridLayout}  gap-y-20 w-full pb-12 gap-6`}
          >
            {filteredQueries.map((query) => (
              <div key={query._id} className="flex flex-wrap justify-center">
                <QueriesCard query={query} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Queries;
