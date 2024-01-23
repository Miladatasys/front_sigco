import React, { useEffect } from "react";
import Contact from "./Contact";

const ContactList = ({ data, currentPage, getAllContacts }) => {
  // Función para recargar los contactos al hacer clic en los botones de paginación
  const reloadContacts = async () => {
    await getAllContacts(currentPage);
  };

  // Efecto secundario que se ejecuta cuando cambia la página actual
  useEffect(() => {
    // El efecto puede ser utilizado para realizar acciones específicas cuando cambia la página
    // Por ejemplo, podrías realizar una operación específica cada vez que currentPage cambie
  }, [currentPage]);

  return (
    <main
      className="main"
      style={{
        backgroundColor: "rgba(173, 216, 230, 0.8)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Mensaje si no hay contactos */}
      {data?.content?.length === 0 && (
        <div>No hay contactos, por favor agrega tus contactos</div>
      )}

      {/* Lista de contactos */}
      <ul className="contact__list">
        {data?.content?.length > 0 &&
          data.content.map((contact) => (
            <Contact
              contact={contact}
              key={contact.id}
              reloadContacts={reloadContacts}
            />
          ))}
      </ul>

      {/* Paginación si hay más de una página de contactos */}
      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          {/* Botón para ir a la página anterior */}
          <button
            onClick={() => getAllContacts(currentPage - 1)}
            className={currentPage === 0 ? "disabled" : ""}
          >
            &laquo;
          </button>

          {/* Botones para cada página */}
          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <button
                onClick={() => getAllContacts(page)}
                className={currentPage === page ? "active" : ""}
                key={page}
              >
                {page + 1}
              </button>
            ))}

          {/* Botón para ir a la página siguiente */}
          <button
            onClick={() => getAllContacts(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
          >
            &raquo;
          </button>
        </div>
      )}
    </main>
  );
};

export default ContactList;
