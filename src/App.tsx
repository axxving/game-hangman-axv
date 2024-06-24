import { useEffect, useState } from "react";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getRandomWord } from "./helpers/getRandomWords";

export const App = () => {
  // useState de la palabra
  const [word, setWord] = useState(getRandomWord);

  // Estado que sirve para verificar si el usuario perdio
  const [lose, setLose] = useState(false);

  // Estado que sirve para verificar si el usuario gano
  const [won, setWon] = useState(false);

  // useState de la palabra oculta
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  // useState de los intentos
  const [attemps, setAttemps] = useState(0);

  // Si el usuario perdio
  useEffect(() => {
    if (attemps >= 9) {
      setLose(true);
    }
  }, [attemps]);

  useEffect(() => {
    // Pasa a un formato valido sin espacios
    const currentHiddenWord = hiddenWord.split(" ").join("");
    // Verifica si el usuario gano
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    // Verificar el estado de si el usuario perdio o gano para que pueda correr
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)) {
      // Aumenta el numero de intentos y mantiene el numero en 9
      setAttemps(Math.min(attemps + 1, 9));
    }

    // Nuevo array con separaciones de un espacio
    let arrayHideenWord = hiddenWord.split(" ");
    console.log(arrayHideenWord);

    // Cambiando el valor de un elemento del array de 'arrayHideenWord' que coincida con la letra ingresada por el usuario
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        arrayHideenWord[i] = letter;
      }
    }

    setHiddenWord(arrayHideenWord.join(" "));
  };

  const newGame = () => {
    // Nueva palabra secreta
    setWord(getRandomWord);
    // Reinicia el estado de la palabra oculta
    setHiddenWord("_ ".repeat(word.length));
    // Reinicia el estado de intentos
    setAttemps(0);
    // Reinicia el estado de perder o ganar
    setLose(false);
    setWon(false);
  }

  return (
    <div className="app">
      {/** Imagen del juego */}
      <HangImage imageNumber={attemps} />

      {/** Palabra oculta */}
      <h3>{hiddenWord}</h3>

      {/** Contador de intentos */}
      <h2>Intentos: {attemps}</h2>

      {/** Mensajes de si el usuario gano o perdio */}
      {lose ? <p>Perdiste {word}</p> : ""}

      {won ? <p>Felicitaciones! Ganaste!</p> : ""}

      {/** Botones de letras */}
      <div className="teclasContainer">
        {letters.map((letter) => {
          return (
            <button onClick={() => checkLetter(letter)} key={letter}>
              {letter}
            </button>
          );
        })}
      </div>

      {/** Reinicia */}
      <button onClick={newGame} className="nuevoJuego">Nuevo juego</button>
    </div>
  );
};
