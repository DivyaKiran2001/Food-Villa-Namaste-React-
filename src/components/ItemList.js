import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const ItemList = ({ items }) => {
  //console.log(items);
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    //Dispatch an action
    dispatch(addItem(item));
  };
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2  border-gray-200 border-b-2  text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                {" "}
                - ₹{" "}
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultprice}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute rounded-lg">
              <button
                className="rounded-lg p-2 mx-16 my-10 bg-white"
                onClick={() => handleAddItem(item)}
              >
                ADD
              </button>
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="rounded-lg w-full"
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
