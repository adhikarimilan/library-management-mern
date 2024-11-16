import express from "express";

import { PORT, MongoDBUrl } from "./config.js";
import mongoose from "mongoose";

import booksRoute from "./routes/booksRoute.js";

import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//option 1 allows all origin
app.use(cors());

//option 2:  allows custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (req, res) => {
  return res.status(234).send("WElcome to the Mern stack tut");
});

app.use("/books", booksRoute);

mongoose
  .connect(MongoDBUrl)
  .then(() => {
    console.log("App is connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listenting to port number: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
