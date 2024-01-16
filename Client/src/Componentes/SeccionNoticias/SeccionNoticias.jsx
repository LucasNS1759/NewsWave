const SeccionNoticias = ({
  data,
  noticiaActual,
  handlerAnterior,
  handlerSiguiente,
}) => {
  return (
    <div className="h-screen col-span-4 relative to-indigo-500 rounded-md flex items-center">
      {data && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              data && noticiaActual[0]?.image === "None"
                ? "url('https://img.freepik.com/vector-gratis/grafico-tierra-3d-que-simboliza-ilustracion-comercio-mundial_456031-131.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph')"
                : `url(${noticiaActual[0]?.image})`,
            //   backgroundSize: "cover",
            //   backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <div className="ml-20 w-80 relative z-10">
        <h2 className="text-white text-4xl">
          {noticiaActual && noticiaActual[0].title}
        </h2>
        <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
          {noticiaActual && noticiaActual[0].description}
        </p>

        <a
          href={noticiaActual && noticiaActual[0].url}
          target="_blank"
          rel={"noreferrer"}
          className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
        >
          Ir a la nota
        </a>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button onClick={handlerAnterior} className="btn btn-circle">
          ❮
        </button>
        <button onClick={handlerSiguiente} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  );
};

export default SeccionNoticias;
