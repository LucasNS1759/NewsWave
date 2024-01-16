import { useEffect } from "react";


const PaginationNoticias = ({
  fullNews,
  noticiaPorPagina,
  paginaActual,
  setPaginaActual,
}) => {
  const numeroDePaginas = [];

  for (let i = 1; i <= Math.ceil(fullNews && fullNews.length / noticiaPorPagina); i++) {
    numeroDePaginas.push(i);
  }
  const handlerPrev = () => {
    if (paginaActual === 1) return;
    setPaginaActual(paginaActual - 1);
    scrollToTop()
  };

  const handlerNext = () => {
    if (paginaActual === numeroDePaginas.length) return;
    setPaginaActual(paginaActual + 1);
    scrollToTop()
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const setPage = (pagina) =>{
  setPaginaActual(pagina)
  }

  // Agregar un efecto secundario para hacer scroll al montar el componente
  useEffect(() => {
    scrollToTop();
  }, [paginaActual]); // Hacer scroll cada vez que cambie la página

  return (
    <div className="bg-gradient-to-r  flex items-center justify-center ">
      <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-center">
          <nav className="flex space-x-2" aria-label="Pagination">
            <div
             onClick={handlerPrev}
              className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              Previous
            </div>
            {numeroDePaginas &&
              numeroDePaginas.map((numero) => {
                return (
                  <div
                    key={numero}
                   onClick={()=>setPage(numero)}
                    className={`relative md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700  border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 hidden ${numero === paginaActual? "bg-fuchsia-200" : "bg-white"}`} 
                  >
                    {numero}
                  </div>
                );
              })}

            <div
             onClick={handlerNext}
              className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 "
            >
              Next
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationNoticias;
