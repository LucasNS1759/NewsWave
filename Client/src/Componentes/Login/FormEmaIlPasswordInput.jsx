

const FormEmaIlPasswordInput = ({handleBlur,handleChange,handleSubmit,values,touched,errors,message,children,btnTitle}) => {
  return (
    <form>
    {/* <!-- Email Input --> */}
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-xl font-bold text-black"
      >
        email
      </label>
      <input
        placeholder="Escriba su Email..."
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
      <label
        htmlFor="password"
        className="block text-xl  font-bold text-black"
      >
        Password
      </label>
      <input
        placeholder="Indique su Contraseña..."
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
    {children ? children : null}
    {/* <!-- Login Button --> */}
    <button
      type="submit"
      // onClick={onClickSignUp}
      onClick={handleSubmit}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
    {btnTitle}
    </button>
  </form>
  )
}

export default FormEmaIlPasswordInput