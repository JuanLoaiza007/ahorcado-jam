"use client";
import { useRouter } from "next/navigation";

export default function Juego() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Izquierda: Espacio para imagen del ahorcado */}
          <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Imagen del Ahorcado
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

            {/* Botón salir abajo a la derecha */}
            <div className="flex justify-end">
              <button
                onClick={() => router.push("/")}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
