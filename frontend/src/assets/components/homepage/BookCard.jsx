import React from "react";
import BookSingleCard from "./BookSingleCard";

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {books.map((book, index) => (
        <BookSingleCard book={book} key={index} />
      ))}
    </div>
  );
};

export default BookCard;
