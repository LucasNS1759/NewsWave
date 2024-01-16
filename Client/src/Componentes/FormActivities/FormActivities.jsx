import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormActivities = () => {
  const navigate = useNavigate();
  const [actividadExistente, setActividadExistente] = useState("");
  const [actividades, setActividades] = useState("");

  const [actividad, setActividad] = useState({
    Nombre: "",
    Dificultad: "",
    Duracion: null,
    Temporada: "",
    paisesdIds: [],
  });

  const [paises, setPaises] = useState();

  const getActividades = async () => {
    try {
      const response = await axios.get("http://localhost:3001/activities");
      if (response.status === 200) {
        setActividades(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaises = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/countries/onlyCountries"
      );
      console.log(response);

      setPaises(response?.data);
    } catch (error) {
      if (error) {
        navigate("/HomeNoticia");
      }
      console.log(error);
      window.alert(error.response.data.error);
    }
  };

  useEffect(() => {
    if (paises) return;
    getPaises();
    return;
  }, [paises]);

  useEffect(() => {
    if (actividadExistente) return;
    getActividades();
  }, [actividadExistente]);

  const handlerActivities = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const handlerPaises = (e) => {
  console.log(JSON.parse(e.target.value))
    setActividad({
      ...actividad,
      paisesdIds: [...actividad.paisesdIds].concat(JSON.parse(e.target.value)),
    });
  };

  const handlerActividad = (e) => {
    setActividadExistente(
      actividades.find((actividad) => actividad.Nombre === e.target.value)
    );
  };
  
  const handlerDeletePais = (e,id) =>{
   e.preventDefault();
   setActividad({
   ...actividad,
   paisesdIds : actividad.paisesdIds.filter((pais)=>pais.id !== id)
   })
  }

  const postActivities = async (e) => {
    e.preventDefault();
    console.log(actividad?.paisesdIds?.map((pais) => pais?.idPaises))
    console.log(actividad?.paisesdIds[0].idPaises)
    
    try {
      const response = await axios.post("http://localhost:3001/activities", {
        Nombre: actividad.Nombre,
        Dificultad: actividad.Dificultad,
        Duracion: actividad.Duracion,
        Temporada: actividad.Temporada,
        paisesdIds: actividad?.paisesdIds?.map((pais) => pais?.idPaises),
        userId: JSON.parse(window.localStorage.getItem("userId"))
      });
      console.log(response);
      if (response.status === 200) {
        setActividad("");
      }
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="flex w-1/2 justify-center  items-center bg-white">
        <form className="bg-white max-w-[350px]">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Crea actividades turisticas!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            y asocielas a los paises que sean ideales para las actividades...
          </p>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <select
              name=" ActividadExistente"
              onChange={(e) => handlerActividad(e)}
              className="select select-ghost w-full max-w-xs"
            >
              <option disabled selected>
                Selecciona una actividad existente...
                {actividad?.Nombre && actividad?.Nombre}
              </option>
              {actividades &&
                actividades?.map((actividad, index) => {
                  return (
                    <option key={index} value={actividad.Nombre}>
                      {actividad.Nombre}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="Nombre"
              id=""
              value={
                actividadExistente
                  ? actividadExistente.Nombre
                  : actividad.Nombre
              }
              onChange={handlerActivities}
              placeholder="Nombre De La Actividad..."
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="Dificultad"
              onChange={handlerActivities}
              value={
                actividadExistente
                  ? actividadExistente.Dificultad
                  : actividad.Dificultad
              }
              id=""
              placeholder="Dificultad de la Actividad"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              className="pl-2 outline-none border-none"
              type="time"
              name="Duracion"
              value={
                actividadExistente
                  ? actividadExistente.Duracion
                  : actividad.Duracion
              }
              onChange={handlerActivities}
              id=""
              placeholder="Dificultad de la Actividad"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <select
              name="Temporada"
              onChange={handlerActivities}
              className="select select-ghost w-full max-w-xs"
            >
              <option disabled selected>
                {actividadExistente
                  ? actividadExistente.Temporada
                  : "Temporada Ideal de la Actividad"}
              </option>
              {!actividadExistente.Temporada ? (
                <>
                  {" "}
                  <option value={"Verano"}>Verano</option>
                  <option value={"Otoño"}>Otoño</option>
                  <option value={"Invierno"}>Invierno</option>
                  <option value={"Primavera"}>Primavera</option>
                </>
              ) : (
                ""
              )}
            </select>
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <select
              name=" paisesdIds"
              onChange={(e) => handlerPaises(e)}
              className="select select-ghost w-full max-w-xs"
            >
              <option disabled selected>
                Pais ideal para... {actividad?.Nombre && actividad?.Nombre}
              </option>
              {paises &&
                paises?.map((pais) => {
                  return (
                    <option
                      key={pais?.id}
                      value={JSON.stringify({
                        idPaises: pais?.id,
                        paises: pais?.pais,
                      })}
                    >
                      {pais.pais}
                    </option>
                  );
                })}
            </select>
          </div>
          {actividad.paisesdIds && (
            <div className="flex flex-wrap max-w-[200px">
              {actividad.paisesdIds.map((pais, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-2 mb-2 mr-2 ]"
                >
                  <span className="text-gray-800">{pais.paises}</span>
                  <button
                     onClick={(e)=>handlerDeletePais(e,pais.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={postActivities}
          >
            crear actividad
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormActivities;
