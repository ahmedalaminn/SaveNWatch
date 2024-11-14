const router = require('express').Router();
const {validate, User} = require("../models/user")

router.post("/add", async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const { imdbID, name, type } = req.body;
        user.watchlist.push({ imdbID, name, type });

        await user.save();
        res.status(200).json({ message: 'Watchlist updated successfully', watchlist: user.watchlist });
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ message: 'Error updating watchlist', error });
    }
});

// router.get("/fetch", async (req, res) => {
//     try {

//     }
//     catch (error) {

//     }
// });

module.exports = router;