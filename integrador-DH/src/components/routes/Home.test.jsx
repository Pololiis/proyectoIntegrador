import { render, screen } from "@testing-library/react";

import App from "../../App";

describe("Home component", () => {
  test("should render the Main component", () => {
    render(<App />);
    const mainComponent = screen.getByText("¡Juega más, paga menos!");
    expect(mainComponent).toBeInTheDocument();
  });
});