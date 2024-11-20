import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {books.map((book, index) => (
        <div
          className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
          key={index}
        >
          <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <div className="justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-blue-300 text-2xl " />
            <h2 className="my-1">{book.author}</h2>
          </div>
          <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <Link to={`/books/show/${book._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black"></BsInfoCircle>
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="text-2xl text-green-800 hover:text-black"></AiOutlineEdit>
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="text-2xl text-red-800 hover:text-light-red"></MdOutlineDelete>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
