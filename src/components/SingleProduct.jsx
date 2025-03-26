"use client";
import { useQuery, useMutation } from "@apollo/client";
import { GetSingleProduct } from "@/graphql/graphql";
import Image from "next/image";
import { AddToCart, AddToWishList } from "@/graphql/graphql";


const SingleProduct = ({ id }) => {
  const { loading, error, data, fetchMore } = useQuery(GetSingleProduct, {
    variables: {
      id: id,
    },
  });

  const [addToCart, { cart_loading, cart_error, cart_data }] =
    useMutation(AddToCart);
  const handleAddToCart = async () => {
    try {
      await addToCart({
        variables: {
          productId: parseInt(id),
          quantity: 1,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "woocommerce-session":`Session ${JSON.parse(localStorage.getItem("woo-session")).token}`
        },
        body: JSON.stringify({
          query: AddToWishList,
          variables: { productId },
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const product = data?.product;
  console.log(product);
  return (
    <div className="container mx-auto p-4">
      <h1>
        <span className="text-red-500">Product Name:</span> {product.name}
      </h1>
      <Image
        width={300}
        height={300}
        className="mt-2 w-auto h-auto"
        src={product.featuredImage?.node?.mediaItemUrl}
      />
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
        onClick={() => handleAddToWishlist(product.databaseId)}
      >
        Add to wishlist
      </button>
      <button
        className="bg-red-500 rounded-[5px] px-3 py-1 active:bg-blue-500"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default SingleProduct;
