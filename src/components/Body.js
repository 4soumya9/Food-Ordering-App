import { useEffect, useState } from "react";
import React from "react";
import RestaurantCard, { withOpenLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { API_KEY } from "../utils/constants";

const Body = () => {
  // const [listOfRestaurants, setListOfRestaurant] = useState([
  //   {
  //     type: "restaurant",
  //     data: {
  //       id: "334475",
  //       name: "KFC",
  //       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
  //       cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
  //       costForTwo: 40000,
  //       deliveryTime: 36,
  //       avgRating: "3.8",
  //     },
  //   },
  //   {
  //     type: "restaurant",
  //     data: {
  //       id: "334476",
  //       name: "Dominos",
  //       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
  //       cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
  //       costForTwo: 40000,
  //       deliveryTime: 36,
  //       avgRating: "4.8",
  //     },
  //   },
  //   {
  //     type: "restaurant",
  //     data: {
  //       id: "334477",
  //       name: "McDonals",
  //       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
  //       cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
  //       costForTwo: 40000,
  //       deliveryTime: 36,
  //       avgRating: "4.2",
  //     },
  //   },
  // ]);
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredResList, setFilteredResList] = useState("");

  const [theme] = React.useState(localStorage.getItem("theme") || "light");

  const RestaurantOpenCard = withOpenLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const EDUCORS_URL = 'https://educorssolver.host/api/getData';
  // Target URL from you want to fetch data m ,ex-github api
  const Target = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
  // async function getData(){
  //   const response = await fetch(`${EDUCORS_URL}?ApiKey=${ApiKey}&Target=${encodeURIComponent(Target)}`);
  //   const data = await response.json();
  //   console.log('Data fetched successfully:', data);
  //         }
  //   getData()

  const fetchData = async () => {
    // const data = await fetch(
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
    const response = await fetch(`${EDUCORS_URL}?ApiKey=${API_KEY}&Target=${encodeURIComponent(Target)}`);

    const json = await response.json();
    console.log(json);

    // setListOfRestaurant(
    //   json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    // );
    setListOfRestaurant(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    // console.log(
    //   json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    // );
    setFilteredResList(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  //Conditional Rendering
  // if(listOfRestaurants.length === 0){
  //   // return <h1>Loading..</h1>
  //   return <Shimmer/>

  // }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1>Looks like you r offline;</h1>;

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className={theme === "dark" ? "dark-mode" : " "}>
      <div className="body">
        <div className="filter flex">
          <div className="search m-4 p-4">
            <input
              type="text"
              className="border border-solid border-black rounded-lg"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 bg-green-100 m-4 rounded-lg"
              onClick={() => {
                //filter the search
                //update ui
                const filteresRes = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                // setListOfRestaurant(filteresRes);
                setFilteredResList(filteresRes);
              }}
            >
              Search
            </button>
          </div>
          {/* <div className="search m-4 p-4 flex items-center">
            <button
              className="px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => {
                const filteredList = listOfRestaurants.filter(
                  (res) => res.info.avgRating > 4.5
                );
                console.log(listOfRestaurants);
                // console.log("clicked");

                // console(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
                setListOfRestaurant(filteredList);
              }}
            >
              Top Rated Restaurants
            </button>
          </div> */}
        </div>
        <div className="flex flex-wrap">
          {/* //restaurant */}
          {/* {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))} */}
          {filteredResList?.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {/* If the restaurant is open then add a promoted label to it  */}
              {restaurant.info.isOpen ? (
                <RestaurantOpenCard resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
