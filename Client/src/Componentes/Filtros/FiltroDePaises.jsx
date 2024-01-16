import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetearEstado,
  filtrarPorContinente,
  filtrarPorActividad,
  filtrarPorNombre,
  actualizarPagina,
} from "../../redux/querysSlice";

const FiltroDePaises = () => {
  const [activities, setActivities] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    nombreComun: " ",
  });
  const state = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  //  FUNCIONES DE SEARCH
  const handlerOnchangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const getSearchInput = () => {
    window.localStorage.setItem(
      "search",
      JSON.stringify(input.nombreComun.trim())
    );
    dispatch(filtrarPorNombre(input.nombreComun.trim()));
    dispatch(actualizarPagina(0));
    dispatch(filtrarPorContinente(""));
    dispatch(filtrarPorActividad(""));
    setInput({ nombreComun: "" });
  };
  // //////////////////////////////

  // FUNCIONES DE "PAIS" Y FILTROS
  //RESETEAR STORAGE PARA VOLVER AL ESTADO ORIGINAL
  const reestablecer = () => {
    dispatch(resetearEstado());
    window.localStorage.removeItem("pagina");
    window.localStorage.removeItem("search");
    window.localStorage.removeItem("region");
    window.localStorage.removeItem("actividad");
  };

  //FUNCIONES PARA GUARDAR LAS QUERYS ESPECIFICAS EN STORAGE PARA PODER HACER DATOS PERSISTENTES
  const handlerRegion = (e) => {
    window.localStorage.setItem(
      "region",
      JSON.stringify(e.target.value.trim())
    );
    dispatch(filtrarPorContinente(e.target.value));
    dispatch(actualizarPagina(0));
    dispatch(filtrarPorActividad(""));
    dispatch(filtrarPorNombre(""));
  };

  const handlerActivity = (e) => {
    window.localStorage.setItem(
      "actividad",
      JSON.stringify(e.target.value.trim())
    );
    dispatch(filtrarPorActividad(e.target.value));
    dispatch(actualizarPagina(0));
    dispatch(filtrarPorContinente(""));
    
    dispatch(filtrarPorNombre(""));
  };

  ////////////////////////////////////////

  //USEEFCT PARA HACER PETICION A LA API DE ACTIVIDADES PARA PODER HACER LOS FILTROS SI EXISTEN ACTIVIDADES CREADAS
  useEffect(() => {
    if (!activities) {
      try {
        fetch(`http://localhost:3001/activities`)
          .then((response) => response.json())
          .then((data) => {
            setActivities(data);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
    return;
  }, [activities]);

  //////////////////////////////////////////////////
  return (
    <div className="h-96 col-span-1 mt-20">
      <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
        <input
          type="text"
          name="nombreComun"
          value={input.nombreComun}
          onChange={handlerOnchangeInput}
          placeholder="seach"
          className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
        />
        <button onClick={() => getSearchInput()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="bg-white  rounded-md">
        <h1 className="text-center text-xl my-2  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-gray-600">
          Filtre y Busque
        </h1>
        <input
          onClick={reestablecer}
          type="reset"
          value="Reset"
          className="btn"
        />
        <div className="bg-white rounded-md list-none  text-center ">
          <select
            onChange={(e) => handlerRegion(e)}
            className="select select-bordered select-lg w-full max-w-xs"
          >
            <option disabled selected>
              Continente
            </option>
            <option value={"North America"}>North America</option>
            <option value={"Asia"}>Asia</option>
            <option value={"Oceania"}>Oceania</option>
            <option value={"Africa"}>Africa</option>
            <option value={"South America"}>South America</option>
          </select>
          <select
            onChange={(e) => handlerActivity(e)}
            className="select select-bordered select-lg w-full max-w-xs"
          >
            <option disabled selected>
              Actividades
            </option>
            {activities &&
              activities.map((activity, index) => {
                return (
                  <option key={index} value={activity.Nombre}>
                    {activity.Nombre}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltroDePaises;
