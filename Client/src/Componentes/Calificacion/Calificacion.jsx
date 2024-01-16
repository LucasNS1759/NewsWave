const Calificacion = ({calificacion}) => {
console.log(calificacion)
// let flag = 5
// let estrellasVacias = new Array(5-calificacion).fill(undefined);
// let estrellasChekeadas = new Array(calificacion).fill(undefined);


return (
    <div>
      {calificacion.map((calificacion, index) => (
        <div key={index}>
          <h1>{calificacion.Nombre}</h1>
          <div className="rating">
            {Array.from({ length: calificacion?.Dificultad }).map((_, i) => (
            
              <input
                key={i}
                type="radio"
                name={`rating-${index}`}
                className="mask mask-star"
                
            
                disabled
              />
            ))}
          
          </div>
          <h1>duracion</h1>
          <span>{calificacion.Duracion}</span>
          <h1>temporada ideal</h1>
          <span>{calificacion.Temporada}</span>
        </div>
      ))}
    </div>
  );
};

export default Calificacion;
