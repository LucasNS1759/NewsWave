import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { categories, languages } from "../../helpers/dataFiltrosNoticias";
import SeccionNoticias from "../SeccionNoticias/SeccionNoticias";
import FiltroYbusquedaNoticias from "../Filtros/FiltroYbusquedaNoticias";
import NoticiaError from "../SeccionNoticias/NoticiaError";

const HeroNavBar = () => {
  const [noticias, setNoticias] = useState("");
  const [cathError, setCachError] = useState("");
  const [querys, setQueys] = useState({
    keyWords: "",
    language: "",
    category: "",
  });

  const [paginaActual, setPaginaActual] = useState(1);

  const handlerAnterior = () => {
    if (paginaActual === 1) return;
    setPaginaActual(paginaActual - 1);
  };

  const handlerSiguiente = () => {
    if (paginaActual === noticias.length) return;
    setPaginaActual(paginaActual + 1);
  };

  const handlerLenguajes = (e) => {
    setQueys({
      ...querys,
      language: e.target.value,
    });
  };
  const handlerCategorias = (e) => {
    setQueys({
      ...querys,
      category: e.target.value,
      language : "es"
    });
  };

  const onchangeSearch = (e) => {
    setQueys({ ...querys, [e.target.name]: e.target.value });
  };

  const getNoticias = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/noticias?keyWords=${querys?.keyWords}&language=${
          querys.language ? querys.language : "es"
        }&category=${querys?.category}`
      );

      if (response) {
        setNoticias(response.data.news);
        return response.data.news;
      }
    } catch (error) {
      setCachError(500);
      console.log(error);
    }
  }, [querys?.category, querys?.keyWords, querys?.language]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Realizar la búsqueda cuando el usuario ha dejado de escribir durante un tiempo
      getNoticias();
    }, 300); // Ajusta el tiempo según tus necesidades

    return () => clearTimeout(delayDebounceFn);
  }, [getNoticias, querys.keyWords]); //

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [
      "getNoticias",
      querys?.language,
      querys?.category,
      querys.keyWords,
    ],
    queryFn: getNoticias,
  });

  if (isLoading) {
    <div className="loading loading-spinner loading-lg"></div>;
  }

  if (isError) {
    console.log(cathError);
    if (cathError === 500) {
      setQueys({
        ...querys,
        language: "en",
      });
      
    }
    return <NoticiaError />;
  }

  const indiceUltimaNoticia = paginaActual * 1;
  const indicePrimeraNoticia = indiceUltimaNoticia - 1;
  let noticiaActual =
    data &&
    noticias.length &&
    noticias.slice(indicePrimeraNoticia, indiceUltimaNoticia);
  return (
    <>
      {/* HERO /*****************************  */}
      <main className="flex flex-col bg-gradient-to-tr from-indigo-800">
        {/* <!-- section hero --> */}
        <section className=" mt-20 bg-gradient-to-tr from-indigo-800">
          <div className=" sm:grid grid-cols-5   py-6 min-h-full lg:min-h-screen  space-y-6 sm:space-y-0 sm:gap-4">
            {data ? (
              <SeccionNoticias
                data={data}
                noticiaActual={noticiaActual}
                handlerAnterior={handlerAnterior}
                handlerSiguiente={handlerSiguiente}
              />
            ) : (
              <div
                className="h-screen col-span-4  to-indigo-500 rounded-md flex items-center "
                style={{
                  backgroundImage:
                    "url('https://usagif.com/wp-content/uploads/loading-92.gif')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}

            <FiltroYbusquedaNoticias
              querys={querys}
              onchangeSearch={onchangeSearch}
              categories={categories}
              languages={languages}
              handlerCategorias={handlerCategorias}
              handlerLenguajes={handlerLenguajes}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default HeroNavBar;
