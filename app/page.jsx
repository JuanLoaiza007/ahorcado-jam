"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    "Juan David Loaiza Santiago",
    "Juan Sebastian Muñoz Rojas",
    "Julián David Rendon Cardona",
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-8"
      style={{ backgroundImage: "url('/images/home/ahorcado.png')" }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-8 drop-shadow-lg">
          Juego del Ahorcado
        </h1>
        <button
          onClick={() => router.push("/juego")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300"
        >
          Nuevo Juego
        </button>
      </div>

      {/* Botón fijo de ayuda */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-lg transition duration-300 z-50"
        title="Información del equipo"
      >
        ?
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Equipo Desarrollador
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-gray-700 text-lg">
                  • {member}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
