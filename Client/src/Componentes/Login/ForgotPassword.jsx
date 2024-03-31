import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";

const schema = yup.object().shape({
  email: yup.string().email("el formato no corresponde a un email"),
});

const ForgotPassword = () => {
  const { handleBlur, handleChange, handleSubmit, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: async (values) => {
        await onclickVerifyEmailExistInBdd(values);
      },
      validationSchema: schema,
    });


 
 useEffect(()=>{
  values.email = JSON.parse(window.localStorage.getItem("rememberEmail")) || ""
 },[])

  const onclickVerifyEmailExistInBdd = async (values) => {
    try {
      if (!values.email) {
        Swal({
          title: "Empty Field",
          text: "Please fill in the field with a valid email address to reset your password",
          icon: "error",
          button: "ok",
        });
        return;
      }

      const response = await axios.post("/usuario", {
        email: values.email,
      });
      console.log(response.data)
      if (response.status === 200) {
        Swal.fire({
          title: "Password Change Requested",
          text: `Please check your email ${values.email} and click on the link to change your password. You have 5 minutes to change your password.`,
          icon: "info",
          timer: 1000 * 60 * 5, // Duración del temporizador en milisegundos (en este caso, 5 segundos)
          getTimerLeft : 1000 * 60 * 5,
          timerProgressBar: true, // Muestra una barra de progreso del temporizador
          allowOutsideClick: false, // Impide que el usuario cierre la alerta haciendo clic fuera de ella
          showConfirmButton: false,
          customClass: {
            timerProgressBar: "h-4 mb-1 mx-1", // Personaliza el color de la barra de progreso
            
           
          },
        });
       await axios.post("/usuario/sendEmailResetPassword", {
          email: values.email
        });
      
      }

    
    } catch (error) {
    
      Swal.fire({
        title: "oops there was an error",
        text: error.response.data.error,
        showConfirmButton: true,
       
      });
      console.log(error);
    }
  };

  return (
    // <!-- component -->
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6 jus">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <br />
              <label
                className="modal-backdrop cursor-pointer underline"
                htmlFor="my_modal_7"
              >
                Login here
              </label>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Escriba su Email..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p className=" text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
