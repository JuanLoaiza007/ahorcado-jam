"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GameOverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gameResult = searchParams.get("result") || "victoria";
  const word = searchParams.get("word") || "";
  const statsParam = searchParams.get("stats");

  // Parsear estadísticas del parámetro
  let stats = {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
  };

  if (statsParam) {
    try {
      stats = JSON.parse(decodeURIComponent(statsParam));
    } catch (error) {
      console.error("Error parsing stats:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {gameResult === "won"
            ? "¡Victoria!"
            : gameResult === "lost"
            ? "Derrota"
            : "Estadísticas"}
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          {gameResult === "won"
            ? "¡Felicidades! Has ganado el juego."
            : gameResult === "lost"
            ? `Lo siento, has perdido. La palabra era: ${word}. ¡Inténtalo de nuevo!`
            : "Aquí están tus estadísticas actuales:"}
        </p>

        {/* Estadísticas */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Estadísticas
          </h2>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <div className="flex justify-between">
                <span>Juegos jugados:</span>
                <span className="font-bold">{stats.gamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span>Victorias:</span>
                <span className="font-bold">{stats.wins}</span>
              </div>
              <div className="flex justify-between">
                <span>Derrotas:</span>
                <span className="font-bold">{stats.losses}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Racha actual:</span>
                <span className="font-bold">{stats.currentStreak}</span>
              </div>
              <div className="flex justify-between">
                <span>Mejor racha:</span>
                <span className="font-bold">{stats.bestStreak}</span>
              </div>
              <div className="flex justify-between">
                <span>Porcentaje de victorias:</span>
                <span className="font-bold">
                  {stats.gamesPlayed > 0
                    ? Math.round((stats.wins / stats.gamesPlayed) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => router.push("/juego")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            {gameResult === "stats" ? "Volver al Juego" : "Jugar de Nuevo"}
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

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-lg text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}

export default function GameOver() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GameOverContent />
    </Suspense>
  );
}
