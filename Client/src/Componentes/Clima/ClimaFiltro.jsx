import { useEffect, useState } from "react";
import { provincias } from "../../helpers/provincias";
import { useDispatch, useSelector } from "react-redux";
import { actualizarDatosZona, actualizarCoordenadas } from "../../redux/clima";
import { useGetCoordenadas } from "../Hooks/useGetCoordenadas";

const ClimaFiltro = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.climaSlice);
  const [input, setInput] = useState("");
  const [debouncedInput, setDeboundedInput] = useState("");
  const [inputCiudad, setInputCiudad] = useState("");
  const [indexCiudad, setIndexCiudad] = useState("");

  const onchangeInput = (e) => {
    setInput(e.target.value);
  };

  const handlerDatosCoordenadas = (e) => {
    dispatch(
      actualizarDatosZona({
        codigoDeEstado: provincias[e.target.value].codigoDeEstado,
        ciudad: provincias[e.target.value].provincia,
      })
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeboundedInput(input);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [input]);

  // mutacion de estado de redux en coordenadas por ende se dispara una nueva petucion en componente <SeccionClimaExtendido/> y en consecuencia se actualiza una nueva zona con el clima extendido (inputciudad es producto de la busqueda hecha en la searchbar )
  const handlerLocalizacion = (index) => {
    setIndexCiudad(index);
    // dispatch(
    //   actualizarCoordenadas({
    //     latitud: inputCiudad && inputCiudad[index].lat,
    //     longitud: inputCiudad && inputCiudad[index].lon,
    //   })
    // );
    dispatch(
      actualizarDatosZona({
        codigoDeEstado: state.datosZona.codigoDeEstado,
        ciudad: inputCiudad[index].name,
      })
    );
    setDeboundedInput("");
    setInputCiudad("");
    setInput("");

    return;
  };

  // el hook tiene todo lo necesario para poder realizar nuevas busquedas ya sea a travez del select option o busqueda por search a trabes de deboucedInput(una vez buscada las zonas despacha la accion correspondiente para actualizar el estado de redux de coordenadas disparando el evento para actualizar el clima en <SeccionClimaExtendido/>)
  const coodernadasQuery = useGetCoordenadas(
    debouncedInput,
    setInputCiudad,
    actualizarDatosZona,
    state,
    handlerDatosCoordenadas
  );

  console.log(coodernadasQuery.data);
  useEffect(() => {
  
    // if (!coodernadasQuery.data) {
    if (
      debouncedInput &&
      coodernadasQuery.data &&
      !coodernadasQuery.isLoading
    ) {
      dispatch(
        actualizarDatosZona({
          codigoDeEstado: state.datosZona.codigoDeEstado,
          ciudad: coodernadasQuery.data[indexCiudad]?.name,
        })
      );
      dispatch(
        actualizarCoordenadas({
          latitud: coodernadasQuery.data[indexCiudad]?.lat,
          longitud: coodernadasQuery.data[indexCiudad]?.lon,
        })
      );
    }

    if (
      !debouncedInput &&
      coodernadasQuery.data &&
      !coodernadasQuery.isLoading
    ) {
      dispatch(
        actualizarDatosZona({
          codigoDeEstado: state.datosZona.codigoDeEstado,
          ciudad: coodernadasQuery.data?.name,
        })
      );
      dispatch(
        actualizarCoordenadas({
          latitud: coodernadasQuery.data?.lat,
          longitud: coodernadasQuery.data?.lon,
        })
      );
    }
    // }

    return;
  }, [
    coodernadasQuery.data,
    coodernadasQuery.isLoading,
    dispatch,
    state.datosZona.codigoDeEstado,
    debouncedInput,
    indexCiudad,
  ]);

  return (
    <>
      <select
        onChange={(e) => handlerDatosCoordenadas(e)}
        className="select mt-40 select-info w-full max-w-xs my-2"
      >
        <option disabled selected>
          selecciones una provincia
        </option>
        {provincias &&
          provincias.map((provincia, index) => {
            return (
              <option value={index} key={index}>
                {provincia.provincia}
              </option>
            );
          })}
      </select>
      <input
        onChange={(e) => onchangeInput(e)}
        type="text"
        value={input}
        placeholder="Type here"
        className="input input-ghost w-full max-w-xs  "
      />
      {input && (
        <div className="flex absolute z-40 " style={{ marginLeft: "35%" }}>
          <div className="px-4 sm:px-8 max-w-5xl m-auto ">
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              {inputCiudad &&
                inputCiudad.map((zona, index) => {
                  return (
                    <li
                      onClick={() => handlerLocalizacion(index)}
                      key={index}
                      className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      {zona.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ClimaFiltro;
