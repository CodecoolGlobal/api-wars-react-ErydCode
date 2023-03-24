const express = require("express");
const cors = require("cors");
const registration = require("./routes/registration");

const mongoose = require("mongoose");

const PORT = 777;
const app = express();
const mongoUrl = "mongodb://localhost/api-wars";


// Middle Ware Function
app.use(cors());
app.use(express.json());
app.use("/api/user/", registration);

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

const connectMongo = async () => {
    await mongoose.connect(mongoUrl);
};

connectMongo().catch(err => console.log(err));