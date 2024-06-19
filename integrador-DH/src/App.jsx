import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/routes/Home";
import Carrito from "./components/routes/Carrito";
import Categorias from "./components/routes/Categorias";
import UsuarioPanel from "./components/routes/UsuarioPanel";
import DetalleProducto from "./components/routes/DetalleProducto";
import CrearUsuario from "./components/routes/crearUsuario";
import AbmPlataforma from "./components/routes/AbmPlataforma";
import Panel from "./components/routes/Panel";
import DetalleReserva from "./components/routes/DetalleReserva";
import  {AuthProvider} from "./components/context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
       <AuthProvider>
          <Routes>

            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/usuario" element={<UsuarioPanel />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/administrador" element={<Panel />} />
              <Route path="/plataforma" element={<AbmPlataforma />} />
              <Route path="/crearUsuario" element={<CrearUsuario />} />
              <Route
                path="/detalleProducto/:id"
                element={<DetalleProducto />}
              />
              <Route path="/detalleReserva/:id" element={<DetalleReserva />} />
              <Route path="*" element={<h1>404</h1>} />
            </Route>
          </Routes>
          </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
