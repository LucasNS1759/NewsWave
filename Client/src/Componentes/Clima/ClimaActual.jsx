import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from "axios";
import { obtenerDiaYFechaActual } from "../../helpers/obtenerFechaActual";
import { useSelector } from "react-redux";

const ClimaActual = () => {
  const { t } = useTranslation("global");

  const state = useSelector((state) => state.climaSlice);
  const [climaDeHoy, setClimaDeHoy] = useState("");

  const getClimaActual = async () => {
    try {
      const response = await axios(
        `/clima?latitude=${state && state?.coordenadas?.latitud}&longitude=${
          state && state?.coordenadas?.longitud
        }`
      );
      if (response.status === 200) {
        setClimaDeHoy(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClimaActual();
  }, [state.coordenadas]);

  return (
    <>
      <div className="card max-w-sm max-h-sm py-7 mx-2   border  xl:w-full text-black rounded-md xl:mr-2 bg-slate-200">
        <h2 className=" mb-2 px-4 pt-4">
          <div className="flex justify-between">
            <div className=" relative top-0">
              <span className="mt-2 py-1  xl:text-xl font-semibold  bottom-1 ">
                {state && state?.datosZona?.ciudad}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="xl:text-lg font-semibold ">
                {obtenerDiaYFechaActual()}
              </span>
            </div>
          </div>
        </h2>

        <h1 className="xl:text-2xl text-lg  font-semibold mb-1 px-4 pt-2">
          {climaDeHoy && climaDeHoy.weather[0].description}
        </h1>
        <div className="flex items-center p-4">
          <div className="flex justify-center items-center w-96">
            <img
              className="fill-current h-28 w-28 text-yellow-300"
              src={
                climaDeHoy &&
                `https://openweathermap.org/img/w/${climaDeHoy.weather[0].icon}.png`
              }
            ></img>
          </div>
        </div>
        <div className="text-md pt-1 pb-1 px-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <span className="flex space-x-2 items-center">
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 32 32"
                  className="fill-current"
                >
                  <path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path>
                  <path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path>
                </svg>{" "}
                <span className="text-lg font-medium">
                  {climaDeHoy && climaDeHoy.wind.speed}km/h
                </span>
              </span>
              <span className="flex space-x-2 items-center">
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 32 32"
                  className="fill-current"
                >
                  <path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path>
                  <path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path>
                </svg>{" "}
                <span className="text-lg font-medium">
                  {climaDeHoy && climaDeHoy.main.humidity}%
                </span>
              </span>
            </div>
            <div>
              <h1 className="xl:text-6xl text-4xl">
                {" "}
                {climaDeHoy && climaDeHoy.main.temp}°{" "}
              </h1>
            </div>
          </div>
          <h2 className="mt-8 text-base font-medium">
            {t("Componente-clima-actual.h2-updated-at")} {new Date().getHours()}:
            {new Date().getMinutes()}{" "}
          </h2>
        </div>
      </div>
    </>
  );
};

export default ClimaActual;
