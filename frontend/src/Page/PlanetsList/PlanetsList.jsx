import { useState, useEffect } from "react";
import Loading from "../../Component/Loading/Loading";
import PlanetsTable from "../../Component/PlanetsTable/PlanetsTable";
import ResidentsModal from "../ResidentsModal/ResidentsModal";
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
    const [openModal, setOpenModal] = useState(false);
    const [planetOnClick, setPlanetOnClick] = useState([]);

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

    const handleOpenModal = (planet) => {
        setPlanetOnClick(planet);
        setOpenModal(true);
    };

    const formatingData = (data, unit) => {
        return data === "unknown" ? data : Number(data).toLocaleString() + (unit === "%" ? unit : ` ${unit}`);
        //====== Alternative mit RegExp ======
        // data.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        // + (data === "unknown" ? "" : unit === "%" ? unit : " " + unit);
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
                                <button disabled={true} onClick={e => handlePagination(planets.previous)}>Previous</button> :
                                <button onClick={e => handlePagination(planets.previous)}>Previous</button>
                            }
                            {planets.next === null ?
                                <button disabled={true} onClick={e => handlePagination(planets.next)}>Next</button> :
                                <button onClick={e => handlePagination(planets.next)}>Next</button>
                            }
                        </div>
                        <PlanetsTable planets={planets.results}
                            handleOpenModal={handleOpenModal}
                            formatingData={formatingData}
                        />
                        {openModal &&
                            <ResidentsModal openModal={openModal}
                                setOpenModal={setOpenModal}
                                planetOnClick={planetOnClick}
                                formatingData={formatingData}
                            />
                        }
                        <div className="pagination">
                            {planets.previous === null ?
                                <button disabled={true} onClick={e => handlePagination(planets.previous)}>Previous</button> :
                                <button onClick={e => handlePagination(planets.previous)}>Previous</button>
                            }
                            {planets.next === null ?
                                <button disabled={true} onClick={e => handlePagination(planets.next)}>Next</button> :
                                <button onClick={e => handlePagination(planets.next)}>Next</button>
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default PlanetsList;