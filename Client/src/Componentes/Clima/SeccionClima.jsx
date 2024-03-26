import ClimaActual from "./ClimaActual"
import ClimaFiltro from "./ClimaFiltro"
import SeccionClimaExtendido from "./SeccionClimaExtendido"


const SeccionClima = () => {
  return (
    <div className="mt-20 mb-4 flex flex-col mx-2">
     <ClimaFiltro />
     {/* <ClimaActual /> */}
    <SeccionClimaExtendido/>
    </div>
  )
}

export default SeccionClima