
import { Typography } from "@material-tailwind/react";
import RecentQueries from "./RecentQueries";

const HomeQueries = () => {
  return (
    <div className="py-20">
      <Typography variant="h1" className="font-black text-[#FF204E] text-center mb-14" >
        Recent Queries
      </Typography>
      
      <RecentQueries/>

    </div>
  );
};

export default HomeQueries;