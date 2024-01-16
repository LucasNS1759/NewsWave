import { useEffect, useState } from "react";
import axios from "axios";
import SubNoticias from "./SubNoticias";

import NoticiasGrupoDeTres from "../NoticiasGrupoDeTres/NoticiasGrupoDeTres";
import Dolar from "../Dolar/Dolar";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";
import Clima from "../Clima/Clima";
import SubNavBar from "../SubNavBar/SubNavBar";
import Loading from "../Loading/Loading";

const HomeNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [ultimasNoticias, setUltimasNoticias] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const login = new URLSearchParams(location.search).get("login");
  const userId = new URLSearchParams(location.search).get("userId");

  useEffect(() => {
    if (login) {
      dispatch(setLogin("true"));
      window.localStorage.setItem("login", login);
      window.localStorage.setItem("userId", JSON.stringify(userId));
    }
    return;
  }, [dispatch, login, userId]);
  const getNoticias = async () => {
    try {
      const response = await axios.get("http://localhost:3001/noticias?");
      setNoticias(response?.data);
      if(response.status !== 200){
      getNoticias();
      }
    } catch (error) {
    if(error.status === 504){
     getNoticias()
    }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUltimasNoticias = async () => {
    try {
      // if (!ultimasNoticias.length) {
      const response = await axios.get(
        "http://localhost:3001/noticias/ultimasNoticias"
      );
      if (
        response.status === 504 ||
        response.status === 500 ||
        response.status === 400 ||
        response.status === 501 || !response.status
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
    getNoticias();
  }, []);

  useEffect(() => {
    if (!noticias.length) {
      getUltimasNoticias();
    }
  }, []);

  return (
    // <!-- component -->
    <div className="max-w-screen-lg mx-auto">
      {/* <!-- header --> */}
      <SubNavBar />
      {loading ? (
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
                {ultimasNoticias ? ultimasNoticias[0]?.category[0] : " "}
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
                Nota completa
              </a>
            </div>

            {/* <!-- sub-main posts --> */}
            <div className="w-full md:w-4/7">
              {ultimasNoticias &&
                ultimasNoticias
                  .slice(1, ultimasNoticias.length)
                  .map((noticia) => {
                    return <SubNoticias key={noticia.id} category={noticia} />;
                  })}
            </div>
          </div>

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
          </div>
          {/* <!-- ens subscribe section --> */}

          {!loading &&
            noticias &&
            Object.entries(noticias).map((noticia, index) => {
              return (
                <NoticiasGrupoDeTres
                  key={index}
                  noticiasGrupo={noticia[1]}
                  titulo={noticia[0]}
                />
              );
            })}
        </main>
      )}
      {/* <!-- main ends here --> */}
    </div>
  );
};

export default HomeNoticias;
