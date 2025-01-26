require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const App = express();
const UsersRoute = require("./Routes/AuthuserRoute");
const LoanRoute = require("./Routes/LoanRoutes");

const cors = require("cors");

App.use(cors());
App.use(express.json());

App.get("/", (req,res)=> {
    res.send("Server Started ONG");
});

App.use("/loans", LoanRoute);
App.use("/auth"  , UsersRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    App.listen(8080, () => {
        console.log("DB Connected , Server is Running");
    });
}).catch((err) => {
    console.log(err);
});

