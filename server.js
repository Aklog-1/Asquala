const express = require(`express`);
const userRouter = require(`./Routes/userRoutes`);
const postRouter = require(`./Routes/postRoutes`);
const mongoose = require(`mongoose`);
require(`dotenv/config`);

const app = express();
const portNumber = 8000; // ***PORT*** for deploying

app.use(express.json());
app.use("/userRoutes", userRouter);
app.use("/postRoutes", postRouter);

mongoose.connect(process.env.dataBaseUrl, { useNewUrlParser: true }, () =>
    console.log("connected to DB")
);

app.listen(portNumber, () => {
    console.log(`We are running on port number: ${portNumber}`);
});
