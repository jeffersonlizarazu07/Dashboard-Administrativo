import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "./api";


// Verificación de token
export const ProtectedRoute = ({ children }) => {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const verificarAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/verify`, {
          credentials: "include",
        });
        if (!cancelado && response.ok) setAutenticado(true);
        else if (!cancelado) setAutenticado(false);
      } catch (error) {
        if (!cancelado) (setAutenticado(false), error);
      }
    };

    verificarAuth();
    return () => {
      cancelado = true;
    };
  }, []);

  if (autenticado === null) return <p>Cargando...</p>;

  return autenticado ? children : <Navigate to="/login" replace />;
};
