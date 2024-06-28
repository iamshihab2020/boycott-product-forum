import { Input, Typography, Textarea, Button } from "@material-tailwind/react";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddQueries = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleAddQueries = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const productImage = form.productImage.value;
    const queryTitle = form.queryTitle.value;
    const details = form.details.value;

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formatDate = (date) => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Dhaka",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    const addNewQueries = {
      userId: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      dateTime: formatDate(date),
      recommendationCount: 0,
      dislikeCount: 0,
      name: productName,
      brand: productBrand,
      image: productImage,
      title: queryTitle,
      details: details,
    };
    console.table(addNewQueries);

    try {
      const response = await axios.post(
        "https://boycott-product-forum-server.vercel.app/queries",
        addNewQueries,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Query added successfully",
          icon: "success",
          confirmButtonColor: "#00224D",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/myqueries");
          }
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error adding query:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add query",
        icon: "error",
        confirmButtonColor: "#00224D",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5">
      <section className="animate__animated  animate__zoomIn px-8 lg:px-20 py-10 lg:py-20 container mx-auto my-14 rounded-xl shadow-md text-[#5D0E41] border-[#5D0E41] border-2">
        <Typography
          variant="h5"
          className="text-[#5D0E41] lg:text-3xl text-center"
        >
          Add Queries
        </Typography>

        <form onSubmit={handleAddQueries}>
          <div className="flex flex-col mt-8">
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  className="text-[#5D0E41] mb-2 text-base font-semibold"
                >
                  Product Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Fair & Handsome"
                  name="productName"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-[#FF204E] border-[#00224D]"
                />
              </div>

              <div className="w-full">
                <Typography
                  variant="small"
                  className="text-[#5D0E41] mb-2 text-base font-semibold"
                >
                  Product Brand
                </Typography>
                <Input
                  size="lg"
                  placeholder="Unilever"
                  name="productBrand"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-[#FF204E] border-[#00224D]"
                />
              </div>
            </div>

            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  className="text-[#5D0E41] mb-2 text-base font-semibold"
                >
                  Product Image-URL
                </Typography>
                <Input
                  size="lg"
                  placeholder="https://www.image.jpg"
                  name="productImage"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-[#FF204E] border-[#00224D]"
                />
              </div>

              <div className="w-full">
                <Typography
                  variant="small"
                  className="text-[#5D0E41] mb-2 text-base font-semibold"
                >
                  Query TItle
                </Typography>
                <Input
                  size="lg"
                  placeholder="Is there any Better product that gives me the same quality?"
                  name="queryTitle"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-[#FF204E] border-[#00224D]"
                />
              </div>
            </div>

            <div className="mb-6 flex flex-col items-start gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  className="text-[#5D0E41] mb-2 text-base font-semibold"
                >
                  Boycotting Reason Details
                </Typography>
                <div className="w-full">
                  <Textarea
                    className="w-full h-56 placeholder:opacity-100 focus:border-[#FF204E] border-[#00224D]"
                    placeholder="Israeli Product"
                    name="details"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-col items-start gap-4 md:flex-row">
              <Button
                className="bg-[#FF204E] flex items-center justify-center gap-2 lg:text-base"
                type="submit"
              >
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
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddQueries;
