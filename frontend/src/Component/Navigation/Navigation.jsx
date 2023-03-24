import { Outlet, Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isUserRegistered,  isUserLogedIn, setIsUserLogedIn }) => {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Planet list</Link>
                    </li>
                    {/* <li>Voting statistics</li> */}
                    <li>
                        {!isUserLogedIn && !isUserRegistered &&
                            <Link to="/register">Registration</Link>}
                    </li>
                    <li>
                        {!isUserLogedIn &&
                            <Link to="/login">Login</Link>}
                    </li>
                    <li>
                        {isUserLogedIn &&
                            <Link to="/logout" onClick={() => setIsUserLogedIn(false)}>Logout</Link>}
                    </li>
                    {isUserLogedIn &&
                        <li className="account">Signed in as { }</li>}
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default Navigation;