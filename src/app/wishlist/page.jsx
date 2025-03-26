"use client";
import { useState, useEffect } from "react";

const GET_WISHLIST = `
  query GetWishList {
    getWishList {
      products {
        name
        priceHtml
        databaseId
      }
    }
  }
`;

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  useEffect(() => {
    async function getWishlist() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "woocommerce-session": `Session ${
                JSON.parse(localStorage.getItem("woo-session")).token
              }`,
            },
            body: JSON.stringify({
              query: GET_WISHLIST,
            }),
          }
        );
        const data = await response.json();
        const x = data?.data?.getWishList?.products;
        if (x) setWishlistData(x);
      } catch (error) {
        console.log(error);
      }
    }
    getWishlist();
  }, []);

  return (
    <div className="p-10">
      <h1 className="mb-10">Your Wishlist</h1>
      {wishlistData.map((item, index) => {
        return (
          <div key={index} className="mb-5">
            <div>{item.name}</div>
            <div>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
