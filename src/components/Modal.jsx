import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";

import closeBtnImg from "../assets/img/cerrar.svg";
import { categories } from "../constants/categories.constants";

const Modal = ({
  setShowModal,
  setIsAnimateModalActive,
  isAnimateModalActive,
  saveGasto,
  gastoEditar,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!gastoEditar.name) {
      return;
    }

    setName(gastoEditar.name);
    setAmount(gastoEditar.amount);
    setCategory(gastoEditar.category);
  }, []);

  const amountAsNumber = Number(amount);

  const handleCloseModal = () => {
    setIsAnimateModalActive(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, amount, category].includes("")) {
      setErrorMessage("Todos los campos son requeridos");
      return;
    }

    if (!Number(amount)) {
      setErrorMessage("El campo de cantidad debe de ser un número");
      return;
    }

    saveGasto({ name, amount: amountAsNumber, category, id: gastoEditar.id });
  };

  const setErrorMessage = (message) => {
    setMensaje(message);

    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={closeBtnImg}
          alt="imagen para cerrar modal"
          onClick={handleCloseModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${isAnimateModalActive ? "animar" : "cerrar"}`}
      >
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <legend>{!gastoEditar.name ? "Nuevo Gasto" : "Editar Gasto"}</legend>

        <div className="campo">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            id="name"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="amount">Cantidad</label>
          <input
            id="amount"
            type="text"
            placeholder="Añade la cantidad del gasto ej: 300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="category">Nombre Gasto</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cate) => (
              <option key={cate.value} value={cate.value}>
                {cate.label}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.nombre ? "Editar gasto" : "Añadir gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
