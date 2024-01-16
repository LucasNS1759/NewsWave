import axios from "axios";
import { useEffect, useState } from "react";

const Dolar = () => {
  const [dolares, setDolares] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [indexDolar, setIndexDolar] = useState("");
  const tooTexts = [
    "Cotización del dólar estadounidense en el mercado oficial. Es decir, el precio de compra y venta de dólares en bancos y casas de cambio autorizadas por el Banco Central de la República Argentina (BCRA).",
    "Cotización del dólar estadounidense en el mercado paralelo o informal. Es decir, el precio de compra y venta de dólares en cuevas o casas de cambio no autorizadas por el Banco Central de la República Argentina (BCRA).",
    "Cotización del dólar estadounidense en el mercado bursátil. Es decir, el precio de compra y venta de dólares en el mercado de valores. También conocido como Dólar MEP.",
    "Cotización del dólar estadounidense en el mercado bursátil. Es decir, el precio de compra y venta de dólares en el mercado de valores. También conocido como Dólar CCL.",
    "Es el valor de la cotización del dólar estadounidense en el mercado oficial, más el impuesto PAIS (30%) y el impuesto a las ganancias (45%). No es una cotización, sino un valor calculado. Por lo tanto, no existe un precio de compra.",
    "Cotización del dólar estadounidense en el mercado mayorista. Es decir, el precio de compra y venta de dólares en el mercado interbancario.",
    "dólar que se compra o se obtiene a través de la operatoria con criptomonedas (por ejemplo Bitcoin, Ethereum, DAI, entre otras).",
    "El Euro se sustenta en la aplicación de políticas económicas sólidas en la zona del euro y en los esfuerzos en curso para completar la unión económica y monetaria (UEM), la unión bancaria y la unión de los mercados de capitales.",
    "BRL  es una abreviatura que representa al Real Brasileño ($R), la moneda nacional oficial. Fue introducido en 1994 y anclado al Dólar Estadounidense",
  ];

  const getDolares = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dolar");
      setDolares(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDolares();
  }, []);

  const setterStates = (index) => {
    setShowTooltip(true);
    setIndexDolar(index);
  };

  const resetStates = () => {
    setShowTooltip(false);
    setIndexDolar("");
  };

  return (
    <div className="xl:max-w-screen-xl xl:mx-auto lg:max-w-screen-lg lg:mx-auto md:max-w-screen-md md:mx-auto mx-10 mt-20 ">
    <h1 className="text-5xl text-gray-400 font-extrabold py-4">Dolar hoy</h1>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2  gap-2 my-2 ">
        {dolares &&
          dolares.map((dolar, index) => {
            return (
              <div key={index} className="w-full py-4  text-2xl  border border-cyan-500 bg-slate-100   ">
                <div
                  className="stat-title  font-bold cursor-pointer border-b border-cyan-700 "
                  onMouseEnter={() => setterStates(index)}
                  onMouseLeave={() => resetStates()}
                >
                  {dolar.nombre}
                  {showTooltip && indexDolar === index && (
                    <div className="absolute  left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs p-2 rounded sm:whitespace-nowrap   ">
                      {tooTexts[indexDolar]}
                    </div>
                  )}
                </div>
                <hr />
                <div className="grid grid-cols-2">
                  <div className=" border-r border-cyan-700 text-gray-400">
                    <div className="stat-title font-bold">Compra</div>
                    <div className="stat-value ">${dolar.compra ? dolar.compra : "-"}</div>
                  </div>

                  <div className=" border-l text-gray-400">
                    <div className="stat-title font-bold">Venta</div>
                    <div className="stat-value">${dolar.venta}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dolar;
