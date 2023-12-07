// import { LOGO_URL } from "../utils/constants";

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnname, setbtnname] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  //Subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between  bg-orange-300 shadow-lg m-15">
      <a href="/">
        <img
          className="flex m-5 w-30 h-12"
          alt="Food Villa"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovlFmYh0OMJsDBaVuTmTRRjFNMFvaVFW4NSziSzRuRAupPoTlxnfMSaRK-pkeRea4svI&usqp=CAU"
        ></img>
      </a>

      <div className="flex items-center">
        <ul className="flex p-2">
          <li className="px-5 text-lg font-semibold">
            OnlineStatus:{onlineStatus === true ? "😎" : "😟"}
          </li>
          <li className="px-5 text-lg font-semibold ">
            <Link to="/">Home</Link>
          </li>
          <li className="px-5 text-lg font-semibold">
            <Link to="/about">About</Link>
          </li>
          <li className="px-5 text-lg font-semibold">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-5 text-lg font-semibold">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-5 text-lg font-semibold">
            <Link to="/cart">Cart ({cartItems.length} items)🛒</Link>
          </li>
          <button
            className="px-5 text-lg font-semibold"
            onClick={() =>
              btnname === "Login" ? setbtnname("Logout") : setbtnname("Login")
            }
          >
            {btnname}
          </button>
          <li className="px-4 font-bold">{loggedInUser} 👀</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
