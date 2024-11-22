import React, { useEffect, useState } from "react";
import BackButton from "../assets/components/BackButton";
import Spinner from "../assets/components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = async () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Book Deleted Successfully!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.error(`An error occured: ${error}`);
        setLoading(false);
      });
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
        <button
          className="p-4 bg-yellow-600 text-blue m-8 w-full"
          onClick={goBack}
        >
          No, Go back
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
