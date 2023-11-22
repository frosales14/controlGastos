import { formatDate } from "../helpers";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";

import SavingsIcon from "../assets/img/icono_ahorro.svg";
import HomeIcon from "../assets/img/icono_casa.svg";
import FoodIcon from "../assets/img/icono_comida.svg";
import ExpensesIcon from "../assets/img/icono_gastos.svg";
import FunIcon from "../assets/img/icono_ocio.svg";
import HealthIcon from "../assets/img/icono_salud.svg";
import SubsIcon from "../assets/img/icono_suscripciones.svg";

const iconsdictionary = {
  ahorro: SavingsIcon,
  comida: FoodIcon,
  casa: HomeIcon,
  gastos: ExpensesIcon,
  ocio: FunIcon,
  salud: HealthIcon,
  subscriptiones: SubsIcon,
};

export const Gasto = ({ gasto, setGastoEditar, handleDeleteGasto }) => {
  const { name, category, creationDate, amount } = gasto;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => handleDeleteGasto(gasto.id)}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconsdictionary[category]} alt="imagen de categoria" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{" " + formatDate(creationDate)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
