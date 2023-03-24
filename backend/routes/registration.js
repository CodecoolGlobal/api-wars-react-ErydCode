const router = require("express").Router();
const User = require("../mdbSchema/user.model");

router.get("/", async (req, res) => {
    const query = req.query;
    // const regUsername = new RegExp(queryUsername, "i");
    console.log("Query: ", query);
    const user = await User.find(query);
    console.log(user);
    return res.json(user);
});

router.post("/registration", async (req, res) => {
    const newUser = req.body;
    try {
        const saved = await User.create(newUser);
        return res.json(saved);
    } catch (err) {
        return next(err);
    };
});

// router.get("logout", (req, res) => {
//     res.send("Logging out");
// });

router.get("/registration/google", (req, res) => {
    res.send("Registration with Google");
});

module.exports = router;