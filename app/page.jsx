import { createGameState } from "./lib/gameState";
import { guessLetter, restartGame } from "./lib/gameActions";


export default function Home() {
  // Crear partida
let game = createGameState();
console.log(game);

// Adivinar letras
game = guessLetter(game, "a");
console.log(game);

game = guessLetter(game, "r");
console.log(game);

game = guessLetter(game, "c");
console.log(game);

game = guessLetter(game, "e");
console.log(game);

game = guessLetter(game, "t");
console.log(game);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
