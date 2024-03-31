import { useTranslation } from "react-i18next";
import ClimaActual from "./ClimaActual";
import { getClima } from "../../helpers/climaFunctions/getApiClima";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../Loading/Loading";
import ClimaExtendido from "./ClimaExtendidoPorHora";
import { actualizarCoordenadas } from "../../redux/clima";

const obtenerMedioDiaHora = (index, useClimaQuery) => {
  return Math.floor(useClimaQuery.data[index].length / 2);
};

const SeccionClimaExtendido = () => {
  const { t } = useTranslation("global");
  const state = useSelector((state) => state.climaSlice);
  const latitud = state?.coordenadas.latitud;
  const longitud = state?.coordenadas.longitud;
  const [indexClimaData, setIndexClimaData] = useState(0);

  //cada vez que el estado de redux coordenadas(lat y lon) muten se dispara una nueva peticion con la lat y lon enuentra la zona donde buscar y la peticion es para buscar pronostico estendido de 5 dias para la zona a buscar devuelve un arr de obj donde cada elemento es un dia con estadisticas cada 3 hs del clima
  const useClimaQuery = useQuery({
    queryKey: ["getClima", state.coordenadas, actualizarCoordenadas],
    queryFn: () => getClima(latitud, longitud),
  });

  if (useClimaQuery.isLoading) {
    return <Loading />;
  }

  const openModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("scale-100");
  };
  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("scale-100");
  };

  return (
    <>
      {!useClimaQuery.isLoading && (
        <div className="xl:flex  md:flex  justify-center mx-auto relative">
          <ClimaActual />
          <div className=" flex w-full my-2 h-full rounded-lg bg-auto">
            <div className="rounded-lg w-full py-6 pl-8 pr-32 max-w-md  bg-blue-400 opacity-90 text-white">
              <div className="mb-20">
                <h2 className="font-bold text-3xl leading-none pb-1">
                  {useClimaQuery.data &&
                    !useClimaQuery.isLoading &&
                    useClimaQuery.data[indexClimaData][0].dia}
                </h2>
                <h3 className="leading-none pb-2 pl-1">
                  {" "}
                  {useClimaQuery.data &&
                    !useClimaQuery.isLoading &&
                    useClimaQuery.data[indexClimaData][0].diaEspecifico}
                </h3>
                <p className="flex aling-center opacity-75">
                  <svg
                    className="w-4 inline mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 425.963 425.963"
                    style={{ enableBackground: "new 0 0 425.963 425.963" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
                          fill="#FFFFFF"
                        />
                      </g>
                    </g>
                  </svg>
                  {!useClimaQuery.isLoading &&
                    state.datosZona &&
                    state.datosZona.ciudad}
                </p>
              </div>
              <div>
                <img
                  src={
                    useClimaQuery.data &&
                    useClimaQuery?.data[indexClimaData][
                      obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                    ]?.icono
                  }
                  className="w-20 mb-2"
                >
                  {/* ... SVG Path ... */}
                </img>
                <strong className="leading-none text-6xl block font-weight-bolder">
                  {useClimaQuery.data &&
                    useClimaQuery?.data[indexClimaData][
                      obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                    ]?.temperatura}
                </strong>
                <b className="text-2xl block font-bold">
                  {" "}
                  {useClimaQuery.data &&
                    useClimaQuery?.data[indexClimaData][
                      obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                    ]?.estado}
                </b>
                <b className="text-lg block font-bold">
                  {" "}
                  {useClimaQuery.data &&
                    useClimaQuery?.data[indexClimaData][
                      obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                    ]?.hora}
                </b>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* clima extendido  */}
      <div className=" mx-auto">
        <div className="mt-2 bg-gray-800 text-white p-8 rounded-lg">
          <div className="flex justify-between min-w-64 mb-4 w-full">
            <div className="w-auto font-bold uppercase text-90">
              {t("Componente-seccion-clima-extendido.Humidity")}
            </div>
            <div className="w-auto text-right">
              {" "}
              {useClimaQuery.data &&
                useClimaQuery?.data[indexClimaData][
                  obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                ]?.humedad}
            </div>
          </div>
          <div className="flex justify-between min-w-64 mb-8 w-full">
            <div className="w-auto font-bold uppercase text-90">{t("Componente-seccion-clima-extendido.Wind")}</div>
            <div className="w-auto text-right">
              {" "}
              {useClimaQuery.data &&
                useClimaQuery?.data[indexClimaData][
                  obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                ]?.viento}
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto md:overflow-hidden">
            <div className="flex flex-wrap xl:flex-nowrap gap-4">
              {useClimaQuery.data &&
                !useClimaQuery.isLoading &&
                useClimaQuery.data.map((dia, index) => {
                  return (
                    <div
                      onClick={() => setIndexClimaData(index)}
                      key={index}
                      className={`flex flex-col w-full sm:w-full md:w-1/2 lg:w-1/4 cursor-pointer px-2 mb-4  justify-center text-center ${
                        indexClimaData === index
                          ? "bg-gray-100 text-black"
                          : "bg-gray-900 text-white"
                      } rounded-lg pb-4`}
                    >
                      <div className="text-center">
                        <img
                          src={dia[0].imagen}
                          className="w-20 mx-auto mb-2"
                          alt=""
                        />
                        <b className="font-normal">{dia[0].dia}</b>
                        <br />
                        <strong className="text-xl">{dia[0].tempMax}</strong>
                        <p className="text-xs text-gray-500">
                        {t("Componente-seccion-clima-extendido.apparent temperature")} <br /> {dia[0].sensacionTermica}
                        </p>
                      </div>
                      <div className="flex justify-center mt-auto border-t-2 border-gray-100 pt-2">
                        <button
                          onClick={openModal}
                          className="text-indigo-600 text-xs font-medium focus:outline-none"
                        >
                     {t("Componente-seccion-clima-extendido.extended forecast")}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CLIMA POR HORA  */}
      <div
        id="modal"
        className="fixed top-0 left-0  bottom-0 right-0 mt-10 w-screen h-full flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-0 transition-transform duration-300"
      >
        {/* Modal content */}
        <div className="bg-white p-12">
          {/* Close modal button */}
          <button
            id="closebutton"
            type="button"
            className="focus:outline-none z-40 mt-14"
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
            pronostico={useClimaQuery && useClimaQuery.data}
            zona={state && state.datosZona.ciudad}
            indexClimaData={indexClimaData}
          />
        </div>
      </div>
    </>
  );
};

export default SeccionClimaExtendido;
