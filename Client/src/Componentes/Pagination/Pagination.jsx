import { useDispatch, useSelector } from "react-redux";
import { actualizarPagina } from "../../redux/querysSlice";

const Pagination = ({ totalDePaginas }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.querySlice);

  const handlerNextPage = () => {
    if (state.pagina == totalDePaginas) return;
    if (state.pagina != null) {
      dispatch(actualizarPagina(parseInt(state?.pagina) + 1));
    }
    return;
  };
  const handlerPrevPage = () => {
    if (state.pagina == 0) return;
    if (state.pagina !== null) {
      dispatch(actualizarPagina(state.pagina - 1));
    }
    return;
  };

  return (
    <div
      className="absolute flex justify-between transform -translate-y-1/2 mx-auto right-5  top-1/2"
      style={{ left: "22%" }}
    >
      <button onClick={handlerPrevPage} className="btn btn-circle">
        ❮
      </button>
      <button onClick={handlerNextPage} className="btn btn-circle">
        ❯
      </button>
    </div>
  );
};

export default Pagination;
