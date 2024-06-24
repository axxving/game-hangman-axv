// Arreglo de palabras aleatorias de animales en mayusculas
let words = [
  "LEON",
  "GATO",
  "PERRO",
  "OSO",
  "CONEJO",
  "TIGRE",
  "MONO",
  "CABALLO",
  "VACA",
  "GALLINA",
];

export const getRandomWord = () => {
    // Seleccionar una palabra aleatoria del arreglo
    let randomWord = Math.floor(Math.random() * words.length);
    // return words[randomIndex];
    return words[randomWord];
}