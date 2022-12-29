import React from "react";

const Loading = () => {
   return (
      <div
         style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
         }}
      >
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
};

export default Loading;
