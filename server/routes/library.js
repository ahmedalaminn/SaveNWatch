const router = require('express').Router();
const {validate, User} = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/add", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const userID = decoded._id;

        const user = await User.findById(userID);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const {imdbID, name, type } = req.body;
        user.watchlist.push({imdbID, name, type});

        await user.save();
        res.status(200).json({ message: 'Watchlist updated successfully', watchlist: user.watchlist });
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ message: 'Error updating watchlist', error });
    }
});

router.get("/fetch", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const userId = decoded._id;

        const user = await User.findById(userId).select("-password"); 
        if (!user) return res.status(404).send({ message: "User not found" });

        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user: ", error);
        res.status(500).send({message: "Error fetching user data", error});
    }
});

module.exports = router;