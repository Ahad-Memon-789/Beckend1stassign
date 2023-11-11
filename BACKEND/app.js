

const express = require("express")
const courseRoute = require("./route/courseRoute")
const mongoose = require('mongoose')
const Cors = require("cors")
require("dotenv").config()



const App = express();
App.use(express.json())
App.use(Cors({ origin: true, credentials: true }))

App.use("/course", courseRoute)

mongoose
    .connect(process.env.MONGODB_KEY)
    .then((res) => {
        App.listen(process.env.PORT, () => {
            console.log(
                `Database Connected and server is listening http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log("err", err);
    });