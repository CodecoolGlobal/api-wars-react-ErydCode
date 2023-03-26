import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const fetchUserToCheck = (usernameInput, setDbUsernameToCheck) => {
    fetch(`http://localhost:777/api/users/?username=${usernameInput}`)
        .then(res => res.json())
        .then(user => {
            user.length > 0 &&
            setDbUsernameToCheck(user[0].username);
        })
        .catch(err => console.error(err));
};


const checkUserToSubmit = (fetchedUsername, usernameInput, passwordInput, setIsUserOkToSubmit) => {
    
    if (fetchedUsername !== usernameInput
        && usernameInput !== ""
        && passwordInput !== "") {
            setIsUserOkToSubmit(true);
        } else {
            setIsUserOkToSubmit(false);
        };
    };
    
const Registration = ({ isUserRegistered, setIsUserRegistered }) => {
        
    
    const navigate = useNavigate();
    const timeToRedirec = 6;
    
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [submmitedValues, setSubmmitedValues] = useState("");
    const [dbUsernameToCheck, setDbUsernameToCheck] = useState("");
    const [isUserOkToSubmit, setIsUserOkToSubmit] = useState(true);
    const [countdown, setCountdown] = useState(timeToRedirec);


    useEffect(() => {
        const mainCheckUsername = () => {
            fetchUserToCheck(usernameInput, setDbUsernameToCheck);
            checkUserToSubmit(dbUsernameToCheck, usernameInput, passwordInput, setIsUserOkToSubmit)
        };
        mainCheckUsername();
    }, [usernameInput, passwordInput, dbUsernameToCheck]);

    const handleRegistration = event => {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson.username = formJson.username.toLowerCase();
        setSubmmitedValues(formJson);
        
        if (isUserOkToSubmit) {
            fetch(`http://localhost:777/api/users/registration/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formJson)
                    //  === Warum nimmt mongoose DB OHNE app.use(express.json()) dennoch kein FormData?
                    // body: formData
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Successfull registration: ", result);
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
            setIsUserRegistered(true);
            setUsernameInput("");
            setPasswordInput("");

        } else {
            dbUsernameToCheck === usernameInput && passwordInput !== ""
                && setUsernameInput("");
            setIsUserOkToSubmit(false);
            setDbUsernameToCheck("");
        };
    };
    
    isUserRegistered &&
        // === Warum funktioniert der Codesnipe mit setTimout nicht im Submit Handler???
        setTimeout(navigate, timeToRedirec * 1000, "/login");
    
    useEffect(() => {
        if (isUserRegistered && countdown >= 0) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        };
    }, [countdown, isUserRegistered]);
    

    return (
        <div className="formContainer">
            <h1>Registration</h1>
            <form onSubmit={handleRegistration}>
                <label>
                    Enter username
                    <input type="text"
                        // required
                        onInput={event => setUsernameInput(event.target.value.toLowerCase())}
                        value={usernameInput}
                        name="username" id="username"
                    />
                </label>
                <label>
                    Enter password
                    <input type="password"
                        // required
                        onInput={event => setPasswordInput(event.target.value)}
                        value={passwordInput}
                        name="password" id="password"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {
                submmitedValues !== "" ?
                    submmitedValues.username === "" && submmitedValues.password === "" ?
                        <p className="errorMessage">Please fill in a Username and Password.</p> :
                        submmitedValues.username === "" && submmitedValues.password !== "" ?
                            <p className="errorMessage">Please fill in a Username.</p> :
                            submmitedValues.username !== "" && submmitedValues.password === "" ?
                                <p className="errorMessage">Please fill in a Password.</p> :
                                isUserRegistered ?
                                    <p className="successMessage">Successful registration. Login to continue.<br />
                                        You will be automatically redirected in {countdown} seconds.</p> :
                                    isUserOkToSubmit === false &&
                                    <p className="errorMessage">Username already exists, please choose another one!</p> :
                    ""
            }
        </div>
    );
};

export default Registration;