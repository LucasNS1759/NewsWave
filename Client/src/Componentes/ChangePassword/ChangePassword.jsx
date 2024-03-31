import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert2";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get("userId");
  const resetPasswordToken = new URLSearchParams(location.search).get("resetToken");
  const { t } = useTranslation("global");
  
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, `${t("Component-Change-Password.schema.password")}`)
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        `${t("Component-Change-Password.schema.matches")}`
      )
      .required(`${t("Component-Change-Password.schema.password-required")}`),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        `${t("Component-Change-Password.schema.confirmPassword-oneOf")}`
      )
      .required(
        `${t("Component-Change-Password.schema.confirmPassword-required")}`
      ),
  });

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

  useEffect(() => {
    if (!userId && !resetPasswordToken) {
      navigate("/login");
      return;
    }
  }, [navigate, resetPasswordToken, userId]);

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
            title: `${t(
              "Component-Change-Password.onclickChangePassword.success-swal-fire.title"
            )}`,
            text: `${t(
              "Component-Change-Password.onclickChangePassword.success-swal-fire.text"
            )}`,
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
        button: "ok",
      });
      navigate("/login");
    }
  };

  return (
    <section className="bg-gray-100 flex flex-col justify-center items-center h-screen w-full">
      <div className="text-center ">
        <h2 className="text-3xl font-bold tracking-widest">
          {t("Component-Change-Password.h2-Change-Password.Change-Password")}
        </h2>
        <p>
          <span className="font-bold">
            {t(
              "Component-Change-Password.p-Password-and-confirm-validation.password"
            )}
          </span>{" "}
          {t("Component-Change-Password.p-Password-and-confirm-validation.and")}{" "}
          <span className="font-bold">
            {t(
              "Component-Change-Password.p-Password-and-confirm-validation.Confirm"
            )}
          </span>{" "}
          {t(
            "Component-Change-Password.p-Password-and-confirm-validation.Validation"
          )}
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          {t("Component-Change-Password.button-change-password")}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
