import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductListing = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="mt-5 w-fit border-1 p-2 border-red-500"
          >
            <Link href={`/product/${product.id}`}>
              <h3>{product.name}</h3>
              <Image
                width={300}
                height={300}
                priority={true}
                className="w-auto h-auto my-2"
                src={product.image.sourceUrl}
                alt={product.image.altText}
              />
              <p style={{ color: "white" }}>Price: {product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
