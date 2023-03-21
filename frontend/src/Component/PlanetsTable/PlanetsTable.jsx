import "./PlanetsTable.css";

const PlanetsTable = ({ planets, handleOpenModal, formatingData }) => {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Diameter</th>
                    <th>Climate</th>
                    <th>Terrain</th>
                    <th>Surface Water</th>
                    <th>Population</th>
                    <th>Residents</th>
                </tr>
            </thead>
            <tbody>
                {planets.map((planet, index) =>
                    <tr key={index}>
                        <td>{planet.name}</td>
                        <td>{formatingData(planet.diameter, "km")}</td>
                        <td>{planet.climate}</td>
                        <td>{planet.terrain}</td>
                        <td>{formatingData(planet.surface_water, "%")}</td>
                        <td>{formatingData(planet.population, "people")}</td>
                        <td>{planet.residents.length > 0 ?
                            <button onClick={() => handleOpenModal(planet)}>
                                {planet.residents.length}
                                {planet.residents.length === 1
                                    ? " resident"
                                    : " residents"}</button>
                            : "No known residents"}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default PlanetsTable;