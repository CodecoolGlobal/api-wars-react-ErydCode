import { useState, useEffect } from "react";
import Loading from "../../Component/Loading/Loading";
import "./ResidentsModal.css"

const fetchResidents = (fetchUrls, setResidents, setToggl) => {
    if (fetchUrls !== null)
        fetchUrls.map(url => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setResidents(prev => [...prev, data])
                    setToggl(prev => !prev);
                })
                .catch(err => console.log(err))
        });
};

const handleLoader = (fetchUrls, residents, setIsLoading) => {
    if (fetchUrls.residents.length === residents.length)
        setIsLoading(false);
};

const ResidentsModal = ({ openModal, setOpenModal, planetOnClick, formatingData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [residents, setResidents] = useState([]);
    const [toggl, setToggl] = useState(true);
    
    useEffect(() => {
        if (openModal)
            fetchResidents(planetOnClick.residents, setResidents, setToggl);
    }, [planetOnClick]);

    useEffect(() => {
        if (openModal)
            handleLoader(planetOnClick, residents, setIsLoading)
    }, [toggl]);

    const closeModal = () => {
        setOpenModal(false);
        setResidents([]);
        setIsLoading(true);
    };

    if (openModal) {
        return (
            <div className="residentModalContainer">
                <div className="residentModal">
                    {
                        isLoading ?
                            <Loading /> :
                            <>
                                <div className="residentModalHead">
                                    <h1>Residents of {planetOnClick.name}</h1>
                                    <p onClick={closeModal}>⤬</p>
                                </div>
                                <table className="residentModalTable">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Height</th>
                                            <th>Mass</th>
                                            <th>Skin color</th>
                                            <th>Hair color</th>
                                            <th>Eye color</th>
                                            <th>Birth year</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {residents.map((resident, index) =>
                                            <tr key={index}>
                                                <td>{resident.name}</td>
                                                <td>{formatingData(resident.height, "m")}</td>
                                                <td>{formatingData(resident.mass, "kg")}</td>
                                                <td>{resident.skin_color}</td>
                                                <td>{resident.hair_color}</td>
                                                <td>{resident.eye_color}</td>
                                                <td>{resident.birth_year}</td>
                                                <td>{resident.gender}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </>
                    }
                    <div className="residentModalFooder">
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        );
    };
};

export default ResidentsModal;