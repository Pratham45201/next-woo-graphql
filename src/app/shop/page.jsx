"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ProductListing from "@/components/ProductListing";
import { GetAllProducts } from "@/graphql/graphql";
const ShopPage = () => {
  const [sort, setSort] = useState(null);
  const { loading, error, data, fetchMore } = useQuery(GetAllProducts, {
    variables: {
      uri: "/shop",
      first: 100,
      field: "NAME",
      order: "ASC",
    },
  });

  const handleSortChange = (e) => {
    setSort({ orderby: e.target.value });
  };

  const loadMoreProducts = () => {
    if (data?.products?.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.products.pageInfo.endCursor,
        },
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const products = data?.products?.nodes || [];
  return (
    <div className="p-4">
      <select onChange={handleSortChange}>
        <option value="DATE">Latest</option>
        <option value="PRICE_ASC">Price: High to Low</option>
        <option value="PRICE_DESC">Price: Low to High</option>
      </select>
      <ProductListing products={products} />
      <button onClick={loadMoreProducts}>Load more</button>
    </div>
  );
};

export default ShopPage;
