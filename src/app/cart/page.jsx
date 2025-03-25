"use client";
import { useQuery } from "@apollo/client";
import { GetCart } from "@/graphql/graphql";

const Cart = () => {
  const { loading, error, data, fetchMore } = useQuery(GetCart);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const response = data.cart;
  return (
    <div className="p-10">
      <h1 className="mb-10">Your Cart</h1>
      {response?.contents?.nodes.map((item, index) => {
        const product = item.product.node;
        console.log(item);
        return (
          <div key={index} className="mb-5">
            <div>
              <span className="text-red-500">Name:</span> {product.name}
            </div>
            <div>
              <span className="text-red-500">Regular price:</span>{" "}
              {product.regularPrice}
            </div>
            <div>
              <span className="text-red-500">Sale price:</span>{" "}
              {product.salePrice}
            </div>
            <div>
              <span className="text-red-500">Quantity:</span> {item.quantity}
            </div>
          </div>
        );
      })}
      <div>
        <span className="text-red-500">Cart Total:</span> {response.total}
      </div>
    </div>
  );
};

export default Cart;
