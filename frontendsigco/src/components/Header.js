import React from "react";

const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    // Encabezado de la aplicación
    <header className="header">
      {/* Logo de la aplicación */}
      <img
        src="https://i.imgur.com/QCI8Lpm.png"
        height={140}
        style={{ marginLeft: "50px", marginTop: "50px" }}
        alt="Logo"
      />

      {/* Contenedor del título y el botón para agregar un nuevo contacto */}
      <div className="container">
        {/* Título de la lista de contactos */}
        <h3 style={{ fontSize: "24px", margin: "20px 0", fontWeight: "bold", fontStyle: "italic" }}>
          Lista de contactos de StarClinic ({nbOfContacts})
        </h3>

        {/* Botón para abrir el modal de agregar nuevo contacto */}
        <button onClick={() => toggleModal(true)} className="btn btn-add-contact">
          <i className="bi bi-plus-square"></i> Añadir nuevo contacto
        </button>
      </div>
    </header>
  );
};

export default Header;
