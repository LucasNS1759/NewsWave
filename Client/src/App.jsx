import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./Componentes/NavBar/Nav";
import Login from "./Componentes/Login/Login";
import SingUp from "./Componentes/Login/SingUp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "./redux/userSlice";
import HomeNoticias from "./Componentes/HomeNoticias/HomeNoticias";
import FullNews from "./Componentes/HomeNoticias/FullNews";
import Footer from "./Componentes/Footer/Footer";
import axios from "axios";
import SeccionClima from "./Componentes/Clima/SeccionClima";
import ChangePassword from "./Componentes/ChangePassword/ChangePassword";
import PageNotFound from "./Componentes/404/PageNotFound";

//Instancia de axios para Render.
// axios.defaults.baseURL = "https://mundo-noticia.onrender.com";

//Instancia de axios para trabajo local:
axios.defaults.baseURL = "http://localhost:3002";

function App() {
  const dispatch = useDispatch();
  const login = window.localStorage.getItem("login");
  useEffect(() => {
    if (login !== undefined || login !== null) {
      dispatch(setLogin(login));
    }
    return;
  }, [dispatch, login]);

  return (
    <main className="flex flex-col justify-center">
      <Nav />
      <Routes>
        <Route path="/" element={<HomeNoticias />} />
        <Route path="/clima" element={<SeccionClima />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SingUp" element={<SingUp />} />
        <Route path="/FullNews?" element={<FullNews />} />
        <Route path="/resetPassword?" element={<ChangePassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
