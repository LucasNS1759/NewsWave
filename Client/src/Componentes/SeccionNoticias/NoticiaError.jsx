const NoticiaError = () => {
  return (
    <div className="h-screen col-span-4 relative to-indigo-500 rounded-md flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/8e/4d/be/8e4dbe2aecba57d88b8837492699826a.gif')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="ml-20 w-80 relative z-10">
        <h2 className="text-white text-4xl">error al buscar la noticia</h2>
        <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
          tu mama
        </p>
      </div>
    </div>
  );
};

export default NoticiaError;
