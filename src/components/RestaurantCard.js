import { useState } from "react";
import { FOOD_LOGO } from "../utils/constants";

const RestaurantCard = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { resData } = props;
  const { cloudinaryImageId, name, costForTwo, sla, cuisines, avgRating } =
    resData?.info;
  return (
    <div className={theme === "dark" ? "dark-mode" : " "}>
      <div className="m-4 p-3 w-[325px] h-[600px] bg-orange-100 rounded-lg hover:bg-orange-600 cursor-pointer ">
        <img
          className="rounded-lg h-[350px]"
          src={FOOD_LOGO + cloudinaryImageId}
          alt=""
        />
        <h3 className="font-bold py-5 text-xl">{name}</h3>
        <h4 className="text-lg">{cuisines.join(", ")}</h4>
        <h4 className="text-lg my-2">{avgRating} stars</h4>
        <h4 className="text-lg my-2">{costForTwo}</h4>
        <h4 className="text-lg">{sla.slaString}</h4>
      </div>
    </div>
  );
};

// Higher Order Component

// input - RestaurantCard => isOpen
export const withOpenLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-green-700 text-white m-2 p-2 rounded-lg">
          Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
