import Cards from "../Cards/Cards.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice.js";
import HeroNavBar from "../HeroNavBar/HeroNavBar.jsx";
import FiltroDePaises from "../Filtros/FiltroDePaises.jsx";
import Maps from "../Maps/Maps.jsx";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const login = new URLSearchParams(location.search).get("login");

  useEffect(() => {
    if (login) {
      dispatch(setLogin("true"));
      window.localStorage.setItem("login", login);
    }
    return;
  }, [dispatch, login]);

  return (
    <div className="relative">
      {/*  */}

      <section>
        <HeroNavBar />
      </section>
      {/*  */}
      <div className=" italic bg-gray-200 font-semibold text-3xl text-center p-5 pt-24 text-gray-800">
        Explora Datos y estadisticas de los Paises
      </div>

      <section>
        <div className="bg-gray-100 sm:grid grid-cols-5  px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
          <FiltroDePaises />

          <div className="h-screen col-span-4  bg-gradient-to-tr from-indigo-800 to-indigo-500 rounded-md flex items-center">
            <Cards />
          </div>
        </div>
      </section>

      {/* Page content here */}

      {/* {<Cards />} */}

      <div className=" py-28 w-full scree border grid md:grid-cols-2 bg-gray-200 text-gray-800">
        <div className="subsec flex-none overflow-hidden max-h-96">
          <img
            className="w-full"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*"
            alt=""
          />
        </div>
        <div className="subsec my-auto p-8">
          <div className="title font-semibold text-3xl mb-5">
            What is paleo pizza crust made out of?
          </div>
          <div className="desc text-lg">
            Weve seen it all kinds of ways, with different types of flours, but
            we settled on almond flour for its nutty flavor. We also mix in
            spices—Italian seasoning and garlic powder—to give it more flavor.
            We skip yeast because it can be a pain and instead incorporate eggs
            and olive oil. The eggs help make the crust fluffy.
          </div>
        </div>
      </div>

      <div className="heading_section bg-red-600 text-gray-300">
        <div className="footer w-5/6 mx-auto text-center">
          <div className="sub flex-1 p-8">
            <div className="text-3xl mb-3 uppercase">Contact Us</div>
            <div className="info">
              <div className="name">Pizza Parlour</div>
              <div className="name text-sm">
                Street 4996 Brown Bear Drive <br />
                City Mira Loma State CA State Full California <br />
                Zip Code 91752 <br />
                Phone Number 951-634-4557 <br />
                Mobile Number 951-903-8940
              </div>
            </div>
          </div>
          <div className="sub flex p-5 w-5/6 mx-auto border-t">
            <div className="cursor-pointer hover:underline items mx-auto">
              Our Parterners
            </div>
            <div className="cursor-pointer hover:underline items mx-auto">
              Policy
            </div>
            <div className="cursor-pointer hover:underline items mx-auto">
              Facilities
            </div>
            <div className="cursor-pointer hover:underline items mx-auto">
              Developer
            </div>
          </div>
        </div>
      </div>
      <Maps/>
    </div>
  );
};

export default Home;
