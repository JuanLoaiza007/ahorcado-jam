"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SPRITE_MONIGOTE from "../constants/images";

export default function Juego() {
  const router = useRouter();
  const [currentKey, setCurrentKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [monigoteLevel, setMonigoteLevel] = useState(0); // Estado inicial del monigote

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Función para manejar la pulsación de teclas
  const handleKeyPress = (key) => {
    setCurrentKey(key.toUpperCase());
    setShowKey(true);

    // Ocultar la tecla después de 5 segundos
    setTimeout(() => {
      setShowKey(false);
    }, 5000);
  };

  // Escuchar eventos del teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      // Solo aceptar letras A-Z (mayúsculas y minúsculas)
      if (/^[a-zA-Z]$/.test(key) && key.length === 1) {
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Botón volver al menú principal en esquina superior izquierda */}
      <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={() => router.push("/")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Volver al Menú Principal
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Izquierda: Espacio para imagen del ahorcado */}
          <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={SPRITE_MONIGOTE[monigoteLevel]}
                alt={`Estado del ahorcado: ${monigoteLevel}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Derecha: Cuadros para letras */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Palabra</h2>
            <div className="grid grid-cols-8 gap-2 mb-8">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl font-bold bg-white"
                >
                  {/* Placeholder vacío */}
                </div>
              ))}
            </div>

            {/* Texto "Escriba una letra" */}
            <div className="text-center mb-4">
              <p className="text-lg text-gray-600">Escriba una letra</p>
            </div>

            {/* Botón para abrir teclado en móviles - solo visible en móviles */}
            {isMobile && (
              <div className="text-center mb-4">
                <button
                  onClick={() => {
                    // En móviles, esto debería abrir el teclado virtual
                    const input = document.createElement("input");
                    input.type = "text";
                    input.style.position = "absolute";
                    input.style.opacity = "0";
                    input.style.pointerEvents = "none";
                    document.body.appendChild(input);
                    input.focus();
                    setTimeout(() => document.body.removeChild(input), 100);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Abrir Teclado
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mostrar tecla pulsada en tarjeta inferior */}
        {showKey && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-2 border-blue-500">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {currentKey}
              </div>
              <p className="text-sm text-gray-600">Tecla pulsada</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
