"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-10">
      <Link className="border-1 border-red-500 w-fit p-2" href="/shop">
        Shop
      </Link>
      <Link className="border-1 border-red-500 w-fit p-2" href="/cart">
        Cart
      </Link>
      <Link className="border-1 border-red-500 w-fit p-2" href="/wishlist">
        Wishlist
      </Link>
      <Link className="border-1 border-red-500 w-fit p-2" href="/login">
        Login
      </Link>
      <Link className="border-1 border-red-500 w-fit p-2" href="/register">
        Signup
      </Link>
    </div>
  );
}
