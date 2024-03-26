import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import FormEmaIlPasswordInput from "./FormEmaIlPasswordInput";
import RememberMeAndForgotPassword from "./RememberMeAndForgotPassword";

const schema = yup.object().shape({
  email: yup.string().email("email invalido"),
  password: yup.string().min(8),
});

const Login = () => {
  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        await hadnlerSubmitLogin(values);
      },
      validationSchema: schema,
    });

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handlerCheckBoxChange = () => {
    setRememberMe(!rememberMe);
    window.localStorage.setItem("checkRemember", !rememberMe);
  };

  useEffect(() => {
    const rememberMeValue =
      JSON.parse(window.localStorage.getItem("checkRemember")) == true;
    const savedEmail =
      JSON.parse(window.localStorage.getItem("rememberEmail")) || null;
    setRememberMe(rememberMeValue);
    values.email = savedEmail;
  }, []);

  useEffect(() => {
    const login = JSON.parse(window.localStorage.getItem("login"));
    console.log(login);
    return login ? navigate("/") : navigate("/login");
  }, [navigate]);

  const hadnlerSubmitLogin = async (values) => {
    try {
      if (values.email.length < 1 && values.password.length < 1) {
        // Mostrar mensaje al usuario para llenar los campos correctamente
        Swal.fire({
          title: "Incomplete Fields",
          text: "All fields are required",
          icon: "error",
          button: "ok",
          });
          setMessage("Please fill in all fields correctly.");
          return;
      }
      const response = await axios.post("/usuario/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        if (
          JSON.parse(
            window.localStorage.getItem("checkRemember", !rememberMe)
          ) == true
        ) {
          window.localStorage.setItem(
            "rememberEmail",
            JSON.stringify(values.email)
          );
        } else {
          window.localStorage.removeItem("rememberEmail");
        }
        dispatch(setLogin(response.data.succe));
        window.localStorage.setItem("login", true);
        window.localStorage.setItem(
          "userId",
          JSON.stringify(response.data.userId)
        );

        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops, an error occurred",
        text: error.response.data.message,
        icon: "error",
        button: "accept",
        })
     
    }
  };

  const handleGoogleAuth = () => {
    window.localStorage.removeItem("checkRemember");
    window.localStorage.removeItem("rememberEmail");
    window.location.href = "http://localhost:3002/usuario/auth/google";
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/logo.jpeg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-extrabold mb-4">Login</h1>
        <FormEmaIlPasswordInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
          touched={touched}
          errors={errors}
          message={message}
          btnTitle={"Login"}
        >
          <RememberMeAndForgotPassword
            handlerCheckBoxChange={handlerCheckBoxChange}
            rememberMe={rememberMe}
          />
        </FormEmaIlPasswordInput>
        <div className="mb-3">
          <button
            onClick={handleGoogleAuth}
            // href="http://localhost:3002/usuario/auth/google"
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
          <span className="text-sm text-gray-400 font-bold">
            Dont have account?{" "}
          </span>
          <a href="/SingUp" className="text-sm font-extrabold text-purple-700">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
