import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import Login from './components/Login'; 
import { getContacts, saveContact, udpatePhoto } from "./api/ContactService";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import { toastError } from "./api/ToastService";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "Disponible", // Establecer un valor predeterminado para el estado de cuenta
  });
  const [validationErrors, setValidationErrors] = useState({});

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    // Lógica de validación
    let newValue = value;

    if (name === 'name') {
      // Permitir solo caracteres alfabéticos para el campo de nombre
      newValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'phone') {
      // Permitir solo caracteres numéricos para el campo de teléfono
      newValue = value.replace(/\D/g, '+');
    }

    // Actualizar el estado con el valor validado
    setValues({ ...values, [name]: newValue });
  };

  const handleNewContact = async (event) => {
    event.preventDefault();

    // Validaciones antes de enviar el formulario
    const errors = {};
    if (!values.name.trim()) {
      errors.name = 'El nombre es obligatorio.';
    }
    if (!values.email.trim()) {
      errors.email = 'El correo es obligatorio.';
    } else if (!values.email.includes('@gmail.com', '@live.com', '@acl.cl', '@outlook.com', '@outlook.es', '@live.es', '@hotmail.com', '.com', '.es', '.cl')) {
      errors.email = 'El correo debe tener el formato correcto "correo@example.com"';
    }
    if (!values.title.trim()) {
      errors.title = 'El cargo es obligatorio.';
    }
    if (!values.phone.trim()) {
      errors.phone = 'El número de contacto es obligatorio.';
    } else if (!values.phone.includes('+')) {
      errors.phone = 'El número debe tener el formato correcto "+"';
    }
    if (!values.address.trim()) {
      errors.address = 'La dirección es obligatoria.';
    }
    if (!values.status.trim()) {
      errors.status = 'El estado de cuenta es obligatorio.';
    }

    // Actualizar los errores y evitar enviar el formulario si hay errores
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors({});
    }

    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      await udpatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "Disponible", // Restablecer el valor predeterminado para el estado de cuenta
      });
      getAllContacts();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/contacts"} />} />
            <Route
              path="/contacts"
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  getAllContacts={getAllContacts}
                />
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <ContactDetail
                  updateContact={updateContact}
                  updateImage={updateImage}
                />
              }
            />
            <Route
              path="/login"
              element={<Login />}
            />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>Nuevo contacto</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Nombre</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
                {/* Mensaje de validación */}
                {validationErrors.name && <span className="validation-message">{validationErrors.name}</span>}
              </div>
              <div className="input-box">
                <span className="details">Correo</span>
                <input
                  type="text"
                  value={values.email}
                  onChange={onChange}
                  name="email"
                  required
                />
                {/* Mensaje de validación */}
                {validationErrors.email && <span className="validation-message">{validationErrors.email}</span>}
              </div>
              <div className="input-box">
                <span className="details">Cargo</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
                {/* Mensaje de validación */}
                {validationErrors.title && <span className="validation-message">{validationErrors.title}</span>}
              </div>
              <div className="input-box">
                <span className="details">Numero de contacto</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={onChange}
                  name="phone"
                  required
                />
                {/* Mensaje de validación */}
                {validationErrors.phone && <span className="validation-message">{validationErrors.phone}</span>}
              </div>
              <div className="input-box">
                <span className="details">Dirección</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  required
                />
                {/* Mensaje de validación */}
                {validationErrors.address && <span className="validation-message">{validationErrors.address}</span>}
              </div>
              <div className="input-box">
                <span className="details">Estado de cuenta</span>
                {/* Uso de un dropdown con clase personalizada */}
                <select
                  value={values.status}
                  onChange={onChange}
                  name="status"
                  className="custom-dropdown"
                  required
                >
                  <option value="Disponible">Disponible</option>
                  <option value="No disponible">No disponible</option>
                </select>
                {/* Mensaje de validación con clase personalizada */}
                {validationErrors.status && <span className="validation-message">{validationErrors.status}</span>}
              </div>
              <div className="file-input">
                <span className="details">Foto de perfil</span>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  ref={fileRef}
                  name="photo"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancelar
              </button>
              <button type="submit" className="btn">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
