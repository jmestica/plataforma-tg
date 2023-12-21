import { Button } from "antd";
import "./Home.css";

// =============================IMG====================================
import landingImage from "../../assets/landing.png";
import searchImage from "../../assets/search.png";
import newsImage from "../../assets/news.png";
import asistenciaImage from '../../assets/asistencia.png';
import bookImage from '../../assets/book.png';

import HomeCard from "../../components/HomeCard/HomeCard";

function Home() {
  return (
    <div>
      {/* =============================HEADER=============================== */}

      <div className="header">
        <div>
          <h2 className="home-title">
            ¡Hola usuario, bienvenido a la plataforma!
          </h2>
          <p style={{ margin: "15px 0" }}>
            Iniciá el tour y explorá las funcionalidades disponibles
          </p>
          <Button ghost>Iniciar Tour</Button>
        </div>
        <div className="header-img">
          <img className="landing-img" src={landingImage} alt="tour" />
        </div>
      </div>

      {/* ============================================================ */}
      <br />

      <div className="home-cards-container">
        <HomeCard
          img={searchImage}
          link="/buscador"
          title="Buscador de Empresas"
        />
        <HomeCard
          img={newsImage}
          link="/noticias"
          title="Publicaciones de la red"
        />
        <HomeCard
          img={asistenciaImage}
          link="/asistencias"
          title="Asistencias"
        />
        <HomeCard
          img={bookImage}
          link="/"
          title="Bibliografía"
        />
        
      </div>
    </div>
  );
}

export default Home;
