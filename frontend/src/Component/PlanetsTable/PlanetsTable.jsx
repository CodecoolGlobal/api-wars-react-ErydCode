import "./PlanetsTable.css";

const PlanetsTable = ({ planets }) => {

    const formatingData = (data, unit) => {
        return data === "unknown" ? data : Number(data).toLocaleString() + (unit === "%" ? unit : ` ${unit}`);
        //====== Alternative mit RegExp ======
        // data.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            // + (data === "unknown" ? "" : unit === "%" ? unit : " " + unit);
    };
    
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
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default PlanetsTable;