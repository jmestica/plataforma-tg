//Routing
import { Routes, Route, BrowserRouter } from "react-router-dom";

//Styles
import "./App.css";

//Pages - Components
import LayoutDashboard from './components/LayoutDashboard/LayoutDashboard'
import Home from "./pages/Home/Home";
import Noticias from "./pages/Noticias/Noticias";
import Buscador from "./pages/Buscador/Buscador";
import { Asistencia } from "./pages/Asistencia/Asistencia";
import Herramientas from "./pages/Herramientas/Herramientas";
import Equipos from "./pages/Equipos/Equipos";
import Asesores from "./pages/Asesores/Asesores";
import Estadisticas from "./pages/Estadisticas/Estadisticas";
import Perfil from "./pages/Perfil/Perfil";
import Login from  "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import CargarEmpresa from "./pages/CargarEmpresa/CargarEmpresa";
import PerfilAsesor from "./pages/PerfilAsesor/PerfilAsesor";
import { InfoEmpresa } from "./pages/InfoEmpresa/InfoEmpresa";
import Error404 from "./pages/404/Error404";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

            {/* ===========================  Temporal para hacer pantallas de login y registro ==================================== */}
   
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Registro/>}/>

            <Route path="/" element={<LayoutDashboard/>}>


              <Route index element={<Home/>}/>
              <Route path="noticias" element={<Noticias/>}/>
              <Route path="buscador" element={<Buscador/>} />
              <Route path="asistencias" element={<Asistencia/>} />
              <Route path="cargarempresa" element={<CargarEmpresa/>}/>
              <Route path="info-general/:id" element={<InfoEmpresa/>}/>

              <Route path="herramientas" element={<Herramientas/>} />
              <Route path="catalogo" element={<Herramientas/>} />
              <Route path="equipos" element={<Equipos/>}/>
              <Route path="asesores" element={<Asesores/>}/>
              <Route path="estadisticas" element={<Estadisticas/>}/>
              <Route path="perfil" element={<Perfil/>}/>

              <Route path="asesor/:id" element={<PerfilAsesor/>}/>



            </Route>

            <Route path="*" element={<Error404/>}/>

        </Routes>
      </BrowserRouter>
    
    
    </>
  );
}

export default App;
