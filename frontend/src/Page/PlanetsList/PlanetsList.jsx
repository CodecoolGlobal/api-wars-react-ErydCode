import { useState, useEffect } from "react";
import Loading from "../../Component/Loading/Loading";
import PlanetsTable from "../../Component/PlanetsTable/PlanetsTable";
import "./PlanetsList.css"

const defaultFetchUrl = `http://localhost:777/api/planets/`;

const fetchPlanet = (fetchUrl) => {
    return fetch(fetchUrl)
        .then(res => res.json())
};

const PlanetsList = () => {
    const [planets, setPlanets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchUrl, setFetchUrl] = useState(defaultFetchUrl);

    useEffect(() => {
        fetchPlanet(fetchUrl)
            .then(data => {
                setPlanets(data);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, [fetchUrl]);

    const handlePagination = navigation => {
        setFetchUrl(`${defaultFetchUrl}?fetchUrl=${navigation}`);
    };


    return (
        <div className="mainContainerPlanets">
            <h1>Star Wars universe planets</h1>
            {
                isLoading ?
                    <Loading /> :
                    <>
                        <div className="pagination">
                            {planets.previous === null ?
                            <button disabled={true} onClick={e => handlePagination(planets.previous)}>Previous</button>:
                            <button onClick={e => handlePagination(planets.previous)}>Previous</button>
                            }
                            {planets.next === null ?
                            <button disabled={true} onClick={e => handlePagination(planets.next)}>Next</button>:
                            <button onClick={e => handlePagination(planets.next)}>Next</button>
                            }
                        </div>
                        <PlanetsTable planets={planets.results} />
                    </>
            }
        </div>
    );
};

export default PlanetsList;