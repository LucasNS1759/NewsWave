import ForgotPassword from "./ForgotPassword";

const RememberMeAndForgotPassword = ({ handlerCheckBoxChange,rememberMe }) => {

  return (
    <div>
      <div className="mb-4 flex items-center">
        <input
          onChange={handlerCheckBoxChange}
          type="checkbox"
          id="remember"
          name="remember"
          checked={rememberMe}
          className="text-blue-500"
        />
        <label htmlFor="remember" className="text-gray-600 ml-2">
          Remember Me
        </label>
      </div>
      {/* <!-- Forgot Password Link --> */}
      <div className="mb-6 text-blue-500  ">
        <label className="cursor-pointer hover:underline" htmlFor="my_modal_7">
          Forgot Password?
        </label>
      </div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box">
          <ForgotPassword />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default RememberMeAndForgotPassword;
