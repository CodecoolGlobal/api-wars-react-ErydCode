const router = require("express").Router();
const Users = require("../mdbSchema/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// === Ist password-salt-and-hash eine alte Methode?
// import saltHash from "password-salt-and-hash";

router.get("/", async (req, res) => {
    const query = req.query;
    const user = await Users.find(query);
    return res.json(user);
});

router.post("/registration", (req, res) => {
    const newUser = req.body;
    // === Ist password-salt-and-hash eine alte Methode?
    // newUser.password = saltHash.generateSaltHash(newUser.password);
    bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
        newUser.password = hash;
        if (err) {
            console.log(err);
        } else {
            try {
                const saved = await Users.create(newUser);
                return res.json(saved);
            } catch (err) {
                return next(err);
            };
        };
    });
});

// === Alternative wie man sonnst die Registration schreiben könnte ===
// router.post("/registration", async (req, res) => {
//     console.log(req.body);
//     try {
//         const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
//         const insertResult = await User.create({
//             username: req.body.username,
//             password: hashedPwd,
//         });
//         res.send(insertResult);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server error Occured");
//     }
// });

router.post("/login", async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await Users.findOne({ username: username });
        console.log(user);
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    res.json({ message: "Successful login." });
                } else {
                    res.json({ message: "Wrong password." });
                }
            })
        } else {
            res.json({ message: "Wrong username." });
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    };
});

// === Alternative wie man sonnst ein Login schreiben könnte ===
// app.post("/login", async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });
//         console.log(user);
//         if (user) {
//             const cmp = await bcrypt.compare(req.body.password, user.password);
//             if (cmp) {
//                 //   ..... further code to maintain authentication like jwt or sessions
//                 res.send("Auth Successful");
//             } else {
//                 res.send("Wrong username or password.");
//             }
//         } else {
//             res.send("Wrong username or password.");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server error Occured");
//     }
// });

router.get("/logout", (req, res) => {
    res.send("Logging out");
});

router.get("/registration/google", (req, res) => {
    res.send("Registration with Google");
});

module.exports = router;