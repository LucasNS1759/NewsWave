import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginationNoticias from "./PaginationNoticias";
import Dolar from "../Dolar/Dolar";

const FullNews = () => {
  //estado para guardar Noticias , captura de la categoria q la mando por searchParamns en el componente subnoticia y hago la request con esa categoria
  const [fullNews, setFullNews] = useState("");
  const [error, setError] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  /********************************************** */
  const [noticiaPorPagina] = useState(6);
  const [paginaActual, setPaginaActual] = useState(1);
  /********************************************** */

  //  Querys que puedo capturar segun de que punto  este redireccionando la pagina
  const categoria = new URLSearchParams(location.search).get("categoria");
  const keyWords = new URLSearchParams(location.search).get("keyWords");
  const dolar = new URLSearchParams(location.search).get("dolar");
  /********************************************** */

  //regex para formatear la fecha de publicacion de las notas de las noticias
  const regex = /^(.*)(?=\s\+\d{4})/;
  /********************************************** */

  /********************************************** */
  //variables necesarias para poder hacer la paginacion, estas variables se las paso por props al componente pagination cuando pasan las condicionales y cuando se crean las variables

  const indiceDeLaUltimaPagina = paginaActual * noticiaPorPagina;
  const indiceDeLaPrimeraPagina = indiceDeLaUltimaPagina - noticiaPorPagina;
  let noticiasActual =
    fullNews && fullNews.slice(indiceDeLaPrimeraPagina, indiceDeLaUltimaPagina);
  /********************************************** */

  const getFullNoticias = async (api) => {
    try {
      setFullNews("");
      setPaginaActual(1);
      const response = await axios.get(api);
      if (!response.data.news.length) {
        let api = `/noticias/fullNews?category=${categoria}&language=en`;
        getFullNoticias(api);
      }
      if (response.status === 200) {
        console.log(response.data);
        setFullNews(response.data.news);
      }
    } catch (error) {
      if (error) {
        setError(true);
      }
      // if (
      //   error.response.data.message ===
      //     `Tiempo de espera agotado para la búsqueda en  para la categoría ${categoria}` ||
      //   error.status === 501
      // ) {
      //   let api = `/noticias/fullNews?category=${categoria}&language=en`;
      //   getFullNoticias(api);
      // }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /********************************************** */
  // UseEffect para que cuando cambie de pagina o se redireccione por primera vez a la pagina se scrollee al top de la pagina para visualizar la informacion
  useEffect(() => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (categoria === "Latest News") {
      let api = `/noticias?`;
      getFullNoticias(api);
    } else {
      let api = keyWords
        ? `/noticias/fullNews?keyWords=${keyWords}`
        : `/noticias/fullNews?category=${categoria}`;
      getFullNoticias(api);
    }
  }, [categoria, keyWords]);

  return (
    <>
      {loading ? (
        <div className="flex  items-center justify-center w-full h-screen">
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
      ) : error && !fullNews ? (
        <section className="h-screen w-full flex flex-col justify-center items-center ">
          <h1 className="text-9xl font-extrabold text-black tracking-widest">
            404
          </h1>
          <div className="bg-[#c4c8f5] px-2 text-sm font-bold rounded rotate-12 absolute">
            News Not Found
          </div>
          <div className="flex  justify-between px-4 mx-4 ">
            <button className="mt-5">
              <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                  <router-link to="/">Go Home</router-link>
                </span>
              </a>
            </button>
            <button className="mt-5">
              <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                  <router-link to="/">Go Home</router-link>
                </span>
              </a>
            </button>
          </div>
        </section>
      ) : (
        <section className="  mt-20 w-full">
          {dolar ? <Dolar /> : ""}
          <div className="container  py-10 mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
              {categoria && categoria}
              {keyWords &&
                fullNews &&
                `Aquie estan las Noticias relacionadas con ${keyWords}`}
            </h1>

            <div className="grid grid-cols-1 gap-6 mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
              {noticiasActual &&
                noticiasActual.map((news) => {
                  return (
                    <div
                      key={news.id}
                      className="flex flex-col h-full  justify-between py-6  px-6 mx-auto w-full"
                    >
                      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {news && news.title}
                      </h1>
                      <img
                        className="object-cover w-full h-56 rounded-lg"
                        src={
                          news &&
                          (news.image === "None" ? "/noticia.jpg" : news.image)
                        }
                        alt=""
                      />
                      <p className="text-xl text-gray-500 dark:text-gray-300">
                        {news && news.description}
                      </p>
                      <span className="text-base text-gray-500 dark:text-gray-300">
                        Publicado por <br />
                        {news.author && news.author}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {news.published && news.published.match(regex)[0]}
                      </span>
                      <hr />
                      <a
                        className="block p-2 pl-0 pt-1 text-sm text-gray-600"
                        href={news && news?.url}
                        target="_blank"
                        rel={"noreferrer"}
                      >
                        Nota Completa
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
          {fullNews.length > 0 && (
            <PaginationNoticias
              fullNews={fullNews && fullNews}
              noticiaPorPagina={noticiaPorPagina}
              paginaActual={paginaActual}
              setPaginaActual={setPaginaActual}
            />
          )}
        </section>
      )}
    </>
  );
};

export default FullNews;
