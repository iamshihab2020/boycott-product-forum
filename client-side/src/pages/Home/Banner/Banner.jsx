import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const Banner = () => {
  return (
    <Carousel className="rounded-b-xl min-h-screen md:max-h-screen animate__animated animate__slideInUp  ">
      <div className="relative min-h-screen md:max-h-screen w-full">
        <img
          src="https://s.france24.com/media/display/533342f4-08f4-11e9-8679-005056a964fe/w:980/p:16x9/boycott-israel-protest-main.jpg"
          alt="image 1"
          className="min-h-screen md:max-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl  font-black md:text-4xl lg:text-7xl "
            >
              Boycott <span className="text-[#FF204E]">Israel</span>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              This forum will list all the products and companies that support
              Israel and we can boycott by knowing those products.
            </Typography>
            <div className="flex justify-center gap-2">
              <Link to="/queries">
                <Button size="lg" className="bg-[#FF204E]">
                  Our Queries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-h-screen w-full ">
        <img
          src="https://wallpapers.com/images/featured/palestine-75yqzvkpketv5cob.jpg"
          alt="image 1"
          className="min-h-screen md:max-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl font-black lg:text-7xl"
            >
              Free <span className="text-[#FF204E]">Palestine</span>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              The people of Palestine are suffering, they are starving, they are
              are not getting treatment. Free their land and boycott Israeli
              products.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" className="bg-[#FF204E]">
                Our Queries
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-screen md:max-h-screen w-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxe30NECsZFwbTdbo8GGfwn5VB6wutoKmqTQ&usqp=CAU"
          alt="image 1"
          className="min-h-screen md:max-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl font-black lg:text-7xl"
            >
              Never Stop <span className="text-[#FF204E]">Boycotting</span>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Check all products you should boycott and their alternatives using
              this forum.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" className="bg-[#FF204E]">
                Our Queries
              </Button>
            </div>
          </div>
        </div>
      </div>

    </Carousel>
  );
}

export default Banner;



/**
    Israel is terrorist state. They forcefully captured The State of
    Palestine. They are killings womans, children brutally. So, it is
    high time to boycott them and their products also those companies
    who support them.
 */

