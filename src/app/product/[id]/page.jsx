import SingleProduct from "@/components/SingleProduct";

const Product = async ({ params }) => {
  const { id } = await params;
  return <SingleProduct id={id} />;
};

export default Product;
