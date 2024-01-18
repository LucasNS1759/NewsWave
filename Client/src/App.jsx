import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Detail from "./Componentes/Detail/Detail";
import FormActivities from "./Componentes/FormActivities/FormActivities";
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
import Paises from "./Componentes/Paises/Paises";
import SeccionClima from "./Componentes/Clima/SeccionClima";

//Instancia de axios para Render.
axios.defaults.baseURL = "https://mundo-noticia.onrender.com";

//Instancia de axios para trabajo local:
// axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const location = useLocation();
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
      {
        location.pathname !== "/login" &&
        location.pathname !== "/SingUp" && <Nav />}

      <Routes>
        <Route path="/" element={<HomeNoticias />} />
        <Route path="/HomeNoticia?" element={<HomeNoticias />} />
        <Route path="/paises" element={<Paises />} />
        <Route path="/clima" element={<SeccionClima />} />
        <Route path="/Detalle/:id" element={<Detail />} />
        <Route path="/addNewActivity" element={<FormActivities />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SingUp" element={<SingUp />} />
        <Route path="/FullNews?" element={<FullNews />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
