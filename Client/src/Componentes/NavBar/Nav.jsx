import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../SideBar/SideBar";

axios.defaults.withCredentials = true;

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    url.searchParams.delete('login');
    url.searchParams.delete('userId');
  
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
  
    <header>
      {/* <!-- navbar and menu --> */}
      <nav  className={`fixed top-0 font-extrabold z-50 navbar w-full transition-colors   duration-500 ${
          isScrolled ? "bg-slate-100 " : "bg-transparent border-b "
        }`}>
        <div className="flex justify-between items-center py-6 px-10 container mx-auto">
       
          <div className="  w-14">
            <img
              className="w-full rounded-full"
              src="/logo.jpeg"
              alt=""
            />
            {/* VER COMO MIERDA METO ABAJO DEL LOGO */}
          {/* <Clima/> */}
          </div>


      <a href="/" className="text-5xl font-bold text-center text-gray-700 dark:text-white xl:ml-72 ">Mundo Noticia</a>
      
         
            <div className="hover:cursor-pointer sm:hidden">
              <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
              <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
              <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
            </div>
            
            <div className="flex items-center">
             
              <ul className="sm:flex space-x-4 hidden items-center">
              <li>
              <SideBar/>
              </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-700 hover:text-indigo-600 text-md "
                  >
                    Home
                  </a>
                </li>
            
            
                <li>
                  <a
                    href="/addNewActivity"
                    className="text-gray-700 hover:text-indigo-600 text-md "
                  >
                    Crear Actividad
                  </a>
                </li>
             
              </ul>

              <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
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
                    className="ext-text-gray-600  py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600 hover:shadow-lg"
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
