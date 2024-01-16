import ClimaActual from "./ClimaActual";
import { getClima } from "../../helpers/climaFunctions/getApiClima";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ClimaExtendido from "./ClimaExtendidoPorHora";
import { actualizarCoordenadas } from "../../redux/clima";

const obtenerMedioDiaHora = (index, useClimaQuery) => {
  return Math.floor(useClimaQuery.data[index].length / 2);
};

const SeccionClimaExtendido = () => {
  const state = useSelector((state) => state.climaSlice);
  const latitud = state?.coordenadas.latitud;
  const longitud = state?.coordenadas.longitud;
  const [indexClimaData, setIndexClimaData] = useState(0);

  //cada vez que el estado de redux coordenadas(lat y lon) muten se dispara una nueva peticion con la lat y lon enuentra la zona donde buscar y la peticion es para buscar pronostico estendido de 5 dias para la zona a buscar devuelve un arr de obj donde cada elemento es un dia con estadisticas cada 3 hs del clima
  const useClimaQuery = useQuery({
    queryKey: ["getClima", state.coordenadas, actualizarCoordenadas],
    queryFn: () => getClima(latitud, longitud),
    // enabled: false,
  });

  // useEffect(() => {
  //   // Lógica para cargar los datos si aún no están en caché
  //   if (!useClimaQuery.data) {
  //     useClimaQuery.refetch();
  //   }
  //   return;
  // }, [useClimaQuery, useClimaQuery.data, useClimaQuery.refetch]);

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
        <div className="flex xl:w-screen  w-full  justify-center  mx-auto relative">
          <ClimaActual />

          <div className="flex w-2/3 ">
            <div className="w-full lg:w-1/2 flex rounded-lg bg-auto">
              <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
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

            <div className=" w-full flex ml-0">
              <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
                <div className="flex justify-between min-w-64 mb-4 w-full">
                  <div className="w-auto font-bold uppercase text-90">
                    Humedad
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
                  <div className="w-auto font-bold uppercase text-90">
                    Viento
                  </div>
                  <div className="w-auto text-right">
                    {" "}
                    {useClimaQuery.data &&
                      useClimaQuery?.data[indexClimaData][
                        obtenerMedioDiaHora(indexClimaData, useClimaQuery)
                      ]?.viento}
                  </div>
                </div>

                <div className="flex gap-2">
                  {useClimaQuery.data &&
                    !useClimaQuery.isLoading &&
                    useClimaQuery.data.map((dia, index) => {
                      return (
                        <div
                          onClick={() => setIndexClimaData(index)}
                          key={index}
                          className={`flex flex-col w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 cursor-pointer mx-1 px-2 mb-2 lg:mb-0   
                           ${
                             indexClimaData === index
                               ? "bg-gray-100 text-black"
                               : "bg-gray-900 text-white"
                           } rounded-lg pb-4`}
                        >
                          <div className="">
                            <img className="w-10 mx-auto"></img>
                          </div>
                          <div className="text-center">
                            <b className="font-normal">{dia[0].dia}</b>
                            <br />
                            <strong className="text-xl">
                              {dia[0].tempMax}
                            </strong>
                            <p className="text-xs text-gray-500">
                              Sensacion <br /> Termica {dia[0].sensacionTermica}
                            </p>
                          </div>
                          <div className="w-full place-items-end border-t-2 border-gray-100 mt-2">
                            <button
                              onClick={openModal}
                              className="text-indigo-600 text-xs font-medium focus:outline-none"
                            >
                              Pronostico <br />
                              por hora
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
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
                    pronostico={useClimaQuery && useClimaQuery.data}
                    zona={state && state.datosZona.ciudad}
                    indexClimaData={indexClimaData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeccionClimaExtendido;
