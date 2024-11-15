import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "./assets/home.css";
import Logout from "./LogOut";

export default function Home() {

  const [books, setBooks] = useState([]);

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('token');

  const checkTokenExpiry= () => {
    const expiryTime = localStorage.getItem('tokenExpiry');
    const currentTime = new Date().getTime();
    if (currentTime > expiryTime) {
        console.log("Token expired");
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        window.location.reload();
    }
}

  const getBooks = async () => {
    checkTokenExpiry();
    try {
      let res = await fetch(`${baseURL}/api/${uid}/books`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const result = await res.json();
        setBooks(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{getBooks()},[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formToJson = (formData) => {
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      return jsonData;
    };

    const bookData = formToJson(formData);

    const postBooks = async () => {
        try {
            await fetch(`${baseURL}/api/${uid}/books`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData),
          });
        } catch (error) {
          console.error(error);
        }
      };

      const doPostbooks = async()=>{
        await postBooks();
        getBooks();
      }

      doPostbooks();
      
  };

  return (
    <>
    <Logout/>
      <h1>Book List</h1>
      {books.length > 0 ? (
        <div>
          {books.map((book, i) => (<div key={i}>
            <BookCard book={book} refreshBooks={getBooks}/><br/></div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      
      <div className="formDiv">
        
      <form onSubmit={handleSubmit}>
        <div className="form_label">
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form_label">
          <label htmlFor="author">Author: </label>
          <input type="text" id="author" name="author" required />
        </div>
        <div className="form_label">
          <label htmlFor="price">Price:</label>
          <input type="number" step="0.01" id="price" name="price" required />
        </div>
        <div className="form_label">
          <label htmlFor="publish_year">Publish Year:</label>
          <input type="number" id="publish_year" name="publish_year" required />
        </div>
        <button type="submit">Add a book</button>
      </form>
      </div>
    </>
  );
}