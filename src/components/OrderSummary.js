import { useSelector } from "react-redux";
import { selectItemsInCart, selectTotalPrice } from "../utils/cartSlice";
import { useState } from "react";

const OrderSummary = () => {
  const cartItems = useSelector(selectItemsInCart);
  const totalPrice = useSelector(selectTotalPrice);

  //   const deliveryCharges = (totalPrice * 0.05) / 100;
  //   const totalAmt = totalPrice / 100 + deliveryCharges - discount;

    // Local state to manage the demo message visibility
    const [showDemoMessage, setShowDemoMessage] = useState(false);

    // Function to handle the button click
    const handlePlaceOrder = () => {
      setShowDemoMessage(true); // Show the demo message
    };

  return (
    <div className="basis-5/12 h-fit sticky top-40 p-8 rounded-md border shadow-md my-8 md:m-0">
      <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>

      {/* order details */}
      <div className="py-4 text-lg space-y-4 border-b">
        <div className="flex justify-between items-center font-semibold">
          <p className="font-normal">Price ({cartItems.length} items)</p>
          <p>₹ {totalPrice}</p>
        </div>
      </div>

      <div className="py-4 border-b">
        <div className="md:flex justify-between items-center font-bold text-lg md:text-2xl">
          <h1>Total Amount</h1>
          <h1 className="text-orange-500">₹ {totalPrice}</h1>
        </div>
      </div>

      <button onClick={handlePlaceOrder} className="w-full block mt-4 uppercase font-bold text-lg bg-orange-600 text-white text-center p-4 rounded-md">
        Place order
      </button>
        {/* Demo message */}
        {showDemoMessage && (
        <div className="mt-4 text-red-600 font-semibold">
          This is a demo app. Your order will not be processed.
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
