import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const ListBooks = () => {
   const [books, setBooks] = useState(null);
   const [categories, setCategories] = useState(null);
   const [didUpdate, setDidUpdate] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [silinecekKitap, setSilinecekKitap] = useState(null);

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
   }, [didUpdate]);

   const kitapSil = (id) => {
      console.log("kitap sil", id);
      axios
         .delete(`http://localhost:3004/books/${id}`)
         .then((res) => {
            console.log("delete res", res);
            setDidUpdate(!didUpdate);
            setShowModal(false);
         })
         .catch((err) => console.log(err));
   };

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
                  <th className="text-center" scope="col">
                     ISBN
                  </th>
                  <th className="text-center" scope="col">
                     İşlemler
                  </th>
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
                        <td className="text-center">
                           {book.isbn === "" ? "-" : book.isbn}
                        </td>
                        <td>
                           <div
                              className="btn-group d-flex justify-content-center"
                              role="group"
                           >
                              <button
                                 type="button"
                                 class="btn btn-outline-danger  btn-sm mx-2"
                                 onClick={() => {
                                    // deleteBook(book.id);
                                    setShowModal(true);
                                    setSilinecekKitap(book.id);
                                 }}
                              >
                                 Delete
                              </button>
                              <Link
                                 to={`edit-book/${book.id}`}
                                 className="btn btn-sm btn-outline-primary"
                              >
                                 Edit
                              </Link>
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         {showModal === true && (
            <Modal
               aciklama={"Silmek istediğinize emin misiniz"}
               tittle={"Silme İşlemi"}
               yapilmasiGerekenIs={() => kitapSil(silinecekKitap)}
               setShowModal={setShowModal}
            />
         )}
      </div>
   );
};

export default ListBooks;
