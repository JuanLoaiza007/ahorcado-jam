import { STATUS } from "./constants.js";
import { isValidLetter, isAlreadyGuessed } from "./validators.js";

/**
 * Procesa un intento de letra y devuelve un nuevo estado
 * @param {import("./types").GameState} state
 * @param {string} letter
 * @returns {import("./types").GameState}
 */
export function guessLetter(state, letter) {
  const char = letter.toLowerCase();

  // Validaciones
  if (!isValidLetter(char) || isAlreadyGuessed(state.guessedLetters, char)) {
    return state; // no cambia el estado
  }

  const newGuessedLetters = new Set(state.guessedLetters);
  newGuessedLetters.add(char);

  let newRevealed = [...state.revealed];
  let newWrongGuesses = state.wrongGuesses;
  let newStatus = state.status;

  if (state.word.includes(char)) {
    // Revelar letras correctas
    state.word.split("").forEach((c, i) => {
      if (c === char) newRevealed[i] = char;
    });

    // Verificar victoria
    if (!newRevealed.includes("_")) {
      newStatus = STATUS.WON;
    }
  } else {
    // Error
    newWrongGuesses++;
    if (newWrongGuesses >= state.maxWrong) {
      newStatus = STATUS.LOST;
    }
  }

  return {
    ...state,
    revealed: newRevealed,
    guessedLetters: newGuessedLetters,
    wrongGuesses: newWrongGuesses,
    status: newStatus,
  };
}

/**
 * Reinicia el juego con nueva palabra
 * @param {() => import("./types").GameState} createGameState
 * @returns {import("./types").GameState}
 */
export function restartGame(createGameState) {
  return createGameState();
}
