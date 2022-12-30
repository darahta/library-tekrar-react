import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const EditBook = (props) => {
   const navigate = useNavigate();
   const params = useParams();
   console.log(params);

   const [bookName, setBookName] = useState("");
   const [author, setAuthor] = useState("");
   const [isbn, setIsbn] = useState("");
   const [category, setCategory] = useState("");
   const [categories, setCategories] = useState(null);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      axios
         .get(`http://localhost:3004/books/${params.bookId}`)
         .then((res) => {
            console.log("edit işlemleri", res);
            setBookName(res.data.name);
            setAuthor(res.data.author);
            setIsbn(res.data.isbn);
            setCategory(res.data.categoryId);
            axios
               .get("http://localhost:3004/categories")
               .then((res) => {
                  setCategories(res.data);
               })
               .catch((err) => console.log("err"));
         })
         .catch((err) => console.log("err", err));
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      setShowModal(true);
   };

   const editBook = () => {
      if (bookName === "" || author === "" || category === "" || isbn === "") {
         alert("boş bırakaalmaz");
         return;
      }
      const updatedBook = {
         id: params.bookId,
         name: bookName,
         author: author,
         categoryId: category,
         isbn: isbn,
      };
      console.log("updatebook", updatedBook);
      axios
         .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
         .then((res) => {
            console.log(res);
            setShowModal(false);
            navigate("/");
         })
         .cat((err) => console.log("err", err));
   };

   if (categories === null) {
      return <div>Loading</div>;
   }
   return (
      <div>
         <Header />
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
                        disabled
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
                  <button
                     onClick={() => navigate("/")}
                     type="button"
                     className="btn btn-danger w-25 mx-2"
                  >
                     Vacgeç
                  </button>
                  <button type="submit" className="btn btn-primary w-25">
                     Kaydet
                  </button>
               </div>
            </form>
         </div>
         {showModal === true && (
            <Modal
               tittle="Kitap Güncelleme"
               aciklama={`${bookName} Kaydetmek için onaylayınız`}
               onCancel={() => setShowModal(false)}
               onConfirm={() => editBook()}
            />
         )}
      </div>
   );
};

export default EditBook;
