// Importa las dependencias necesarias de la biblioteca 'react'
import React from "react";
import { Link } from "react-router-dom";

// Define una función dummy 'reloadContacts' que actualmente está vacía
const reloadContacts = () => { };

// Define un componente funcional 'Contact' que recibe una propiedad 'contact'
const Contact = ({ contact }) => {

  // Define una función asíncrona 'handleReloadContacts' para manejar la recarga de contactos
  const handleReloadContacts = async () => {
    // Verifica si 'reloadContacts' es verdadero (siempre es verdadero en este caso)
    if (reloadContacts) {
      // Si es así, espera la ejecución de la función 'reloadContacts'
      await reloadContacts();
    }
  };

  // Renderiza un componente Link de 'react-router-dom' para manejar la navegación
  return (
    <Link
      // Establece la URL de destino basada en el ID del contacto
      to={`/contacts/${contact.id}`}
      // Aplica clases de CSS para dar estilo
      className="contact__item"
      // Adjunta la función 'handleReloadContacts' al evento de clic
      onClick={handleReloadContacts}
    >
      {/* Sección del encabezado del contacto */}
      <div className="contact__header">
        {/* Muestra la imagen del contacto */}
        <div className="contact__image">
          <img src={contact.photoUrl} alt={contact.name} />
        </div>
        {/* Muestra el nombre y el título del contacto */}
        <div className="contact__details">
          <p className="contact_name">{contact.name.substring(0, 15)} </p>
          <p className="contact_title">{contact.title}</p>
        </div>
      </div>

      {/* Sección del cuerpo del contacto */}
      <div className="contact__body">
        {/* Muestra el correo electrónico del contacto */}
        <p>
          <i className="bi bi-envelope"></i> {contact.email.substring(0, 20)}{" "}
        </p>
        {/* Muestra la dirección del contacto */}
        <p>
          <i className="bi bi-geo"></i> {contact.address}
        </p>
        {/* Muestra el número de teléfono del contacto */}
        <p>
          <i className="bi bi-telephone"></i> {contact.phone}
        </p>
        {/* Muestra el estado del contacto con un ícono basado en la disponibilidad */}
        <p>
          {contact.status === "Disponible" ? (
            <i className="bi bi-check-circle"></i>
          ) : (
            <i className="bi bi-x-circle"></i>
          )}{" "}
          {contact.status}
        </p>
      </div>
    </Link>
  );
};

// Exporta el componente 'Contact' como la exportación predeterminada
export default Contact;
