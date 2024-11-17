import React, { useEffect, useState } from "react";
import { API_KEY } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  
  useEffect(() => {
    fetchMenu();   
  }, []);

 
  const EDUCORS_URL = 'https://educorssolver.host/api/getData';
  // Target URL from you want to fetch data m ,ex-github api
  const Target = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=" +
        resId;

  const fetchMenu = async () => {
    // const data = await fetch(
    //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=" +
    //     resId;
        
    // );
    const response = await fetch(`${EDUCORS_URL}?ApiKey=6820462bf0a9e484&Target=${encodeURIComponent(Target)}`);

    const json = await response.json();
    // const json = await data.json();
    // console.log(json);
    setResInfo(json.data);
  };
  return resInfo;
 
};

export default useRestaurantMenu;
