import { categories } from "../constants/categories.constants";

const Filtro = ({ filtro, setFiltro }) => {
  const handleFilterChange = (event) => {
    const category = event.target.value;
    setFiltro(category);
  };

  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar Gastos</label>
          <select onChange={handleFilterChange}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtro;
