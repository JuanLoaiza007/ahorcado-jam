const WORDS = ["javascript", "nextjs", "react", "node", "frontend"];

/**
 * Retorna una palabra aleatoria de la lista
 * @returns {string}
 */
export function getRandomWord() {
  const idx = Math.floor(Math.random() * WORDS.length);
  return WORDS[idx];
}
