import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredes, setfilteredres] = useState([]);
  const [searchText, setsearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  console.log(listOfRestaurants);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.5061743&lng=80.6480153&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    //Optional Chaining
    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredres(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1>Looks you are offline :P </h1>;

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="filter flex">
        <div className="center">
          <input
            className="border border-black"
            type="text"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
          />
          <button
            className="rounded-full px-2 m-4 bg-orange-300 text-lg font-semibold"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setfilteredres(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="rounded-full bg-orange-300 px-4 m-4 text-lg font-semibold"
          onClick={() => {
            const filteredres = listOfRestaurants.filter(
              (res) => res.info.avgRating > 3.8
            );
            setListOfRestaurants(filteredres);
          }}
        >
          Top Rated restaurants
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredes.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {restaurant.info?.aggregatedDiscountInfoV3?.discountTag ===
              "FLAT DEAL" ? (
                <RestaurantCardPromoted {...restaurant.info} />
              ) : (
                <RestaurantCard {...restaurant.info} />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Body;
