import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert";
import FormEmaIlPasswordInput from "./FormEmaIlPasswordInput";
import RememberMeAndForgotPassword from "./RememberMeAndForgotPassword";

const schema = yup.object().shape({
  email: yup.string().email("email invalido"),
  password: yup.string().min(8),
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
    console.log(values);
    try {
      if (values.email.length < 1 && values.password.length < 1) {
        // Mostrar mensaje al usuario para llenar los campos correctamente
        Swal({
          title: "Incomplete Fields",
          text: "All fields are required",
          icon: "error",
          button: "ok",
          })
          setMessage("Please fill in all fields correctly.")
        return;
      }
      const response = await axios.post("/usuario/singUp", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data);
      Swal({
        title: response.data.response,
        text: "Click the button to go to the Login page",
        icon: "success",
        button: "ok",
      }).then(() => {
        window.location.href = "http://localhost:5174/login";
      });

      setMessage(response.data.response);
    } catch (error) {
      Swal({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
        button: "ok",
      });
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
        <h1 className="text-3xl font-extrabold mb-4">Sing Up</h1>

        <FormEmaIlPasswordInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
          touched={touched}
          errors={errors}
          message={message}
          btnTitle={"Sing up"}
        >
          
        </FormEmaIlPasswordInput>

        <div className="mt-6  text-center">
          <h1 className="font-bold text-black">Have a count? </h1>
          <a href="/login" className="hover:underline text-blue-500">
            Login up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingUp;

