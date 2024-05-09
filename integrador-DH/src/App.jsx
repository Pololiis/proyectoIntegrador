import {Route, Routes, BrowserRouter} from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./components/routes/Home"
import Tienda from "./components/routes/About"
import Carrito from "./components/routes/Contact"


import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/carrito" element={<Carrito/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
