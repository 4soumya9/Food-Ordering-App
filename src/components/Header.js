import {  useState } from "react";

import appLogo from "../Images/appLogo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

import { useSelector } from "react-redux";

const Header = () => {
  const [btn, setBtn] = useState("Login");

  const onlineStatus = useOnlineStatus();

  //Subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div>
      <div className="flex justify-between bg-pink-100 shadow-lg">
        <div className="logo-container">
          <img src={appLogo} alt="App Logo" className="w-16 mx-10 my-2" />
        </div>
        <div className="nav-items">
          <ul className="flex p-4 m-4">
            <li className="px-4">
              Online Status: {onlineStatus ? "✅" : "🔴"}
            </li>
            <li className="px-4">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-4">
              <Link to="/signIn">Sign In</Link>
            </li>

            <li className="px-4 font-bold text-xl">
              <Link to="/cart">Cart-({cartItems.length} items)</Link>
            </li>

            {/* if we click login/logout button, whole component will rerender , but change will occur inside the button only */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
