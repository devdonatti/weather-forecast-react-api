import React from "react";
import { useState } from "react";

const Form = ({ newLocation }) => {
  const [city, setCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ city });
    if (city === "" || !city) return;
    newLocation(city);
  };

  return (
    <form className="m-6 rounded w-[60%] mx-auto" onSubmit={onSubmit}>
      <div className="flex items-center ">
        <input
          className="flex-1 rounded p-2 border border-gray-300"
          type="text"
          placeholder="Ciudad"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bg-gray-800 p-2 rounded text-white" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default Form;
