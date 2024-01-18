import React from "react";

const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    <header className="header">
      <img
        src="https://i.imgur.com/QCI8Lpm.png"
        height={120}
        style={{ marginLeft: "50px", marginTop: "50px" }}
      ></img>
      <div className="container">
        <h3>Lista de contactos de StarClinic ({nbOfContacts})</h3>
        <button onClick={() => toggleModal(true)} className="btn">
          <i className="bi bi-plus-square"></i> Añadir nuevo contacto
        </button>
      </div>
    </header>
  );
};

export default Header;
