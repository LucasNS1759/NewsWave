import axios from "axios";
import { useEffect, useState } from "react";
import { toolTexts } from "../../helpers/toolArray.js"

const Dolar = () => {
  const [dolares, setDolares] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [indexDolar, setIndexDolar] = useState("");

  const getDolares = async () => {
    try {
      const response = await axios.get("/dolar");
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
                      {toolTexts[indexDolar]}
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
