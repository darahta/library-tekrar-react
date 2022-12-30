import React from "react";

const Modal = (props) => {
   const { onCancel, onConfirm, tittle, aciklama } = props;
   return (
      <div
         onClick={onCancel}
         style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <div
            style={{
               width: "50%",

               padding: "20px",
               backgroundColor: "white",
            }}
         >
            <h1 className="text-center">{tittle}</h1>
            <p className="text-center">{aciklama}</p>
            <div className="d-flex justify-content-center">
               <button
                  onClick={onCancel}
                  className="btn btn-sm btn-outline-danger mx-2"
               >
                  Kapat
               </button>
               <button
                  onClick={onConfirm}
                  className="btn btn-sm btn-outline-primary"
               >
                  Onayla
               </button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
