import { useState } from "react";
import axios from "axios";

const SingUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlerOnchangeUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  
  const onclickSingUp = async  (e) => {
  e.preventDefault()
  
  try {
    const response = await axios.post("/usuario/singUp",{
    email: user.email,
    password: user.password
    })
    console.log(response )
  } catch (error) {
    console.log(error)
  }
  
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="logo3.jpeg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Sing Up</h1>
        <form>
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
            onChange={handlerOnchangeUser}
              type="text"
              id="username"
              name="email"
              value={user.email}
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
            onChange={handlerOnchangeUser}
              type="password"
              id="password"
              name="password"
              value={user.password}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          {/* <!-- Login Button --> */}
          <button
          onClick={onclickSingUp}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Sing Up
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center">
          <h1>Have a count? </h1>
          <a href="/login" className="hover:underline">
            Login up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
