import { useEffect, useState } from "react";
import axios from "axios";
import SubNoticias from "./SubNoticias";
import NoticiasGrupoDeTres from "./NoticiasGrupoDeTres";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import SubNavBar from "../NavBar/SubNavBar";
import { unsubscribeHandler } from "../../helpers/functionUnsubscribe/unsubscribe";
import { useNavigate } from "react-router-dom";

const HomeNoticias = () => {
  const navigate = useNavigate();
  const [noticias] = useState([]);
  const [ultimasNoticias, setUltimasNoticias] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const login = new URLSearchParams(location.search).get("login");
  const userId = new URLSearchParams(location.search).get("userId");
  const unsubscribe = new URLSearchParams(location.search).get("unsubscribe");

  useEffect(() => {
    if (unsubscribe) {
      unsubscribeHandler();
      // Limpiar los parámetros de búsqueda del URL
      navigate(location.pathname);
    }
  }, [unsubscribe, navigate]);

  useEffect(() => {
    if (login) {
      dispatch(setLogin("true"));
      window.localStorage.setItem("login", login);
      window.localStorage.setItem("userId", JSON.stringify(userId));
    }
    return;
  }, [dispatch, login, userId]);

  const getNoticias = async () => {
    const response = await axios.get("/noticias?");
    return response;
  };

  const getUltimasNoticias = async () => {
    const languageToggle = window.localStorage.getItem("languages");
    try {
      // if (!ultimasNoticias.length) {
      const response = await axios.get(
        `/noticias/ultimasNoticias?language=${languageToggle}`
      );
      if (
        response.status === 504 ||
        response.status === 500 ||
        response.status === 400 ||
        response.status === 501 ||
        !response.status
      ) {
        getUltimasNoticias();
      }
      setUltimasNoticias(response.data);
      // }
    } catch (error) {
      if (
        error.status === 400 ||
        error.status === 504 ||
        error.status == 501 ||
        error.status === 500
      ) {
        getUltimasNoticias();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!noticias.length) {
      getUltimasNoticias();
    }
  }, []);

  const useNoticiasQuerys = useQuery({
    queryKey: ["getNoticias"],
    queryFn: getNoticias,
    staleTime: 1000,
  });
  if (useNoticiasQuerys.isError) {
    return useNoticiasQuerys.refetch;
  }

  return (
    // <!-- component -->
    <div className="max-w-screen-lg mx-auto">
      {/* <!-- header --> */}
      <SubNavBar />
      {useNoticiasQuerys.isLoading && loading ? (
        <Loading />
      ) : (
        <main className="mt-28">
          {/* <!-- featured section --> */}
          {/* <Dolar /> */}

          <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-6 mb-16">
            {/* <!-- main post --> */}

            <div className="mb-4 lg:mb-0  p-4 lg:p-0 w-full md:w-4/6  relative rounded block">
              <img
                src={
                  ultimasNoticias && ultimasNoticias[0]?.image == "None"
                    ? "/noticia.jpg"
                    : ultimasNoticias[0]?.image
                }
                className="rounded-md object-cover w-full h-72"
              />
              <span className="text-green-800 font-bold text-sm hidden md:block mt-4">
                {" "}
              </span>
              <h1 className="text-gray-800 text-4xl font-black mt-2 mb-2 leading-tight">
                {ultimasNoticias ? ultimasNoticias[0]?.title : " "}.
              </h1>
              <p className="text-gray-800 font-bold mb-4">
                {ultimasNoticias ? ultimasNoticias[0]?.description : " "}
              </p>
              <a
                href={ultimasNoticias && ultimasNoticias[0]?.url}
                target="_blank"
                rel={"noreferrer"}
                className="inline-block px-6 py-3 mt-2 rounded-md underline text-blue-500"
              >
                Full News
              </a>
            </div>

            {/* <!-- sub-main posts --> */}
            <div className="w-full md:w-4/7">
              {ultimasNoticias &&
                ultimasNoticias
                  .slice(1, ultimasNoticias.length)
                  .map((noticia) => {
                    return <SubNoticias key={noticia?.id} category={noticia} />;
                  })}
            </div>
          </div>

          {/*
          PAISES CANCELADO
          <div className="rounded flex md:shadow mt-12">
            <img
              src={"/continente.jpg"}
              className="w-0 md:w-1/4 object-cover rounded-l"
            />
            <div className="px-4 py-2">
              <h3 className="text-3xl text-gray-800 font-bold">
                explora datos y estadisticas
              </h3>
              <p className="text-xl text-gray-700">
                investiga informacion oficial sobre paises, continentes y agrega
                actividades turisticas para que otras personas puedan informarce
                sobre el lugar al que quieran visitar.
              </p>
              <div className="mt-10 mb-10">
                <a
                  href="/paises"
                  className="text-green-900 opacity-50 text-lg mt-1"
                >
                  Investigar
                </a>
              </div>
            </div>
          </div> */}

          {!useNoticiasQuerys.isError &&
            useNoticiasQuerys.data &&
            Object.entries(Object.entries(useNoticiasQuerys.data)[0][1]).map(
              (noticia, index) => {
                return (
                  <NoticiasGrupoDeTres
                    key={index}
                    noticiasGrupo={noticia[1]}
                    titulo={noticia[0]}
                  />
                );
              }
            )}
        </main>
      )}
      {/* <!-- main ends here --> */}
    </div>
  );
};

export default HomeNoticias;
