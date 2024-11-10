require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
const addRoutes = require("./routes/add.js");
const fetchRoutes = require("./routes/fetch.js");
const { User } = require('./models/user.js');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({
    origin: ['https://savenwatch.netlify.app', 'https://localhost:3000'],
    credentials: true
}));

// routes
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/add", addRoutes);
app.use("/fetch", fetchRoutes);

// starting server
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));