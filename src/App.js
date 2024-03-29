import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:bookId" element={<EditBook />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
