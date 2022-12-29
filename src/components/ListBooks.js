import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListBooks = () => {
   const [books, setBooks] = useState(null);
   const [categories, setCategories] = useState(null);

   useEffect(() => {
      axios
         .get("http://localhost:3004/books")
         .then((res) => {
            console.log(res.data);
            setBooks(res.data);
            axios
               .get("http://localhost:3004/categories")
               .then((res) => {
                  setCategories(res.data);
               })
               .catch((err) => console.log("err", err));
         })
         .catch((err) => console.log("err", err));
   }, []);

   if (books === null || categories === null) {
      return (
         <>
            <Loading />
         </>
      );
   }
   return (
      <div className="container my-5">
         <div className="my-3 d-flex justify-content-end">
            <Link to="/add-book" className="btn btn-primary">
               Kitap ekle
            </Link>
         </div>
         <table className="table">
            <thead>
               <tr>
                  <th scope="col">Kitap adı</th>
                  <th scope="col">Yazar</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">ISBN</th>
               </tr>
            </thead>
            <tbody>
               {books.map((book, index) => {
                  const category = categories.find(
                     (cat) => cat.id === book.categoryId
                  );
                  return (
                     <tr key={index}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{category.name}</td>
                        <td>{book.isbn}</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

export default ListBooks;
