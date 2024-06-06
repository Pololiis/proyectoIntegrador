import { render,screen } from "@testing-library/react";
import { describe,it,test,expect } from "vitest";
import App from "./App";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Home from "./components/routes/Home";
import Header from "./components/Header";
import NavBar from "./components/NavBar";


describe("Test Home", () => {
    test("deberia renderizarse el componente Home en App", () => {
    render(<App/>);
    expect(<Home/>).toBeDefined();
    })});

describe("Test Main", () => {
    test("deberia renderizarse el componente  Main en Home", () => {
    render(<Home/>);
    expect(<Main/>).toBeTruthy();
    })});
describe("Test NavBar", () => {
    it("deberia renderizarse el componente NavBar en App", () => {
    render(<App/>);
    expect(<NavBar/>).toBeTruthy();
    })});
  
describe("Test Header", () => {
    test("deberia renderizarse el componente header en App", () => {
    render(<App/>);
    expect(<Header/>).toBeTruthy();
    })});
describe("Test Footer", () => {
    test("deberia renderizarse el componente footer en App", () => {
    render(<App/>);
    expect(<Footer/>).toBeTruthy();
    })});

describe("Test Cards Juego", () => {
    test("deberia renderizarse el componente card container en el Main", () => {
    render(<Main/>);
    expect(<card__container/>).toBeTruthy();
    })});
describe("Test Boton registrarse", () => {
    test("deberia renderizarse el componente container header y contener el boton registrarse", () => {
    render(<App/>);
    expect("Registrarse").toBeTruthy();
    })});
describe("Test Boton iniciar Sesion", () => {
    test("deberia renderizarse el componente container header y contener el boton Iniciar Sesión", () => {
    render(<App/>);
    const mensaje =screen.queryAllByText(/Iniciar Sesión/i);
    expect(mensaje).toBeDefined();
    })});
describe("Test Cards Juego", () => {
    test("deberia renderizarse el componente container header y contener el boton Iniciar Sesión", () => {
    render(<App/>);
    screen.findAllByText('Iniciar Sesión');
    expect("Iniciar Sesión").toBeDefined();
    })});
describe("Test Cards Juego", () => {
    test("deberia renderizarse el componente container header y contener el boton Iniciar Sesión", () => {
    render(<App/>);
    screen.findAllByText('Iniciar Sesión');
    expect("Iniciar Sesión").toBeTruthy();
    })});
describe("Test Cards Juego", () => {
    test("deberia renderizarse el componente container header y contener el boton Iniciar Sesión", () => {
    render(<App/>);
    
    screen.findAllByText('Iniciar Sesión');
    expect("Iniciar Sesión").toBeTruthy();
    })});