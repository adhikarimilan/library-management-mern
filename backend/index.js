import express from "express";

import { PORT, MongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./bookModel.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(234).send("WElcome to the Mern stack tut");
});

//route to add a new book in the database
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message:
          "Please do not leave book title, author or published year blank",
      });
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    }
  } catch (error) {
    console.error(`Error ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

//route to get all books in the bookstore
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    const response = {
      count: books.length,
      data: books,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

//route to a book in the bookstore using its id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    const response = {
      book,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

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
