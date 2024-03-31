import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewsSubscription from "../NewsSubscription/NewsSubscription";
import { useTranslation } from "react-i18next";
import { categories } from "../../helpers/dataFiltrosNoticias.js";

const SideBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const { i18n, t } = useTranslation("global");
  const [checked, setChecked] = useState(() => {
    const localStorageValue = window.localStorage.getItem("languages");

    localStorageValue ? localStorageValue : "en";

    return;
  });

  const toggleChecked = () => {
    window.localStorage.setItem("languages", !checked? "en" : "es");
    setChecked(!checked);
  };
  const languaje = window.localStorage.getItem("languages");

  const handlerInputChange = (e) => {
    setInput(e.target.value);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const searchKeyword = () => {
    closeSidebar();
    setInput("");
    navigate(`/FullNews?keyWords=${input}`);
  };

  //USEeFECT Para que actue el cambio de idioma en consecuencia del cambio de dioma
  useEffect(() => {
    const localStorageValue = window.localStorage.getItem("languages");
    i18n.changeLanguage(localStorageValue == "es" ? "es" : "en");
  }, [window.localStorage.getItem("languages")]);

  return (
    <div className="flex justify-center items-center ">
      <div>
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              onClick={closeSidebar}
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            ></div>
            {/* Sidebar Content */}
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div
                className="w-screen max-w-md"
                style={{
                  transform: isSidebarOpen
                    ? "translateX(0)"
                    : "translateX(100%)",
                  transition: "transform ease-out duration-300",
                }}
              >
                <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-semibold text-black">{t("Component-Sidebar.Search")}</h2>
                    <button
                      onClick={closeSidebar}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* Search Input */}
                  <div className="mt-4 px-4">
                    <input
                      onChange={handlerInputChange}
                      value={input}
                      type="text"
                      placeholder={t("Component-Sidebar.Search News here...")}
                      className="w-2/3 p-2 border  rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 m-auto"
                    />
                    <button
                      onClick={searchKeyword}
                      className="btn btn-ghost btn-circle mx-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* TOOGLE IDIOMA */}
                  <div className=" flex flex-col items-center py-2 my-1">
                    <label htmlFor="">{t("Component-Sidebar.Language")}</label>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={window.localStorage.getItem("languages") == "es"? true : false }
                      onChange={toggleChecked}
                    />
                    <label htmlFor="">
                      {window.localStorage.getItem("languages") ===
                      "es"
                        ? "ES"
                        : "EN"}
                    </label>
                  </div>

                  <div className="mt-6 px-4">
                    <p className="ml-2 text-lg text-gray-400">{t("Component-Sidebar.News")}</p>

                    <hr />
                  </div>

                  {/* Sidebar Content */}
                  <div className="mt-4 px-4 h-full overflow-auto">
                    <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4    ">
                      {/* Add more cards as needed */}
                      {categories &&
                        categories.map((categoria, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-gray-50  hover:bg-gray-100  cursor-pointer   transition-colors duration-300 capitalize"
                            >
                              <Link
                                to={`/FullNews?categoria=${Object.keys(
                                  categoria
                                )}`}
                              >
                                <p
                                  onClick={closeSidebar}
                                  className="text-lg font-semibold  text-black"
                                >
                                  {languaje === "es"
                                    ? Object.values(categoria)
                                    : Object.keys(categoria)}
                                </p>
                              </Link>
                              {/* <p className="text-gray-600">Content for card 1.</p> */}
                            </div>
                          );
                        })}
                      <div className="bg-gray-50  hover:bg-gray-100  cursor-pointer   transition-colors duration-300">
                        <p
                          onClick={closeSidebar}
                          className="text-lg font-semibold  text-black"
                        >
                          <Link to={`/FullNews?categoria=${"last News"}`}>
                            {languaje === "es"
                              ? "Ultimas Noticias"
                              : "Last News"}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <br />
                    <hr />
                    <div className="mt-8 px-4 pb-4">
                      <Link to={"/clima"}>
                        <p
                          onClick={closeSidebar}
                          className="ml-2 text-lg  text-gray-400"
                        >
                          {t("Component-Sidebar.Weather")}
                        </p>
                      </Link>
                    </div>

                    <hr />

                    <div className="mt-8 px-4 pb-4">
                      <Link to={"/FullNews?dolar=dolar&categoria=finance"}>
                        <p
                          onClick={closeSidebar}
                          className="ml-2 text-lg text-gray-400"
                        >
                          {t("Component-Sidebar.Dollar")}
                        </p>
                      </Link>
                    </div>

                    <hr />
                  </div>
                  {/* Sidebar Footer */}
                  <NewsSubscription closeSidebar={closeSidebar} />
                </div>
              </div>
            </section>
          </div>
        )}
        {/* Your main content goes here */}
        {/* Open sidebar button */}
        <button
          onClick={openSidebar}
          className="flex justify-center items-center  text-gray-700 hover:text-indigo-600 text-md  rounded-md p-2 gap-1"
        >
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>{" "}
          {t("Component-Sidebar.Sections")}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
