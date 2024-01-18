import React from "react";

const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    <header className="header">
      <img
        src="https://i.imgur.com/QCI8Lpm.png"
        height={140}
        style={{ marginLeft: "50px", marginTop: "50px" }}
        alt="Logo"
      />
      <div className="container">
      <h3 style={{ fontSize: "24px", margin: "20px 0", fontWeight: "bold", fontStyle: "italic" }}>
      Lista de contactos de StarClinic ({nbOfContacts})
      </h3>
      <button onClick={() => toggleModal(true)} className="btn btn-add-contact">
        <i className="bi bi-plus-square"></i> Añadir nuevo contacto
      </button>

      </div>
    </header>
  );
};

export default Header;
