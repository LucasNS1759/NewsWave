import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calificacion from "../Calificacion/Calificacion";

import StatsReview from "../Review/StatsReview";
import Reviews from "../Review/Reviews";
import InfoDetailPaises from "./InfoDetailPaises";

const Detail = () => {
  const { id } = useParams();
  const [detailCountrie, setDetailCountrie] = useState(null);
  const [monedas, setMonedas] = useState(null);

  useEffect(() => {
    fetch(`/countries/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetailCountrie(data);
        setMonedas(Object.entries(data?.moneda));
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setDetailCountrie(null);
    };
  }, [id]);

  console.log(detailCountrie && detailCountrie.latitud[0]);

  const moreInfo = () => {
    return `https://en.wikipedia.org/wiki/${detailCountrie.nombreOficial}`;
  };

  return (
    // <!-- component -->
    <section className="bg-white dark:bg-gray-900 mt-32">
      <InfoDetailPaises
        detailCountrie={detailCountrie && detailCountrie}
        monedas={monedas && monedas}
      />

      <StatsReview />
      <Reviews />
    </section>
  );
};

export default Detail;
