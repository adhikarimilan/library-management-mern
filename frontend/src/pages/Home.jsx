import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../assets/components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../assets/components/homepage/BooksTable";
import BookCard from "../assets/components/homepage/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState(
    localStorage.getItem("showType") ?? "table"
  );

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5555/books");
      const data = await response.json();
      console.log(data.data);
      setBooks(data.data); // Set the data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  //   useEffect(() => {
  //     console.log("Updated books:", books);
  //   }, [books]); // Runs every time `books` changes
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={
            "bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" +
            (showType == "table" ? " bg-sky-600" : "")
          }
          onClick={() => {
            setShowType("table");
            localStorage.setItem("showType", "table");
          }}
        >
          Table
        </button>
        <button
          className={
            "bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" +
            (showType == "card" ? " bg-sky-600" : "")
          }
          onClick={() => {
            setShowType("card");
            localStorage.setItem("showType", "card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType == "table" ? (
        <BooksTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Home;
