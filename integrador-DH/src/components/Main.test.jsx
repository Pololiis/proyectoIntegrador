import { describe,test,expect } from "vitest";


function shuffleArray(array) {
    const shuffledArray = array.slice(); // Crear una copia del array para no mutar el original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
describe("Test shuffleArray", () => {
  test("should shuffle the array", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);
    expect(shuffledArray).not.toEqual(array);
  });

  test("should not modify the original array", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);
    expect(shuffledArray).not.toBe(array);
  });

  test("should have the same elements as the original array", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);
    expect(shuffledArray.sort()).toEqual(array.sort());
  });
});