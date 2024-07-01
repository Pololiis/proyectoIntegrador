import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import emailjs from "emailjs-com";
import CrearUsuario from "./crearUsuario";

vi.mock("axios");
vi.mock("emailjs-com");


describe("CrearUsuario component", () => {
  let mockFn = vi.fn();
  beforeEach(() => {
    render(<CrearUsuario />);
  });

  test("should render the form fields", () => {
    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByText("Apellido:")).toBeInTheDocument();
    expect(screen.getByText("E-Mail:")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Nacimiento:")).toBeInTheDocument();
    expect(screen.getByText("Contraseña:")).toBeInTheDocument();
  });

  test("should display error messages for invalid form fields", async () => {
    const nombreInput = screen.getByText("Nombre:");
    const apellidoInput = screen.getByText("Apellido:");
    const emailInput = screen.getByText("E-Mail:");
    const fechaNacimientoInput = screen.getByText("Fecha de Nacimiento:");
    const contraseniaInput = screen.getByText("Contraseña:");
    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    await fireEvent.click(submitButton);

    await (() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
      expect(screen.getByText("El apellido es requerido")).toBeInTheDocument();
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
      expect(screen.getByText("La fecha de nacimiento es requerida")).toBeInTheDocument();
      expect(screen.getByText("La contraseña es requerida")).toBeInTheDocument();
    });

    userEvent.type(nombreInput, "A");
    userEvent.type(apellidoInput, "B");
    userEvent.type(emailInput, "invalid-email");
    userEvent.type(fechaNacimientoInput, "2022-01-01");
    userEvent.type(contraseniaInput, "passwo");

    fireEvent.click(submitButton);

    await (() => {
      expect(screen.getByText("El nombre es muy corto")).toBeInTheDocument();
      expect(screen.getByText("El apellido es muy corto")).toBeInTheDocument();
      expect(screen.getByText("El email es invalido")).toBeInTheDocument();
      expect(screen.getByText("La contraseña debe tener al menos 8 caracteres")).toBeInTheDocument();
    });
  });
  test("should display usuario registrado con exito", async () => {
    const nombreInput = screen.getByText("Nombre:");
    const apellidoInput = screen.getByText("Apellido:");
    const emailInput = screen.getByText("E-Mail:");
    const fechaNacimientoInput = screen.getByText("Fecha de Nacimiento:");
    const contraseniaInput = screen.getByText("Contraseña:");
    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    await fireEvent.click(submitButton);

    await (() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
      expect(screen.getByText("El apellido es requerido")).toBeInTheDocument();
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
      expect(screen.getByText("La fecha de nacimiento es requerida")).toBeInTheDocument();
      expect(screen.getByText("La contraseña es requerida")).toBeInTheDocument();
    });

    userEvent.type(nombreInput, "John");
    userEvent.type(apellidoInput, "Doe");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(fechaNacimientoInput, "1990-01-01");
    userEvent.type(contraseniaInput, "Password123!");

    await fireEvent.click(submitButton);

    await (() => {
      expect(screen.getByText("Usuario Registrado con éxito")).toBeInTheDocument();
    });
  });
  /*
  test("should submit the form successfully", async () => {
    const nombreInput = screen.getByText("Nombre:");
    const apellidoInput = screen.getByText("Apellido:");
    const emailInput = screen.getByText("E-Mail:");
    const fechaNacimientoInput = screen.getByText("Fecha de Nacimiento:");
    const contraseniaInput = screen.getByText("Contraseña:");
    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    const mockResponse = {
      data: {
        message: "Usuario registrado exitosamente",
      },
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    userEvent.type(nombreInput, "John");
    userEvent.type(apellidoInput, "Doe");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(fechaNacimientoInput, "1990-01-01");
    userEvent.type(contraseniaInput, "Password123!");

    await fireEvent.click(submitButton);

    await (() => {
      expect(screen.getByText("Usuario Registrado con éxito")).toBeInTheDocument();
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}usuarios/nuevo`,
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_edy99o7",
      "template_fk62684",
      {
        to_email: "john.doe@example.com",
        to_name: "John",
      },
      "xuAeGJr1E_Q9WvTkO"
    );
  });

  test("should display error message when form submission fails", async () => {
    const nombreInput = screen.getByText("Nombre:");
    const apellidoInput = screen.getByText("Apellido:");
    const emailInput = screen.getByText("E-Mail:");
    const fechaNacimientoInput = screen.getByText("Fecha de Nacimiento:");
    const contraseniaInput = screen.getByText("Contraseña:");
    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    const mockError = new Error("Failed to register user");

    axios.post.mockRejectedValueOnce(mockError);

    userEvent.type(nombreInput, "John");
    userEvent.type(apellidoInput, "Doe");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(fechaNacimientoInput, "1990-01-01");
    userEvent.type(contraseniaInput, "Password123!");

    await fireEvent.click(submitButton);

    await (() => {
      expect(screen.getByText("Error al registrar el Usuario")).toBeInTheDocument();
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}usuarios/nuevo`,
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(emailjs.send).not.toHaveBeenCalled();
  });*/
});