import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert2";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "The password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])/,
      "The password must contain at least 1 uppercase letter and 1 number."
    )
    .required("The password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "The passwords do not match.")
    .required(
      "You must confirm your password."),
});

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get("userId");
  const resetPasswordToken = new URLSearchParams(location.search).get(
    "resetToken"
  );
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit: async (values) => {
        await onclickChangePassword(values);
      },
      validationSchema: schema,
    });

  //   const checkResetToken = async () => {
  //     console.log(resetPasswordToken);
  //     try {
  //       if (userId && resetPasswordToken) {
  //         const response = await axios.get(
  //           `/usuario/resetPassword?resetTokenActive=${resetPasswordToken}`
  //         );

  // console.log(response)

  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         swal
  //           .fire({
  //             title: "Permiso denegado",
  //             text: error.response.data.message,
  //             icon: "warning",
  //             button: "entiendo",
  //           })
  //           .then(() => {
  //             navigate("/login");
  //           });
  //       }
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    if (!userId && !resetPasswordToken) {
      navigate("/login");
      return;
    }
  }, [navigate, resetPasswordToken, userId]);

  // useEffect(() => {
  //   checkResetToken();
  // }, []);

  const onclickChangePassword = async () => {
    try {
      const response = await axios.put(
        `/usuario/changePassword?resetToken=${resetPasswordToken}`,
        {
          userId,
          newPassword: values.password,
          withCredentials: true,
        }
      );
      if (response.data) {
        swal
          .fire({
            title: "Cambio de contraseña ",
            text: "actualizo su contraseña con exito",
            icon: "success",
            button: "aceptar",
          })
          .then(() => {
            navigate("/login");
          });
      }
    } catch (error) {
      console.log(error);
      swal.fire({
        title: error.response.statusText,
        text: error.response.data.error,
        icon: "warning",
        button: "aceptar",
      });
      navigate("/login");
    }
  };

  return (
    <section className="grid h-screen place-content-center  ">
      <div className="mb-10 text-center ">
        <h1 className="text-3xl font-bold tracking-widest">
        Change Password
        </h1>
        <p>
          <span className="font-bold">Password</span> and{" "}
          <span className="font-bold">Confirm</span> validation.
        </p>
      </div>
      <form className="flex flex-col items-center justify-center space-y-6">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
          className="w-80 appearance-none rounded-full border-0  p-2 px-4  focus:ring-2 focus:ring-orange-500"
        />
        <p
          id="validation"
          className="text-center text-orange-500 italic text-sm"
        >
          {" "}
          {touched.password && errors.password ? (
            <span>{errors.password}</span>
          ) : null}
        </p>

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={values.confirmPassword}
          onBlur={handleBlur}
          className="w-80 appearance-none rounded-full border-0  p-2 px-4  focus:ring-2 focus:ring-orange-500"
        />
        <p
          id="validation"
          className="text-center text-orange-500 italic text-sm"
        >
          {touched.confirmPassword && errors.confirmPassword ? (
            <span>{errors.confirmPassword}</span>
          ) : null}
        </p>

        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
        >
          Change Password
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
