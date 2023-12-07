import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({
  name,
  cuisines,
  sla,
  avgRating,
  cloudinaryImageId,
}) => {
  return (
    <div className="m-4 p-4 w-[250px] hover:scale-105 transition duration-300 ease-in-out">
      <img className="rounded-lg" src={CDN_URL + cloudinaryImageId}></img>
      <h2 className="font-bold py-2">{name}</h2>
      <h4>
        ⭐ {avgRating} ⏰ {sla.slaString}
      </h4>

      <h3 className="font-sans py-1">{cuisines.join(", ")}</h3>
    </div>
  );
};

//Higher Order Component

//input - Restaurant Card => Restaurant card promoted/offer

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="rounded-lg absolute bg-gray-600 text-white m-12 mt-8 px-1 py-2 ">
          {props.aggregatedDiscountInfoV3.header}
          {props.aggregatedDiscountInfoV3.subHeader}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
