const express = require("express");
const cors = require("cors");

const PORT = 777;
const app = express();


// Middle Ware Function
app.use(cors());
app.use(express.json());

// Routs
app.get("/api/planets/", (req, res) => {
    const fetchUrl = req.query.fetchUrl;
    const fetchingWithQuery = (url = "https://swapi.py4e.com/api/planets/") => {
        fetch(url)
            .then(res => res.json())
            .then(data => res.send(data))
            .catch(err => console.log(err.message));
    };
    fetchingWithQuery(fetchUrl);
});

// Server Listener
app.listen(PORT, () => {
    console.log(`Server run on: http://localhost:${PORT}`);
    console.log(`Click Command (Cmd ⌘) + http://localhost:${PORT}/api/planets`);
});