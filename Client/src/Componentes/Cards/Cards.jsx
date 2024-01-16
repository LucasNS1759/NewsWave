/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actualizarPagina, filtrarPorNombre } from "../../redux/querysSlice";

const Cards = () => {
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
      regionFromStorage !== null
    ) {
      dispatch(actualizarPagina(paginaFromStorage));
      dispatch(filtrarPorNombre(JSON.parse(searchFromStorage)));
      dispatch(filtrarPorNombre(JSON.parse(regionFromStorage)));
      dispatch(filtrarPorNombre(JSON.parse(actividadFromStorage)));
    }
    setLoading(false); // Indicar que la carga ha terminado
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("pagina", state?.pagina);
    }
  }, [state?.pagina, loading]);

  const getCounries = async () => {
    const response = await axios.get(
      `http://localhost:3001/countries?pagina=${state?.pagina}&nombreComun=${state?.nombreComun}&continente=${state?.continente}&actividad=${state?.actividad}&orden=${state?.orden}&tipoDeOrden=${state?.tipoDeOrden}`
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

  if (isError) {
    return (
      <di>
        <h1>{error.message}</h1>
      </di>
    );
  } else if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="w-screen  border lg:min-h-screen grid md:grid-cols-3 md:mx-auto md:px-12 bg-gray-200 text-gray-800 sm:grid grid-cols-3      ">
      {data &&
        data?.data.map((countrie, index) => {
          return (
            <Card
              key={index}
              id={countrie?.id}
              nombreComun={countrie?.nombreComun}
              nombreOficial={countrie?.nombreOficial}
              bandera={countrie?.bandera}
              continente={countrie?.continente}
              capital={countrie?.capital}
              region={countrie?.region}
              subRegion={countrie?.subRegion}
              googleMaps={countrie?.googleMaps}
              area={countrie?.area}
              poblacion={countrie?.poblacion}
              soberano={countrie?.soberano}
            />
          );
        })}
      {/* </div> */}

      <Pagination totalDePaginas={data && data.totalDePaginas} />
    </section>
  );
};

export default Cards;
