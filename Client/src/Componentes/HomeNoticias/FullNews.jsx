import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginationNoticias from "./PaginationNoticias";
import Dolar from "../Dolar/Dolar"

const FullNews = () => {
  //estado para guardar Noticias , captura de la categoria q la mando por searchParamns en el componente subnoticia y hago la request con esa categoria
  const [fullNews, setFullNews] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const categoria = new URLSearchParams(location.search).get("categoria");
  const keyWords = new URLSearchParams(location.search).get("keyWords");
  const dolar = new URLSearchParams(location.search).get("dolar");
  
  const regex = /^(.*)(?=\s\+\d{4})/;

  const getFullNoticias = async (api) => {
    try {
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
      if (
        error.response.data.message ===
        `Tiempo de espera agotado para la búsqueda en  para la categoría ${categoria}` || error.status === 501 
      ) {
        let api = `/noticias/fullNews?category=${categoria}&language=en`;
        getFullNoticias(api);
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // if (fullNews) return;
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

  /********************************************** */
  const [noticiaPorPagina] = useState(6);
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceDeLaUltimaPagina = paginaActual * noticiaPorPagina;
  const indiceDeLaPrimeraPagina = indiceDeLaUltimaPagina - noticiaPorPagina;

  let noticiasActual =
    fullNews && fullNews.slice(indiceDeLaPrimeraPagina, indiceDeLaUltimaPagina);

  return (
    // <!-- component -->
    <>
    
      {loading ? (
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
     
        <section className="bg-white dark:bg-gray-900 mt-20">
         {dolar ? <Dolar/> : ""}
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
              {categoria && categoria}
              <hr />
            </h1>
         

            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {noticiasActual &&
                noticiasActual.map((news) => {
                  return (
                    <div key={news.id} className="lg:flex">
                      <img
                        className="object-cover w-full h-56 rounded-lg lg:w-64"
                        src={
                          news && news.image === "None"
                            ? "/noticia.jpg"
                            : news.image
                        }
                        alt=""
                      />

                      <div className="flex flex-col justify-between py-6 lg:mx-6">
                        <h1 className=" text-2xl  font-semibold text-gray-800  dark:text-white ">
                          {news && news.title}
                        </h1>
                       
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
                    </div>
                  );
                })}
            </div>
          </div>
          <PaginationNoticias
            fullNews={fullNews && fullNews}
            noticiaPorPagina={noticiaPorPagina}
            paginaActual={paginaActual}
            setPaginaActual={setPaginaActual}
          />
        </section>
      )}
    </>
  );
};

export default FullNews;
