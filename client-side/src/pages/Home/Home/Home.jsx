import Banner from "../Banner/Banner";
import HomeQueries from "../HomeQueries/HomeQueries";

const Home = () => {
  return (
    <>
      <div className="max-h-screen">
        <Banner/>
      </div>
      <div className="px-5 md:px-10 lg:px-20">
        <HomeQueries/>
        
      </div>
    </>
  );
};

export default Home;