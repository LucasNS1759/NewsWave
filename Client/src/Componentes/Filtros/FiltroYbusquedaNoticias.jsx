const FiltroYbusquedaNoticias = ({
  querys,
  onchangeSearch,
  categories,
  languages,
  handlerCategorias,
  handlerLenguajes,
}) => {
  return (
    <div className="h-96 col-span-1 ">
      <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
        <input
          type="text"
          name="keyWords"
          value={querys && querys.keyWords}
          onChange={onchangeSearch}
          placeholder="seach"
          className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
        />
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>
      <div className="bg-white  rounded-md">
        <h1 className="text-center text-xl my-2  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-gray-600">
          Filtre y Busque
        </h1>

        <div className="bg-white rounded-md list-none  text-center ">
          <li>
            <details>
              <summary className="text-center text-xl   bg-white py-3  rounded-md border-b-2 cursor-pointer  text-gray-600">
                Categorias
              </summary>
              <ul>
                {categories &&
                  categories.map((categoria, index) => {
                    return (
                      <option
                        onClick={handlerCategorias}
                        value={categoria}
                        key={index}
                        className="cursor-pointer"
                      >
                        <a
                          href="#"
                          className="list-none  hover:text-indigo-600"
                        >
                          {categoria}
                        </a>
                      </option>
                    );
                  })}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-center text-xl   bg-white py-3  rounded-md border-b-2 cursor-pointer  text-gray-600">
                Lenguajes
              </summary>
              <ul>
                {languages &&
                  Object.keys(languages).map((key, index) => {
                    return (
                      <option
                        className="cursor-pointer"
                        onClick={handlerLenguajes}
                        key={index}
                        value={languages[key]}
                      >
                        {key}
                      </option>
                    );
                  })}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-center text-xl   bg-white py-3  rounded-md border-b-2 cursor-pointer  text-gray-600">
                Categorias
              </summary>
              <ul>
                <li className=" border-b-2">
                  <a href="#" className="list-none  hover:text-indigo-600">
                    Models
                  </a>
                </li>
              </ul>
            </details>
            {/* <a href="#" className="list-none  hover:text-indigo-600">
            Products
          </a> */}
          </li>
        </div>
      </div>
    </div>
  );
};

export default FiltroYbusquedaNoticias;
