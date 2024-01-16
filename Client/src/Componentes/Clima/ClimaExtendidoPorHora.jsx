import { useEffect, useState } from "react";

const ClimaExtendido = ({ pronostico, zona, indexClimaData }) => {
  return (
    <div className="flex flex-col h-3/4">
      <div className="overflow-x-auto overflow-y-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hiden ">
            <table className="min-w-full ">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Pronostico extendido para {zona ? zona : "Buenos Aires"}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {pronostico &&
                  pronostico[indexClimaData].map((clima, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {clima.hora}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {clima.temperatura}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          Humedad {clima.humedad}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {clima.estado}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimaExtendido;
