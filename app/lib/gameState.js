import { MAX_WRONG, STATUS } from "./constants.js";
import { getRandomWord } from "./wordProvider.js";

/**
 * Crea un estado inicial de juego
 * @returns {import("./types").GameState}
 */
export function createGameState() {
  const word = getRandomWord();
  return {
    word,
    revealed: Array(word.length).fill("_"),
    guessedLetters: new Set(),
    wrongGuesses: 0,
    maxWrong: MAX_WRONG,
    status: STATUS.PLAYING,
  };
}
