"use client";
import { useQuery } from "@apollo/client";
import { GetSingleProduct } from "@/graphql/graphql";

const SingleProduct = ({ id }) => {
  const { loading, error, data, fetchMore } = useQuery(GetSingleProduct, {
    variables: {
      id: id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const product = data?.product;
  console.log(product);
  return (
    <div className="container mx-auto p-4">
      <h1>
        <span className="text-red-500">Product Name:</span> {product.name}
      </h1>
      <img className="mt-2" src={product.featuredImage?.node?.mediaItemUrl} />
      <p className="mt-2">
        <span className="text-red-500">Short Description:</span>{" "}
        {product.shortDescription}
      </p>
      <p className="mt-2">
        <span className="text-red-500">Description:</span> {product.description}
      </p>
      <p className="mt-2">
        <span className="text-red-500">Price:</span> {product.price}
      </p>
      {product.salePrice !== null && (
        <p className="mt-2">
          <span className="text-red-500">Sale Price:</span> {product.salePrice}
        </p>
      )}
      <p className="mt-2">
        <span className="text-red-500">Rating:</span> {product.averageRating}
      </p>
      <button
        className="bg-red-500 rounded-[5px] px-3 py-1 mr-3 mt-2"
        onClick={() => console.log("Buy now")}
      >
        Buy Now
      </button>
      <button
        className="bg-red-500 rounded-[5px] px-3 py-1 active:bg-blue-500"
        onClick={(e) => console.log("Add to cart")}
      >
        Add to cart
      </button>
    </div>
  );
};

export default SingleProduct;
