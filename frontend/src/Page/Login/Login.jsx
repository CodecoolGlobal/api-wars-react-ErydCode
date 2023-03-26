import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// const fetchUserData = (usernameInput, passwordInput, setFetchedUserData) => {
//     fetch(`http://localhost:777/api/users/?username=${usernameInput}&&password=${passwordInput}`)
//         .then(res => res.json())
//         .then(user => {
//             user.length > 0 &&
//             setFetchedUserData(user[0]);
//         });
// };

const Login = ({ isUserLogedIn, setIsUserLogedIn, setUsername }) => {
    
    const navigate = useNavigate();
    const timeToRedirec = 6;

    const [countdown, setCountdown] = useState(timeToRedirec);
    const [loginData, setLoginData] = useState("");
    const [resMessage, setResMessage] = useState("");

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson.username = formJson.username.toLowerCase();
        setLoginData(formJson);

        if (formJson.username !== "" && formJson.password !== "") {
            fetch(`http://localhost:777/api/users/login/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formJson)
                })
                .then((res) => res.json())
                .then((result) => {
                    setResMessage(result);
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        };
    };

    useEffect(() => {
        if (resMessage.message === "Successful login.") {
            setIsUserLogedIn(true);
            setUsername(loginData.username);
        }
    }, [resMessage]);

    useEffect(() => {
        if (isUserLogedIn && countdown >= 0) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000);
            return () => clearTimeout(interval);
        }
    }, [countdown, isUserLogedIn]);

    isUserLogedIn &&
        setTimeout(navigate, timeToRedirec * 1000, "/")

    return (
        <div className="formContainer">
            <h1>Login in your Account</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Enter your username
                    <input type="text"
                        // required
                        // value={usernameInput}
                        name="username" id="username"
                    />
                </label>
                <label>
                    Enter your password
                    <input type="password"
                        // required
                        // value={passwordInput}
                        name="password" id="password"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {
                loginData === "" ?
                    "" :
                    loginData.username === "" && loginData.password === "" ?
                        <p className="errorMessage">Please fill in your Username and Password.</p> :
                        loginData.username === "" ?
                            <p className="errorMessage">Please fill in your Username.</p> :
                            loginData.password === "" &&
                            <p className="errorMessage">Please fill in your Password.</p>
            }
            {
                resMessage === "" ?
                    "" :
                    resMessage.message === "Wrong username." ?
                        <p className="errorMessage">{resMessage.message}</p> :
                        resMessage.message === "Wrong password." ?
                            <p className="errorMessage">{resMessage.message}</p> :
                            resMessage.message === "Successful login." &&
                            <p className="successMessage">Successful Login.<br />
                                You will be automatically redirected in {countdown} seconds.</p>
            }
        </div>
    );
};

export default Login;