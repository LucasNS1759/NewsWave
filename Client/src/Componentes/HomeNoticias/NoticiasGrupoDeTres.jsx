import { Link } from "react-router-dom";


const NoticiasGrupoDeTres = ({ noticiasGrupo,titulo,key }) => {

  return (
    <>
      <div key={key} className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
        <h2 className="font-bold text-3xl">{titulo}</h2>
        <Link
          to={`/FullNews?categoria=${titulo && titulo}`}
          className=" hover:bg-green-200 underline text-blue-500 px-3 py-1 rounded cursor-pointer"
        >
          More
        </Link>
      </div>
      <div className="block space-x-0 lg:flex md:flex lg:space-x-6">
        {noticiasGrupo &&
          noticiasGrupo?.map((noticia) => {
            return (
              <div
                key={noticia.id}
                className="rounded w-full lg:w-1/2  p-4 lg:p-0"
              >
                <img
                  src={noticia && 
                    noticia.image === "None" ? "/noticia.jpg" : noticia.image
                  }
                  className="rounded"
                  alt="technology"
                />
                <div className="p-4 pl-0">
                  <h2 className="font-bold text-2xl text-gray-800">
                    {noticia && noticia ? noticia.title : " "}.
                  </h2>
                  <p className="text-gray-700 mt-2">
                    {noticia && noticia ? noticia?.description : " "}
                  </p>

                  <a
                    href={noticia && noticia?.url}
                    target="_blank"
                    rel={"noreferrer"}
                    className="inline-block py-2 rounded underline text-blue-500 mt-2 ml-auto"
                  >
                    {" "}
                 Full News
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default NoticiasGrupoDeTres;
