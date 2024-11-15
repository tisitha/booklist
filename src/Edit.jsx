import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./assets/edit.css";

export default function Edit() {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');

    const {id} = useParams();
    const [book,setBook] = useState({
        title:"",
        author:"",
        price: 0,
        publish_year: 0
    });

    const getBook = async()=>{
        try{
            const token = localStorage.getItem('token');
            let res = await fetch(`${baseURL}/api/${uid}/books/${id}`,{
              headers: {
                'Authorization': `Bearer ${token}`
              }});
            const result = await res.json();
            setBook(result);
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        getBook();
      },[]);

    const handleChange = (e) =>{
        e.preventDefault();
        const {name,value} = e.target;
        setBook((prevBook)=>({...prevBook,[name]:value}));
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const sendBook = async() =>{
            try{
                await fetch(`${baseURL}/api/${uid}/books/${id}`,{
                    method:"PUT",
                    headers: {
                      'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify(book),
                });
            }
            catch(error){
                console.error(error);
            }
        }

        await sendBook();
        window.location.replace('/');
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: 
            <input type="text" name="title" value={book.title} onChange={handleChange} required /></label> 
        </div>
        <div>
          <label>Author: 
            <input type="text" name="author" value={book.author} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Price: 
            <input type="number" step="0.01" name="price" value={book.price} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Published Year: 
            <input type="number" name="publish_year" value={book.publish_year} onChange={handleChange} required /></label>  
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
