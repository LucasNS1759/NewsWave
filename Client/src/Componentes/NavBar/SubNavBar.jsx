import { Link } from "react-router-dom";
import { obtenerDiaYFechaActual } from "../../helpers/obtenerFechaActual";
import Clima from "../Clima/Clima";

const SubNavBar = () => {
 

  return (
    <div className="flex px-4 py-1 font-bold text-gray-500 justify-between align-middle mt-32 border-solid bg-slate-100">
      {obtenerDiaYFechaActual()}
      <Link to={"/FullNews?dolar=dolar&categoria=finance"}>
        <span>Dolar Hoy</span>
      </Link>
      <Clima />
    </div>
  );
};

export default SubNavBar;
