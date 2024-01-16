import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handlerOnchangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const hadnlerSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      // const response =
      const response = await axios.post("http://localhost:3001/usuario/login", {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setLogin(response.data.succe));
        window.localStorage.setItem("login", true);
        window.localStorage.setItem(
          "userId",
          JSON.stringify(response.data.userId)
        );

        navigate("/HomeNoticia");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3001/usuario/auth/google";
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/logo.jpeg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form>
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="text"
              //   id="email"
              placeholder="escriba su Email..."
              name="email"
              onChange={handlerOnchangeData}
              value={data?.email}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlerOnchangeData}
              placeholder="Escriba su Contraseña..."
              value={data.password}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* <!-- Remember Me Checkbox --> */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>
          {/* <!-- Forgot Password Link --> */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* <!-- Login Button --> */}
          <button
            onClick={(e) => hadnlerSubmitLogin(e)}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <div className="mb-3">
          <button onClick={handleGoogleAuth}
            // href="http://localhost:3001/usuario/auth/google"
            className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md"
          >
            <img
              className="w-5 mr-2"
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            />
            Sign in with Google
          </button>
        </div>
        <div className="text-center">
          <span className="text-xs text-gray-400 font-semibold">
            Dont have account?
          </span>
          <a href="/SingUp" className="text-xs font-semibold text-purple-700">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
