import React from "react";
import { Link } from "react-router-dom";
import "./assets/card.css"

function BookCard({ book ,refreshBooks }) {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const uid = localStorage.getItem('uid');

  const handleDelete = (e) => {
    const deleteBook = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${baseURL}/api/${uid}/books/${book.id}`, {
          method: "DELETE",
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if(res.ok){
          refreshBooks();
        }
      } catch (error) {
        console.error(error);
      }
    };
    deleteBook();
  };

  return (
    <div className="cards">
        <div className="title_card">
          <h2>{book.title}</h2>
        <p>{book.author}</p>
        </div>
      <div className="buttons_card">
        <div>
        <Link to={`/edit/${book.id}`}>
          <button>🖊</button>
        </Link>
      </div>
      <div>
        <button onClick={handleDelete}>🗑</button> 
      </div>
      </div>
      
    </div>
  );
}

export default BookCard;
