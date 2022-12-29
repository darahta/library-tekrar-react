import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
const AddBookForm = (props) => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState(null);
   const [bookName, setBookName] = useState("");
   const [author, setAuthor] = useState("");
   const [isbn, setIsbn] = useState("");
   const [category, setCategory] = useState("");

   useEffect(() => {
      axios
         .get("http://localhost:3004/categories")
         .then((res) => {
            console.log("addCategoriler", res);
            setCategories(res.data);
         })
         .catch((err) => {
            console.log("err", err);
         });
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (bookName === "" || author === "" || category === "") {
         alert("kitap adı, yazar adı ve kategoriler boş bırakılamaz");
         return;
      }
      const newBook = {
         id: new Date().getTime(),
         name: bookName,
         author: author,
         isbn: isbn,
         categoryId: category,
      };
      axios
         .post("http://localhost:3004/books", newBook)
         .then((res) => {
            console.log("Kitap Ekleme", res);
            setBookName("");
            setAuthor("");
            setIsbn("");
            setCategory("");
            navigate("/");
         })
         .catch((err) => console.log("err", err));
   };

   if (categories === null) {
      return <Loading />;
   }
   return (
      <div className="container my-5">
         <form onSubmit={handleSubmit}>
            <div className="row g-3">
               <div className="col">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Kitap Adı"
                     value={bookName}
                     onChange={(event) => setBookName(event.target.value)}
                  />
               </div>
               <div className="col">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Kitap Yazarı"
                     value={author}
                     onChange={(event) => setAuthor(event.target.value)}
                  />
               </div>
            </div>
            <div className="row g-3 my-3">
               <div className="col">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="ISBN"
                     value={isbn}
                     onChange={(event) => setIsbn(event.target.value)}
                  />
               </div>
               <div className="col">
                  <select
                     className="form-select"
                     value={category}
                     onChange={(event) => setCategory(event.target.value)}
                  >
                     <option value={""} selected>
                        Kategor Seçin
                     </option>
                     {categories.map((cat, index) => {
                        return (
                           <option key={index} value={cat.id}>
                              {cat.name}
                           </option>
                        );
                     })}
                  </select>
               </div>
            </div>
            <div className="d-flex justify-content-center my-5">
               <button type="submit" className="btn btn-primary w-25">
                  Kaydet
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddBookForm;
