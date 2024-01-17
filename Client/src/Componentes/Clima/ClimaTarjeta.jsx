import { useEffect, useState } from "react";
import axios from "axios";
import ClimaExtendido from "./ClimaExtendidoPorHora";
import ClimaFiltro from "./ClimaFiltro";
import Loading from "../Loading/Loading";
import ClimaExtendidoPorDia from "./ClimaExtendidoPorDia";
import ClimaActual from "./ClimaActual";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ClimaTarjeta = () => {
  const state = useSelector((state) => state.climaSlice);
  const [climaActual, setClimaActual] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [pronosticoCorto, setpronosticoCorto] = useState([]);
  const [carga, setCarga] = useState(true);

  const getClima = async () => {
    try {
      const response = await axios.get(
        `/clima/extendido?latitude=${
          state && state.coordenadas.latitud
        }&longitude=${state && state.coordenadas.longitud}`
      );

      setpronosticoCorto("");
      setWeatherData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    } finally {
      setCarga(false);
    }
  };

  useEffect(() => {
    getClima();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }, [state.coordenadas]);

  useEffect(() => {
    if (pronosticoCorto.length) return;
    if (weatherData && !carga) {
      weatherData.map((w) =>
        setpronosticoCorto((prevState) => [
          ...prevState,
          w[Math.floor(w.length / 2)],
        ])
      );
    }
  }, [pronosticoCorto.length, weatherData]);

  const setClimaActualHandler = (index) => {
    setClimaActual(pronosticoCorto[index]);
  };

  const openModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("scale-100");
  };

  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("scale-100");
  };

  const useClimaQuery = useQuery({
    queryKey: ["getClima"],
    queryFn: getClima,
  });

  return (
    <>
      {!useClimaQuery.isLoading && useClimaQuery.data ? (
        <div className="w-full mt-16 lg:mt-64 justify-center container mx-auto">
          <ClimaFiltro
            setClimaActual={setClimaActual}
            setpronosticoCorto={setpronosticoCorto}
          />

          <div className="flex  w-full ">
            <div className="flex justify-center">
              <ClimaActual />
            </div>
            <div className=" flex rounded-lg bg-auto">
              <div className="rounded-lg py-6 pl-12 xl:pl-28 xl:pr-28 pr-12 w-full bg-blue-400 opacity-90 text-white">
                <div className="mb-20">
                  <h2 className="font-bold text-3xl leading-none pb-1">
                    {climaActual && !carga
                      ? climaActual?.dia
                      : pronosticoCorto[0]?.dia}
                  </h2>
                  <h3 className="leading-none pb-2 pl-1">
                    {climaActual && !carga
                      ? climaActual?.diaEspecifico
                      : pronosticoCorto[0]?.diaEspecifico}
                  </h3>
                  <p className="flex align-center opacity-75">
                    <img
                      src="https://w7.pngwing.com/pngs/363/769/png-transparent-location-icon-landmark-map-location-information.png"
                      className="inline mr-1 w-4"
                    ></img>
                    {state && state.datosZona.ciudad}
                  </p>
                </div>
                <div>
                  <img
                    src={
                      climaActual && !carga
                        ? climaActual?.icono
                        : pronosticoCorto[0]?.icono
                    }
                    className="w-20 mb-2"
                  >
                    {/* ... SVG Path ... */}
                  </img>
                  <strong className="leading-none text-6xl block font-weight-bolder">
                    {climaActual && !carga
                      ? climaActual?.tempMax
                      : pronosticoCorto[0]?.tempMax}
                  </strong>
                  <b className="text-2xl block font-bold">
                    {climaActual && !carga
                      ? climaActual?.estado
                      : pronosticoCorto[0]?.estado}
                  </b>
                </div>
              </div>
            </div>

            <ClimaExtendidoPorDia
              climaActual={climaActual}
              pronosticoCorto={pronosticoCorto}
              carga={carga}
              setClimaActualHandler={setClimaActualHandler}
              openModal={openModal}
            />

            {/* *************************************************** */}

            {/* MODAL CLIMA POR HORA  */}
            <div
              id="modal"
              className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-0 transition-transform duration-300"
            >
              {/* Modal content */}
              <div className="bg-white w-1/2 h-1/2 p-12">
                {/* Close modal button */}
                <button
                  id="closebutton"
                  type="button"
                  className="focus:outline-none"
                  onClick={closeModal}
                >
                  {/* Hero icon - close button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {/* Test content */}

                <ClimaExtendido
                  pronostico={
                    weatherData &&
                    climaActual &&
                    pronosticoCorto &&
                    weatherData?.find(
                      (weather) => weather[0]?.dia === climaActual?.dia
                    )
                  }
                  zona={state && state.datosZona.ciudad}
                />
              </div>
            </div>

            {/* *************************************** */}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ClimaTarjeta;
