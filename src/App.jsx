import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { generateId } from "./helpers";
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import { ListadoGastos } from "./components/ListadoGastos";
import Filtro from "./components/Filtro";
function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAnimateModalActive, setIsAnimateModalActive] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      openModal();
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    setIsValidPresupuesto(presupuesto > 0);
  }, []);

  useEffect(() => {
    console.log("filtrando... ", filtro);
    const filterExpenses = gastos.filter(
      (expense) => expense.category === filtro
    );
    console.log(filterExpenses);
    setGastosFiltrados(filterExpenses);
  }, [filtro]);

  const handleNuevoGasto = () => {
    setGastoEditar({});
    openModal();
  };

  const handleDeleteGasto = (id) => {
    const newGastosState = gastos.filter((stateGasto) => stateGasto.id !== id);
    setGastos(newGastosState);
  };

  const openModal = () => {
    setShowModal(true);

    setTimeout(() => {
      setIsAnimateModalActive(true);
      return;
    }, 500);
  };

  const saveGasto = (gasto) => {
    if (gasto.id) {
      const gastosEdit = gastos.map((item) =>
        item.id == gasto.id ? gasto : item
      );
      setGastos(gastosEdit);
    } else {
      const gastoItem = {
        ...gasto,
        id: generateId(),
        creationDate: Date.now(),
      };
      setGastos([...gastos, gastoItem]);
    }

    setGastoEditar({});
    setIsAnimateModalActive(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  return (
    <div className={showModal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
        gastos={gastos}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              handleDeleteGasto={handleDeleteGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto" onClick={handleNuevoGasto}>
            <img src={iconoNuevoGasto} alt="icono nuevo gasto" />
          </div>
        </>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          isAnimateModalActive={isAnimateModalActive}
          setIsAnimateModalActive={setIsAnimateModalActive}
          saveGasto={saveGasto}
          gastoEditar={gastoEditar}
        />
      )}
    </div>
  );
}

export default App;
