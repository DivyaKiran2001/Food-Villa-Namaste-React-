import React, { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ResCategory from "./ResCategory";

const RestaurantMenu = () => {
  //const [resInfo, setresInfo] = useState(null);
  const { resId } = useParams();

  const [showIndex, setshowIndex] = useState(0);
  //console.log(resId);

  //   useEffect(() => {
  //     fetchMenu();
  //   }, []);

  //   const fetchMenu = async () => {
  //     const data = await fetch(
  //       "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=16.5061743&lng=80.6480153&restaurantId=" +
  //         resId +
  //         "&catalog_qa=undefined&submitAction=ENTER"
  //     );
  //     const json = await data.json();
  //     console.log(json);
  //     setresInfo(json.data);
  //   };

  // resInfo holds the return value of useRestaurantMenu() hook
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log(categories);

  //console.log(itemCards);
  //console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR);
  return (
    <div className="text-center">
      <h1 className="font-bold my-5 text-2xl">{name}</h1>
      <p className="font-sans">
        {cuisines.join(",")} -{costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category, index) => (
        //Controlled Component
        <ResCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setshowIndex={() => setshowIndex(index)}
        />
      ))}
      {/* <h2>Menu</h2> */}
      {/* <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} -{" Rs"}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;
