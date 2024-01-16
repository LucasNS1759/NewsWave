/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Maps from "../Maps/Maps";

// eslint-disable-next-line react/prop-types
const InfoDetailPaises = ({detailCountrie,monedas}) => {
  return (
    <div className="container px-6 py-6 mx-auto">
    <div className="lg:flex lg:items-center">
      {detailCountrie && (
        <div className="w-full space-y-12 lg:w-1/2 ">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
              explora los datos y estadisticas de <br />{" "}
              {detailCountrie?.nombreComun}
            </h1>

            <div className="mt-1">
              <span className="inline-block w-40 h-1 rounded-full bg-blue-500"></span>
              <span className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500"></span>
              <span className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500"></span>
            </div>
          </div>

          <div className="">
            <div className="mt-1 md:mx-4 ">
              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white mx-auto">
                Informacion general
              </h1>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                {detailCountrie.nombreComun}{" "}
                {detailCountrie.soberano === true
                  ? "es un Pais Soberano"
                  : "no es un Pais Soberano"}
                <br />
                su nombre oficial es {detailCountrie.nombreOficial}, su
                capital es <strong>{detailCountrie.capital}</strong>.
                <br />
                su moneda oficial es <br />
                <strong>
                  {" "}
                  {monedas &&
                    monedas.map((moneda) => {
                      return moneda[1].symbol + moneda[1].name + " ";
                    })}
                </strong>
                zona horaria es la{" "}
                <strong>{detailCountrie.zonaHoraria[0]}</strong>
                {new Array(Object.values(detailCountrie.idioma)).map(
                  (idioma, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <strong>{" " + idioma + " "} </strong>
                        </li>
                      </ul>
                    );
                  }
                )}
              </p>
            </div>
          </div>

          <div className="">
            <div className="mt-2 md:mx-4 md:mt-0">
              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white mx-auto">
                Informacion Geografica
              </h1>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Ubicado en el continente de{" "}
                <strong>{detailCountrie.continente} </strong> <br />
                <strong>{detailCountrie.nombreOficial}</strong> <br />
                se enuentra en la region de{" "}
                <strong>{detailCountrie.region}</strong> en la zona{" "}
                {detailCountrie.subRegion}
              </p>
            </div>
          </div>

          <div className="">
            <div className="mt-2 md:mx-4 md:mt-0">
              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white w-full">
                Informacion Demografica
              </h1>

              <p className="mt-1 text-gray-500 dark:text-gray-300">
                Cuenta con una{" "}
                <strong>
                  {" "}
                  poblacion de {detailCountrie.poblacion} de habitantes{" "}
                </strong>{" "}
                esparcidos en sus{" "}
                <strong>{detailCountrie.area} km2 </strong>
                <br />
                estadistica{" "}
                <strong>
                  Gini del año {Object.keys(detailCountrie.gini)} :{" "}
                  {Object.values(detailCountrie.gini)}
                </strong>{" "}
                <br />
                {detailCountrie.paisesFronterizos[0] === "no tiene"
                  ? "no cuenta con paises Fronterizos"
                  : "sus paises fronterizos son los siguientes "}
              </p>
            </div>
          </div>
          <Link to={"/paises"}>
          <button>volver</button>
          </Link>
        </div>
      )}

      <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-1/2 lg:justify-center">
        {detailCountrie && (
          <Maps
            latitud={detailCountrie && detailCountrie?.latitud[0]}
            longitud={detailCountrie && detailCountrie?.latitud[1]}
          />
        )}
      </div>
    </div>
    {detailCountrie?.activities &&
      detailCountrie.activities[0]?.Nombre}
      <br />
    {detailCountrie?.activities[0]?.reviews[0]?.review &&
      detailCountrie.activities[0].reviews[0]?.review}
    <hr className="border-gray-200 my-12 dark:border-gray-700" />
  
  </div>
  )
}

export default InfoDetailPaises