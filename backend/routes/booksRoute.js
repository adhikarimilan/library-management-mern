import express from "express";
import { Book } from "../bookModel.js";

const router = express.Router();

//route to add a new book in the database
router.post("/", async (req, res) => {
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
    console.error(`Error: ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

//route to get all books in the bookstore
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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

//route to update a book details
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message:
          "Please do not leave book title, author or published year blank",
      });
    } else {
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
      if (!result) {
        return res
          .status(404)
          .json({ message: "a book with the provided id could not be found" });
      } else {
        return res
          .status(200)
          .send({ message: "Book details successfully updated" });
      }
    }
  } catch (error) {
    console.error(`Error ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

//deleting a book with its id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .send({ message: "Book with the provided id not found" });
    }

    return res
      .status(200)
      .send({ message: "Book with the provided id deleted successfully" });
  } catch (error) {
    console.error(`Error ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

export default router;
