"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function GameOver() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gameResult = searchParams.get("result") || "victoria";
  const word = searchParams.get("word") || "";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {gameResult === "won" ? "¡Victoria!" : "Derrota"}
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          {gameResult === "won"
            ? "¡Felicidades! Has ganado el juego."
            : `Lo siento, has perdido. La palabra era: ${word}. ¡Inténtalo de nuevo!`}
        </p>

        {/* Espacio para estadísticas */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Estadísticas
          </h2>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span>Juegos jugados:</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Victorias:</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Derrotas:</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Mejor racha:</span>
              <span className="font-bold">0</span>
            </div>
          </div>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => router.push("/juego")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
