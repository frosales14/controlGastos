import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos,
}) => {
  const componentToshow = isValidPresupuesto ? (
    <ControlPresupuesto
      presupuesto={presupuesto}
      gastos={gastos}
      setPresupuesto={setPresupuesto}
      setGastos={setGastos}
      setIsValidPresupuesto={setIsValidPresupuesto}
    />
  ) : (
    <NuevoPresupuesto
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
    />
  );

  return (
    <header>
      <h1 className="">Planificador de gastos</h1>
      {componentToshow}
    </header>
  );
};

export default Header;
