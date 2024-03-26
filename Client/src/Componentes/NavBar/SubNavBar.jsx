import { Link } from "react-router-dom";
import { obtenerDiaYFechaActual } from "../../helpers/obtenerFechaActual";
import Clima from "../Clima/Clima";

const SubNavBar = () => {
 

  return (
    <div className="xl:flex lg:flex md:flex px-4 py-1 font-bold text-gray-500 justify-between align-middle text-center mt-32 border-solid bg-slate-100 sm:flex ">
    
      {obtenerDiaYFechaActual()}
      <Link to={"/FullNews?dolar=dolar&categoria=finance"}>
        <p>Dollar Today</p>
      </Link>
      <Clima />
    </div>
  );
};

export default SubNavBar;
