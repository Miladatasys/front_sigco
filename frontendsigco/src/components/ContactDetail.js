import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getContact,
  deleteContact as apiDeleteContact,
} from "../api/ContactService";
import { toastError, toastSuccess } from "../api/ToastService";

import ContactList from "./ContactList"; // Importa el componente ContactList



const ContactDetail = ({ updateContact, updateImage, reloadContacts }) => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
    photoUrl: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);

  //const closeModal = () => {
  //  setModalOpen(false);
  //};
  const { id } = useParams();


  const handleGoBack = () => {
    // Utiliza reload() para recargar la página actual
    window.location.reload();
    // Luego, navega a la nueva página
    window.location.href = "/contacts";
  };


  const fetchContact = async (id) => {
    try {
      const { data } = await getContact(id);
      setContact(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const selectImage = () => {
    inputRef.current.click();
  };

  const updatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setContact((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));
      toastSuccess("Foto actualizada");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const onUpdateContact = async (event) => {
    event.preventDefault();
    await updateContact(contact);
    fetchContact(id);
    toastSuccess("Contacto actualizado!");
  };

  const onDeleteContact = async () => {
    // Abre la modal al intentar eliminar el contacto
    setModalOpen(true);
  };

  const confirmDeleteContact = async () => {
    try {
      await apiDeleteContact(contact.id);
      toastSuccess("Contacto eliminado");
      // Cierra la modal después de eliminar el contacto
      setModalOpen(false);

      // Agrega cualquier lógica adicional después de la eliminación, como redireccionar a la lista de contactos
      navigate("/contacts"); // Redirige a la lista de contactos
      window.location.reload();
    } catch (error) {
      console.log(error);
      toastError("Error al eliminar el contacto");
    }
  };

  useEffect(() => {
    fetchContact(id);
  }, [id]);


  return (
    <>
      <Link to={"/contacts"} className="link" onClick={handleGoBack} >
        <i className="bi bi-arrow-left"></i> Volver a la lista
      </Link>
      <div className="profile">
        <div className="profile__details">
          <img
            src={contact.photoUrl}
            alt={`Foto de ${contact.name}`}
          />
          <div className="profile__metadata">
            <p className="profile__name">{contact.name}</p>
            <p className="profile__muted">
              JPG, GIF, or PNG. Tamaño máximo de 10Mb
            </p>
            <button onClick={selectImage} className="btn">
              <i className="bi bi-cloud-upload"></i> Cambiar foto
            </button>
          </div>
        </div>
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateContact} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={contact.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Nombre</span>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={onChange}
                    name="name"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Correo</span>
                  <input
                    type="text"
                    value={contact.email}
                    onChange={onChange}
                    name="email"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Teléfono de contacto</span>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={onChange}
                    name="phone"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Dirección</span>
                  <input
                    type="text"
                    value={contact.address}
                    onChange={onChange}
                    name="address"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Cargo</span>
                  <input
                    type="text"
                    value={contact.title}
                    onChange={onChange}
                    name="title"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Estado</span>
                  <input
                    type="text"
                    value={contact.status}
                    onChange={onChange}
                    name="status"
                    required
                  />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={onDeleteContact}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => updatePhoto(event.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>

      {/* Modal para confirmar la eliminación */}
      {isModalOpen && (
        <div className="modalBorrar">
          <p>¿Estás seguro de que quieres eliminar este contacto?</p>
          <button type="button" className="btn btn-danger" onClick={confirmDeleteContact}>Sí, eliminar</button>
          <button type="button" className="btn btn" onClick={() => setModalOpen(false)}>Cancelar</button>
        </div>
      )}

      {/* Agrega el componente ContactList para mostrar la lista actualizada después de editar o eliminar */}
      <ContactList currentPage={0} getAllContacts={() => { }} />
    </>
  );
};

export default ContactDetail;
