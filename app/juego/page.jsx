"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SPRITE_MONIGOTE from "../constants/images";
import { createGameState } from "../lib/gameState.js";
import { guessLetter } from "../lib/gameActions.js";
import { ALPHABET } from "../lib/constants.js";

export default function Juego() {
  const router = useRouter();
  const [gameState, setGameState] = useState(() => createGameState());
  const [stats, setStats] = useState(() => ({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
  }));
  const [showExitModal, setShowExitModal] = useState(false);
  const [wordsGuessed, setWordsGuessed] = useState(0);

  // Manejar fin del juego
  useEffect(() => {
    if (gameState.status === "won") {
      // Incrementar contador de palabras adivinadas
      setWordsGuessed((prev) => prev + 1);

      // Actualizar estadísticas por victoria
      setStats((prevStats) => ({
        gamesPlayed: prevStats.gamesPlayed + 1,
        wins: prevStats.wins + 1,
        losses: prevStats.losses,
        currentStreak: prevStats.currentStreak + 1,
        bestStreak: Math.max(prevStats.bestStreak, prevStats.currentStreak + 1),
      }));

      // Reiniciar juego con nueva palabra pero mantener los errores acumulados
      setTimeout(() => {
        const newGameState = createGameState();
        // Mantener los errores acumulados de la sesión anterior
        newGameState.wrongGuesses = gameState.wrongGuesses;
        setGameState(newGameState);
      }, 800);
    } else if (gameState.status === "lost") {
      // Actualizar estadísticas por derrota y navegar
      setStats((prevStats) => {
        const newStats = {
          gamesPlayed: prevStats.gamesPlayed + 1,
          wins: prevStats.wins,
          losses: prevStats.losses + 1,
          currentStreak: 0,
          bestStreak: prevStats.bestStreak,
        };

        // Navegar a game-over con estadísticas actualizadas
        router.push(
          `/game-over?result=${gameState.status}&word=${
            gameState.word
          }&stats=${encodeURIComponent(JSON.stringify(newStats))}`
        );

        return newStats;
      });
    }
  }, [gameState.status, gameState.word, router]);

  // Función para manejar la pulsación de teclas
  const handleKeyPress = (key) => {
    const newState = guessLetter(gameState, key.toLowerCase());
    setGameState(newState);
  };

  // Escuchar eventos del teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      // Solo aceptar letras A-Z (mayúsculas y minúsculas)
      if (/^[a-zA-Z]$/.test(key) && key.length === 1) {
        const newState = guessLetter(gameState, key.toLowerCase());
        setGameState(newState);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Barra superior con botones y contador */}
      <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Volver al Menú Principal
          </button>

          {/* Botón para ver estadísticas */}
          <button
            onClick={() => {
              router.push(
                `/game-over?result=stats&word=&stats=${encodeURIComponent(
                  JSON.stringify(stats)
                )}`
              );
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Ver Estadísticas
          </button>
        </div>

        {/* Contador de palabras adivinadas */}
        <div className="bg-green-100 border-2 border-green-300 rounded-lg px-4 py-2">
          <div className="text-sm text-green-700 font-medium">
            Palabras Adivinadas
          </div>
          <div className="text-2xl font-bold text-green-800">
            {wordsGuessed}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Izquierda: Espacio para imagen del ahorcado */}
          <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={SPRITE_MONIGOTE[gameState.wrongGuesses]}
                alt={`Estado del ahorcado: ${gameState.wrongGuesses}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Derecha: Cuadros para letras */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Palabra</h2>
            <div
              className={`grid gap-2 mb-8 ${
                gameState.word.length > 8 ? "grid-cols-10" : "grid-cols-8"
              }`}
            >
              {gameState.revealed.map((letter, i) => (
                <div
                  key={i}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl font-bold bg-white"
                >
                  {letter}
                </div>
              ))}
            </div>

            {/* Texto "Escriba una letra o haga clic en una letra abajo" */}
            <div className="text-center mb-4">
              <p className="text-lg text-gray-600">
                Escriba una letra o haga clic en una letra abajo
              </p>
            </div>

            {/* Botones para letras A-Z */}
            <div className="grid grid-cols-13 gap-1 mb-4">
              {ALPHABET.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleKeyPress(letter)}
                  disabled={gameState.guessedLetters.has(letter)}
                  className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center text-sm font-bold transition duration-300 ${
                    gameState.guessedLetters.has(letter)
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
                  }`}
                >
                  {letter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de salida */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Salir del juego?
            </h2>
            <p className="text-gray-600 mb-6">
              Si sales ahora, perderás tu progreso actual y las estadísticas no
              se guardarán. ¿Estás seguro de que quieres volver al menú
              principal?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
