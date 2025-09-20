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

  // Navegar a game-over cuando el juego termine
  useEffect(() => {
    if (gameState.status === "won" || gameState.status === "lost") {
      router.push(
        `/game-over?result=${gameState.status}&word=${gameState.word}`
      );
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
    </div>
  );
}
