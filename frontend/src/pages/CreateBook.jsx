import React, { useState } from "react";
import BackButton from "../assets/components/BackButton";
import Spinner from "../assets/components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [resp, setResp] = useState({});
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    if (!title || !author || !publishYear) {
      toast.error("Plese fill the title, author and publish year properly");
      return;
    }
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    await axios
      .post("http://localhost:5555/books", data)
      .then((response) => {
        console.log(response.data);
        setResp(response.data);
        setLoading(false);
        setCreated(true);
      })
      .catch((error) => {
        console.error(`An error Occured: ${error}`);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <ToastContainer />
      <h1 className="text-3xl my-4">Create a new Book</h1>
      {loading ? (
        <Spinner />
      ) : created ? (
        <div>
          <span className="bg-green my-3 text-2xl">Book Created</span>
          <h3 className="text-xl mr-4 text-gray-500">Title: {resp.title}</h3>
          <h3 className="text-xl mr-4 text-gray-500">Author: {resp.author}</h3>
          <h3 className="text-xl mr-4 text-gray-500">
            Published Year: {resp.publishYear}
          </h3>
          <span className="my-4">
            <Link to="/">Create new</Link>
          </span>
        </div>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1  p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Published Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-400 m-8" onClick={handleSaveBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
