"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ProductListing from "@/components/ProductListing";
import { GetAllProducts } from "@/graphql/graphql";
import { memo } from "react";
import Link from "next/link";

const ShopPage = () => {
  const [sort, setSort] = useState({ field: "DATE", order: "DESC" });
  const [sortText, setSortText] = useState("LATEST");
  const [search, setSearch] = useState("");
  const { loading, error, data, fetchMore } = useQuery(GetAllProducts, {
    variables: {
      uri: "/shop",
      first: 100,
      field: sort.field,
      order: sort.order,
      search: search,
    },
  });

  const handleSortChange = (e) => {
    switch (e.target.value) {
      case "LATEST":
        setSort({ field: "DATE", order: "DESC" });
        setSortText("LATEST");
        break;
      case "PRICE_DESC":
        setSort({ field: "PRICE", order: "DESC" });
        setSortText("PRICE_DESC");
        break;
      case "PRICE_ASC":
        setSort({ field: "PRICE", order: "ASC" });
        setSortText("PRICE_ASC");
        break;
    }
  };

  const handleSearchChange = (query) => {
    setSearch(query);
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
      <div className="flex justify-between">
        <SearchBox handleSearchChange={handleSearchChange} />
        <select
          value={sortText}
          onChange={handleSortChange}
          className="border-1 border-red-500 p-2 w-fit bg-black focus:outline-none"
        >
          <option value={"LATEST"}>Latest</option>
          <option value={"PRICE_DESC"}>Price: High to Low</option>
          <option value={"PRICE_ASC"}>Price: Low to High</option>
        </select>
      </div>
      <ProductListing products={products} />
      <button onClick={loadMoreProducts}>Load more</button>
    </div>
  );
};

const SearchBox = memo(({ handleSearchChange }) => {
  const [search, setSearch] = useState("");
  return (
    <input
      className="border-1 border-white rounded-[5px] p-2"
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearchChange(search);
        }
      }}
    />
  );
});

export default ShopPage;
