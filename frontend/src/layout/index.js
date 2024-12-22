import React from "react";
import Logo from "../images/logo.png";

const Authlayout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <img src={Logo} alt="Logo" width={150} height={40} />
      </header>

      {children}
    </>
  );
};

export default Authlayout;
