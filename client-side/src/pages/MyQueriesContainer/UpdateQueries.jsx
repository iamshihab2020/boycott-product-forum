import { useLoaderData } from "react-router-dom";
import { Input, Typography, Textarea, Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

const UpdateQueries = () => {
  const data = useLoaderData();
  const { _id, name, brand, image, title, details } = data;

  const handleUpdateData = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const productImage = form.productImage.value;
    const queryTitle = form.queryTitle.value;
    const details = form.details.value;
    const updateQueries = {
      name: productName,
      brand: productBrand,
      image: productImage,
      title: queryTitle,
      details: details,
    };

    fetch(`https://boycott-product-forum-server.vercel.app/queries/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateQueries),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Query updated successfully",
            icon: "success",
            confirmButtonColor: "#00224D",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    <div>
      <div className="px-5">
        <section className="animate__animated  animate__zoomIn px-8 lg:px-20 py-10 lg:py-20 container mx-auto my-14 rounded-xl shadow-md text-[#5D0E41] border-[#5D0E41] border-2">
          <Typography
            variant="h5"
            className="text-[#5D0E41] lg:text-3xl text-center"
          >
            Update Query
          </Typography>

          <form onSubmit={handleUpdateData}>
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
                    defaultValue={name}
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
                    defaultValue={brand}
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
                    defaultValue={image}
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
                    defaultValue={title}
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
                      defaultValue={details}
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  Update Query
                </Button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateQueries;
