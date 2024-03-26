import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../SideBar/SideBar";

axios.defaults.withCredentials = true;

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [login, setLogin] = useState("");
  useEffect(() => {
    const local = window.localStorage.getItem("login");
    if (local) {
      setLogin(local);
    }
  }, []);

  const removeLoginFromUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("login");
    url.searchParams.delete("userId");

    const updatedUrl = url.toString();
    window.history.replaceState({}, document.title, updatedUrl);
  };

  const handlerLogOut = async () => {
    removeLoginFromUrl();
    window.localStorage.setItem("login", false);
    window.localStorage.removeItem("userId");

    window.location.reload();
    await axios.get("/usuario/logOut", {
      withCredentials: true,
    });
  };

  return (
    // "flex justify-center text-center w-full"
    <header
      className={`fixed flex flex-col top-0 font-extrabold z-50 navbar w-full transition-colors   duration-500 ${
        isScrolled ? "bg-slate-100 " : "bg-transparent border-b "
      }`}
    >
      <a
        href="/"
        className="text-5xl flex justify-center font-bold text-center text-gray-700 dark:text-white  "
      >
        NewsWave
      </a>
      {/* <!-- navbar and menu --> */}
      <nav>
        <div className="flex justify-center items-center  px-10  container mx-auto">
          <div className="flex items-center">
            <ul className="flex space-x-4 py items-center">
              <li>
                <SideBar />
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-700 hover:text-indigo-600 text-md "
                >
                  Home
                </a>
              </li>
            </ul>

            <div className=" items-center  space-x-4 ml-8 ">
              {login && login == "false" && (
                <a
                  href="/login"
                  className="text-text-gray-600  py-2 hover:cursor-pointer hover:text-indigo-600"
                >
                  Login
                </a>
              )}
              {login && login == "true" && (
                <div
                  onClick={handlerLogOut}
                  className="text-text-gray-600  py-2 hover:cursor-pointer hover:text-indigo-600"
                >
                  LogOut
                </div>
              )}

              {!login && (
                <a
                  href="/SingUp"
                  className="text-text-gray-600  py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600 hover:shadow-lg"
                >
                  SIGNUP
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* NAV ////////////////////////////////////////////// */}
    </header>
  );
};

export default Nav;

