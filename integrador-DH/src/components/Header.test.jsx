import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import App from "../App";

describe("Header component", () => {
  test("should render the NavBar component  Eslogan", () => {
    render(<App />);
    const navBar = screen.getByText("¡Juega más, paga menos!");
    expect(navBar).toBeInTheDocument();
  });
  test("should render the NavBar component Boton Inicio", () => {
    render(<App />);
    const navBar2 = screen.getByText("Inicio");
    expect(navBar2).toBeInTheDocument();
  });
  test("should render the NavBar component logo", () => {
    render(<App />);
    const navBar3 = screen.queryAllByText("logo");
    expect(navBar3).toBeDefined();
  });
});