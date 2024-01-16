

const SubNoticias = ({category,key}) => {
  return (
    <div key={key}className="rounded w-full flex flex-col md:flex-row mb-10 text-gray-800">
              <img
                src={
                  category && category?.image == "None"
                    ? "/noticia.jpg"
                    : category?.image
                }
                className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
              />
              <a
                  href={category && category?.url}
                  target="_blank"
                  rel={"noreferrer"}
                >
              <div className="bg-white rounded px-4">
                <span className=" font-bold text-sm hidden md:block">
                  {" "}
                  
                </span>
                <div className="md:mt-0 font-black  text-xl mb-2">
                  {category ? category?.title : " "}.
                </div>
                <p className="block p-2 pl-0 pt-1 text-sm    font-bold">
                  
                
                  
                    {category ? category?.description : " "}
                 
                </p>
              </div>
              </a>
            </div>
  )
}

export default SubNoticias