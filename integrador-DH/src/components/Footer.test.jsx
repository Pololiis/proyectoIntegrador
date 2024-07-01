import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer component", () => {
  test("should render the logo", () => {
    render(<Footer />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  test("should render the copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText("© 2024 gameShare. Todos los derechos reservados.");
    expect(copyrightText).toBeInTheDocument();
  });
});