import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <>
      <h1>Oops!!! Something Went Wrong</h1>
      <h2>
        {err.status} :{err.statusText}
      </h2>
    </>
  );
};

export default Error;
