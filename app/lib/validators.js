import { ALPHABET } from "./constants.js";

/**
 * Verifica si la entrada es una letra válida
 * @param {string} char
 * @returns {boolean}
 */
export function isValidLetter(char) {
  return char.length === 1 && ALPHABET.includes(char.toLowerCase());
}

/**
 * Verifica si la letra ya fue intentada
 * @param {Set<string>} guessedLetters
 * @param {string} char
 * @returns {boolean}
 */
export function isAlreadyGuessed(guessedLetters, char) {
  return guessedLetters.has(char.toLowerCase());
}
