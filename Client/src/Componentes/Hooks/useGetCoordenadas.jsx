import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchLocalizacion = async (debouncedInput, setInputCiudad, actualizarDatosZona, state) => {
    try {
      if (debouncedInput) {
        const response = await axios.get(
          `/clima/localizacion?cityName=${debouncedInput}&codigoDeEstado=${state?.datosZona?.codigoDeEstado}&codigoDePais=AR`
        );
        if (response.data) {
          console.log(response.data);
          setInputCiudad(response.data);
          // return response.data; // Asegúrate de devolver datos válidos
        }
       return ; // Puedes ajustar esto según tu lógica
      }
  
      if (!debouncedInput) {
        console.log(state.datosZona);
        const response = await axios.get(
          `/clima/localizacion?cityName=${state?.datosZona?.ciudad}&codigoDeEstado=${state?.datosZona?.codigoDeEstado}&codigoDePais=AR`
        );
  
        if (response.data) {
          console.log(response.data);
          return response.data[0]; // Asegúrate de devolver datos válidos
        }
        return response.data; // Puedes ajustar esto según tu lógica
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const useGetCoordenadas = (
    debouncedInput,
    setInputCiudad,
    actualizarDatosZona,
    state,
    handlerDatosCoordenadas
  ) => {
    const coordenadasQuery = useQuery({
      queryKey: ["getCoordenadasClima", debouncedInput, state?.datosZona,actualizarDatosZona,handlerDatosCoordenadas],
      queryFn: () =>
        searchLocalizacion(
          debouncedInput,
          setInputCiudad,
          actualizarDatosZona,
          state
        ),
   
    });
    return coordenadasQuery;
  };