import { categories } from "../../helpers/dataFiltrosNoticias.js";
import NewsSubscription from "../NewsSubscription/NewsSubscription.jsx";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-100 px-6 py-12 lg:px-20 lg:py-16">
    <div className="flex flex-wrap justify-between">
      <section className="w-full lg:w-1/4 py-2 my-2">
        <h6 className="font-semibold text-gray-800 mb-4">Get Informed</h6>
        <ul className="flex justify-around">
          <li>
            <a href="/clima" className="block text-gray-600 hover:text-blue-500 py-1">
            Weather
            </a>
          </li>
          <li>
            <a href="/FullNews?dolar=dolar&categoria=finance" className="block text-gray-600 hover:text-blue-500 py-1">
              Dollar
            </a>
          </li>
       
        </ul>
      </section>

      <section className="w-full lg:w-1/4">
        <h6 className="font-semibold text-gray-800 mb-4">Sections</h6>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {categories &&
            categories.map((category, index) => {
              return (
                <li key={index}>
                  <a href={`/FullNews?categoria=${category}`} className="block text-gray-600 hover:text-blue-500 py-1">
                    {category}
                  </a>
                </li>
              );
            })}
        </ul>
      </section>

      <section className="w-full lg:w-1/4 py-2 my-2">
        <h6 className="font-semibold text-gray-800 mb-4">My Networks</h6>
        <ul className="flex justify-around">
          <li>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Git Hub
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Linkedin
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Slack
            </a>
          </li>
        </ul>
      </section>
    </div>
    <NewsSubscription/>
  </footer>
  );
};

export default Footer;
