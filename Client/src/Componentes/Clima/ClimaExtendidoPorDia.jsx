

const ClimaExtendidoPorDia = ({climaActual,pronosticoCorto,carga,setClimaActualHandler,openModal}) => {
  return (
    <div className=" flex mx-auto">
    <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
      <div className="flex justify-between w-64 mb-4 ">
        <div className="w-auto font-bold uppercase text-90">
          State
        </div>
        <div className="w-auto text-right">
          {" "}
          {climaActual
            ? climaActual?.estado
            : pronosticoCorto[0]?.estado}
        </div>
      </div>
      <div className="flex justify-between w-64 mb-4">
        <div className="w-auto font-bold uppercase text-90">
          Humidity
        </div>
        <div className="w-auto text-right">
          {climaActual
            ? climaActual?.humedad
            : pronosticoCorto[0]?.humedad}
        </div>
      </div>
      <div className="flex justify-between w-64 mb-8 ">
        <div className="w-auto font-bold uppercase text-90">
          Wind
        </div>
        <div className="w-auto text-right">
          {climaActual
            ? climaActual?.viento
            : pronosticoCorto[0]?.viento}
        </div>
      </div>

      <div className="flex flex-row">
        {pronosticoCorto &&
          !carga &&
          pronosticoCorto.map((dia, index) => {
            return (
              <div
                onClick={() => setClimaActualHandler(index)}
                key={index}
                className={`flex flex-col w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 cursor-pointer mx-1 px-2 mb-2 lg:mb-0 ${
                  dia.dia === climaActual.dia
                    ? "bg-gray-100 text-black"
                    : "bg-gray-900 text-white"
                } rounded-lg pb-4`}
              >
                <div className="">
                  <img className="w-10 mx-auto"></img>
                </div>
                <div className="text-center">
                  <b className="font-normal">{dia.dia}</b>
                  <br />
                  <strong className="text-xl">{dia.tempMax}</strong>
                  <p className="text-xs text-gray-500">
                  Feeling <br /> Ends  {dia.sensacionTermica}
                  </p>
                </div>
                <div className="w-full place-items-end border-t-2 border-gray-100 mt-2">
                  <button
                    onClick={openModal}
                    className="text-indigo-600 text-xs font-medium focus:outline-none"
                  >
                    Hourly  <br />
                    forecast
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  </div>
  )
}

export default ClimaExtendidoPorDia