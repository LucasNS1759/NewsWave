/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Card = (props) => {
  return (
  
      <div
        key={props.id}
        className="card text-sm shadow-lg max-w-sm m-5 mx-auto sm:mx-auto md:m-5 overflow-hidden flex flex-col rounded">
        <img
          className="w-full h-full" 
          src={props?.bandera}
          alt=""
        />
        <div className="text p-5 pt-2 text-center">
          <h1 className="title font-semibold my-2 text-xl text-red-700"> {props?.nombreOficial}</h1>
          <h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">Ubication 
         {" " + props.continente}
          </h3>
          {/* <p className="paragraph-normal text-gray-600">
            Happy Womens Day 2022: Read on to know all about the history and
            significance...
          </p> */}
          <Link to={`/Detalle/${props.id}`}>
          <span className="mt-3 block" >
            Read More
          </span>
          </Link>
        </div>
      </div>
    
  );
};

export default Card;
