import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  setGastoEditar,
  handleDeleteGasto,
  gastosFiltrados,
  filtro,
}) => {
  const filterList = () =>
    gastosFiltrados.map((gasto) => (
      <Gasto
        key={gasto.id}
        gasto={gasto}
        setGastoEditar={setGastoEditar}
        handleDeleteGasto={handleDeleteGasto}
      />
    ));

  const unfilterList = () =>
    gastos.map((gasto) => (
      <Gasto
        key={gasto.id}
        gasto={gasto}
        setGastoEditar={setGastoEditar}
        handleDeleteGasto={handleDeleteGasto}
      />
    ));

  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos filtrados"
              : "No hay Gastos en esta categoria"}
          </h2>
          {filterList()}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No hay Gastos"}</h2>
          {unfilterList()}
        </>
      )}
    </div>
  );
};
