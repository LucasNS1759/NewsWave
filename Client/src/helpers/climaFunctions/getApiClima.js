import axios from "axios";

export const getClima = async (latitud, longitud) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/clima/extendido?latitude=${latitud}&longitude=${longitud}`
    );
     return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};
