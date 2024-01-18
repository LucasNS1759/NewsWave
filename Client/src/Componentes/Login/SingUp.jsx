import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("email invalido"),
  password: yup.string().min(8)
});

const SingUp = () => {
  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        await onClickSignUp(values);
      },
      validationSchema: schema,
    });

  const [message, setMessage] = useState(null);

  const onClickSignUp = async (values) => {
  console.log(values)
    try {
      if (values.email.length < 1 && values.password.length < 1) {
        // Mostrar mensaje al usuario para llenar los campos correctamente

        setMessage("Por favor, llena todos los campos correctamente.");
        return;
      }
      const response = await axios.post("/usuario/singUp", {
        email: values.email,
        password: values.password,
      });

      setMessage(response.data.response);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

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
          {/* <!-- Email Input --> */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              email
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="text"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {touched.email && errors.email ? <span>{errors.email}</span> : null}
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {touched.password && errors.password ? (
              <span>{errors.password}</span>
            ) : null}
          </div>
          {message && (
            <div
              className={`mt-4 ${
                message.includes("error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </div>
          )}
          {/* <!-- Login Button --> */}
          <button
            type="submit"
            // onClick={onClickSignUp}
            onClick={handleSubmit}
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
