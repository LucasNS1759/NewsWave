import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Clima = () => {
  const [location, setLocation] = useState(null);
  const [ubicacion, setUbicacion] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const state = useSelector((state) => state.climaSlice.coordenadas);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
      setUbicacion(true);
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    console.log(ubicacion, location);
    if (location && ubicacion) {
      axios
        .get(
          `/clima?latitude=${location?.latitude}&longitude=${location?.longitude}`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error.message);
        });
      return;
    } else if (!ubicacion && location === null) {
      axios
        .get(
          `/clima?latitude=${state.latitud}&longitude=${state.longitud}`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error.message);
        });
    }
  }, [location, ubicacion]);

  return (
    <div>
      {/* {location && (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        )} */}

      {weatherData && (
        <div className=" inline-flex gap-2">
          <img
            className="w-6 h-6 inline mr-1"
            src={
              weatherData &&
              `https://openweathermap.org/img/w/${weatherData.weather[0]?.icon}.png`
            }
            alt=""
          />
          <p>{weatherData.main.temp}°C</p>
          <h2> {" " + weatherData.name}</h2>
          {/* <p>Description: {weatherData.weather[0].description}</p> */}
          {/* Agrega más detalles del tiempo según la estructura de datos proporcionada por el servicio */}
        </div>
      )}
    </div>
  );
};
export default Clima;
