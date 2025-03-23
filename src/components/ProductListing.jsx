import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductListing = ({ products }) => {
  console.log(products);
  return (
    <div>
      <h2>Shop</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mt-5">
            <Link href={`/product/${product.id}`}>
              <h3>{product.name}</h3>
              <Image
                width={300}
                height={300}
                className="my-2"
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