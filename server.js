
const express = require('express');
const apiRouter = require(`../Asquala mov't/Controller/router.js`)
const mongoose = require(`mongoose`)
require('dotenv/config')

const app = express();
const portNumber = 8000;    // ***PORT*** for deploying


app.use(express.json())
app.use("/apiroute", apiRouter)


mongoose.connect(
    process.env.dataBaseUrl,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);
//process.env.MONGO_URL
app.listen(portNumber, () => {
    console.log(`We are running on port number: ${portNumber}`);
})