import { AutoComplete, Select, List, Avatar } from "antd";
import "./Asesores.css";

//FRONTEND TEST
const data = [
  {
    title: "Nombre Apellido",
  },
  {
    title: "Nombre Apellido",
  },
  {
    title: "Nombre Apellido",
  },
  {
    title: "Nombre Apellido",
  },
  {
    title: "Nombre Apellido",
  },
  {
    title: "Nombre Apellido",
  },
];

function Asesores() {
  return (
    <div className="section-container">
      <h1 className="section-title">Buscá un asesor</h1>
      <p className="section-description">
        Si necesitas contactar a un asesor, ingresá sus datos o filtrá por
        habilidades para encontrar ayuda en alguna temática.
      </p>

      <p className="filter-title">Nombre/Legajo</p>

      <AutoComplete
        style={{ width: "100%" }}
        placeholder="Ingrese el Nombre o Legajo del Asesor"
        allowClear="true"
      />

      <p className="filter-title">Habilidades</p>

      <Select
        mode="multiple"
        placeholder="Seleccione una o más habilidades"
        style={{
          width: "100%",
        }}
      />

      <h2 className="results">Resultados</h2>

      <List
        className="result-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="result-list-item">
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="/asesor/123">{item.title}</a>}
              description="#123123 - INTI Neuquén"
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Asesores;
