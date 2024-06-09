import { describe,test,expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Main from "../components/Main";
import App from "../App";


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


describe("Main component", () => {
  test("should render the welcome message", () => {
    render(<App />);
    const welcomeMessage = screen.getByText("Bienvenido a");
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("should render the GameShare title", () => {
    render(<App />);
    const gameShareTitle = screen.getByText("GameShare");
    expect(gameShareTitle).toBeInTheDocument();
  });

  test("should render the start button", () => {
    render(<App />);
    const startButton = screen.getByText("Comenzar!");
    expect(startButton).toBeInTheDocument();
  });

  test("should render the platforms section", () => {
    render(<App />);
    const platformsSection = screen.getByText("Plataformas");
    expect(platformsSection).toBeInTheDocument();
  });

  test("should render the search bar", () => {
    render(<App />);
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
  });

  test("should render the recommended games section", () => {
    render(<App />);
    const recommendedGamesSection = screen.getAllByText("Recomendados");
    expect(recommendedGamesSection).toBeDefined();
  });
});