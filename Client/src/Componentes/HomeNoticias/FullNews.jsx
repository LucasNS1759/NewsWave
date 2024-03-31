import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginationNoticias from "./PaginationNoticias";
import Dolar from "../Dolar/Dolar";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const FullNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const getFullNoticias = async () => {
    setPaginaActual(1);
    //CAPTURO IDIOMA A BUSCAR
    let languageToggle = window.localStorage.getItem("languages");
    let api = `/noticias/fullNews?keyWords=${
      keyWords ? keyWords : ""
    }&category=${categoria ? categoria : ""}&language=${languageToggle}`;
    try {
      //HAGO LA BUSQUEDA CON EL IDIOMA Q ESTA ESTABLECIDO EN LOCALSTORAGE
      const response = await axios.get(api);
      return response.data;
    } catch (error) {
      // Y ACA CONTEMPLA EL CASO DE Q ME DE EL ERROR ESPERADO MANEJADO EN EL BACK Q NO ENCONTRO NOTICIAS EN ESPAÑOL ENTONCES HAGO UNA NUEVA PETICION PERO EN INGLES
      if (error.response.data.idioma === "es") {
        try {
          const response = await axios.get(api.replace("es", "en"));
          return response.data;
        } catch (error) {
          Swal.fire({
            title: "No se encontro resultados",
            text: `no se encontro noticias relacionados para la busqueda ${
              keyWords ? keyWords : categoria
            } pruebe una nueva busque e intente de nuevo`,
            icon: "error",
            button: "ok",
          });
          console.log(error);
        }
      }
      if (error && !error.response.data.idioma) {
        Swal.fire({
          title: "Ups somethings goes wrong",
          text: error.response.data,
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // Acción a realizar cuando el usuario hace clic en el botón "OK"
            console.log("El usuario hizo clic en OK");
            return navigate("/FullNews?categoria=last News");
          } else if (result.dismiss === Swal.DismissReason.backdrop) {
            // Acción a realizar cuando el usuario hace clic en el botón de cancelar
            return navigate("/FullNews?categoria=last News");
          }
        });
      }
      console.log(error);
    }
  };
  /********************************************** */
  const useQueryFullNews = useQuery({
    queryKey: ["getFullNews", categoria, keyWords],
    queryFn: getFullNoticias,
    refetchOnMount: false,
    retry: false,
  });

  /********************************************** */
  //variables necesarias para poder hacer la paginacion, estas variables se las paso por props al componente pagination cuando pasan las condicionales y cuando se crean las variables
  const indiceDeLaUltimaPagina = paginaActual * noticiaPorPagina;
  const indiceDeLaPrimeraPagina = indiceDeLaUltimaPagina - noticiaPorPagina;
  let noticiasActual =
    useQueryFullNews?.data &&
    useQueryFullNews?.data.news.slice(
      indiceDeLaPrimeraPagina,
      indiceDeLaUltimaPagina
    );
  /********************************************** */
  // UseEffect para que cuando cambie de pagina o se redireccione por primera vez a la pagina se scrollee al top de la pagina para visualizar la informacion
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [categoria, keyWords]);
  return (
    <>
      {useQueryFullNews.isLoading ? (
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
      ) : (
        <section className="  mt-20 w-full">
          {dolar ? <Dolar /> : ""}
          <div className="container  py-10 mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
              {categoria && categoria}
              {keyWords && useQueryFullNews.data
                ? `Aquie estan las Noticias relacionadas con ${keyWords}`
                : ""}
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
          {useQueryFullNews.data && (
            <PaginationNoticias
              fullNews={
                useQueryFullNews.data.news && useQueryFullNews.data.news
              }
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
