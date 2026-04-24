import React from "react";
import "../styles/UserUpdate.css";

export const UserUpdate = ({ usuario: user, onClose, onSave }) => {
  const [userName, setUserName] = React.useState(user?.nombre || "");
  const [email, setEmail] = React.useState(user?.correo_electronico || "");
  const [rol, setRol] = React.useState(user?.name_rol || "");

  if (!user) return null;

  const handleSave = () => {
    onSave({
      ...user,
      nombre: userName,
      correo_electronico: email,
      name_rol: rol,
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <h2 className="modal-title">Actualizar usuario</h2>

        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa el correo electrónico"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Rol</label>
          <input
            type="text"
            className="form-input"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            placeholder="Asignar al usuario"
          />
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
