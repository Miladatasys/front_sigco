import React, { useEffect } from "react";
import Contact from "./Contact";

const ContactList = ({ data, currentPage, getAllContacts }) => {
  const reloadContacts = async () => {
    await getAllContacts(currentPage);
  };

  useEffect(() => {
    reloadContacts();
  }, [currentPage]); // Recargar contactos cuando cambia la página actual

  return (
    <main className="main" style={{}}>
      {data?.content?.length === 0 && (
        <div>No hay contactos, por favor agrega tus contactos</div>
      )}

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

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => getAllContacts(currentPage - 1)}
            className={currentPage === 0 ? "disabled" : ""}
          >
            &laquo;
          </button>

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
