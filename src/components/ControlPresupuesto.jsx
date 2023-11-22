import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto,
  seGastos,
  setPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gasto, setGasto] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.amount + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    const porcentajeGastado = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(porcentajeGastado);
    }, 500);

    setDisponible(totalDisponible);
    setGasto(totalGastado);
  }, [gastos]);

  const applyCurrencyFormat = (amount) => {
    const value = Number(amount);
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const canReset = confirm("¿Desea resetear la app?");

    if (!canReset) return;

    setGastos([]);
    setPresupuesto([]);
    setIsValidPresupuesto(false);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>
          {applyCurrencyFormat(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {applyCurrencyFormat(disponible)}
        </p>

        <p>
          <span>Gasto: </span>
          {applyCurrencyFormat(gasto)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
