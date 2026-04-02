"use client";
import { useRouter } from "next/navigation";

export default function OrderProduct() {
  const router = useRouter();
  const handleClick = () => {
    console.log("Placing your order...");
    router.replace("/");
  };
  return (
    <>
      <h1>Order Product</h1>
      <button
        onClick={handleClick}
        className="bg-red-300 px-2 py-2 text-white hover:bg-red-600 cursor-pointer"
      >
        Place Order
      </button>
    </>
  );
}
