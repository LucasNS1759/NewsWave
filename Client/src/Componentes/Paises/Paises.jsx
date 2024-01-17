import FiltroDePaises from "../Filtros/FiltroDePaises";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actualizarPagina, filtrarPorNombre,filtrarPorContinente,filtrarPorActividad } from "../../redux/querysSlice";
import { Link } from "react-router-dom";

const Paises = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.querySlice);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar la página del localStorage solo una vez al inicio
    const paginaFromStorage = window.localStorage.getItem("pagina");
    const searchFromStorage = window.localStorage.getItem("search");
    const regionFromStorage = window.localStorage.getItem("region");
    const actividadFromStorage = window.localStorage.getItem("actividad");

    if (
      paginaFromStorage !== null ||
      searchFromStorage !== null ||
      regionFromStorage !== null ||
      actividadFromStorage !== null
    ) {
      dispatch(actualizarPagina(paginaFromStorage));
      dispatch(filtrarPorNombre(JSON.parse(searchFromStorage)));
      dispatch(filtrarPorContinente(JSON.parse(regionFromStorage)));
      dispatch(filtrarPorActividad(JSON.parse(actividadFromStorage)));
    }
    setLoading(false); // Indicar que la carga ha terminado
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("pagina", state?.pagina);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [state?.pagina, loading]);

  const getCounries = async () => {
    const response = await axios.get(
      `/countries?pagina=${state?.pagina}&nombreComun=${state?.nombreComun}&continente=${state?.continente}&actividad=${state?.actividad}&orden=${state?.orden}&tipoDeOrden=${state?.tipoDeOrden}`
    );
    return response.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [
      "getCountries",
      state?.pagina,
      state?.nombreComun,
      state?.continente,
      state?.actividad,
    ],
    queryFn: getCounries,
  });

  console.log(data);
  if (isError) {
    return (
      <di>
        <h1>{error.message}</h1>
      </di>
    );
  }
  return (
    // <!-- component -->

    <div className=" sm:grid grid-cols-5  px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4 ">
      <FiltroDePaises />
      <section className="bg-white  mt-20 px-4 lg:px-16 h-screen col-span-4  rounded-md flex items-center">
        <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
          <h1 className="text-center text-5xl pb-12">Paises</h1>

          {isLoading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
                <svg
                  fill="none"
                  className="w-6 h-6 animate-spin"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>

                <div>Loading ...</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
              {data &&
                data.data.map((country, index) => {
                  return (
                    <div
                      key={index}
                      className="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                    >
                      <Link
                        to={`/Detalle/${country && country?.id}`}
                        className="block"
                      >
                        <div className="h-28">
                          <div className="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48  rounded-xl justify-items-center align-middle">
                            <img
                              src={country?.bandera && country?.bandera}
                              className="w-fit h-44  mt-6 m-auto"
                              alt="Automotive"
                              title="Automotive"
                              loading="lazy"
                              width="200"
                              height="200"
                            />
                          </div>
                        </div>
                        <div className="p-6   z-10 w-full   ">
                          <p className="mb-2 inline-block  text-center w-full  text-lg  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                            {country.nombreComun && country?.nombreComun}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <Pagination totalDePaginas={data && data.totalDePaginas} />
      </section>
    </div>
  );
};

export default Paises;
