import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Select, Table } from "antd";
import "../Buscador/Buscador.css";

export const Asistencia = () => {

  const [filtros, setFiltros] = useState({
    tipo: null,
    herramienta: null,
    asesores: null,
    nivelKaizen: null,
    provincia: null,
    ciudad: null,
  });


  const datatest = [
    { key: "1", tipo: "Asistencia 1", herramienta: 'PDCA', provincia: "Provincia 1", asesores: "Juan Mestica", idAsesor: 123 },
  ];

  const columnas = [
    {
      title: "Tipo",
      dataIndex: "tipo",
      align: "center",
    },
    {
      title: "Herramienta",
      dataIndex: "herramienta",
      align: "center",
    },
    {
      title: "Provincia",
      dataIndex: "provincia",
      align: "center",
    },
    {
      title: "Asesores",
      dataIndex: "asesores",
      align: "center",
      render: (text, record) => <Link to={`/asesor/${record.idAsesor}`}>{text}</Link>,
    },
  ];



  const handleInputChange = (campo, valor) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [campo]: valor,
    }));
  };

  const navigate = useNavigate();

  return (

    <>
      <h1 className="section-title">Asistencias</h1>
      <p className="section-description">
        Buscá una o más asistencias utilizando los filtros.
      </p>

      <Form layout="horizontal">
        <p>CARACTERÍSTICAS</p>
        <div className="filter-container">
          <Form.Item name={"tipo"}>
            <Select
              placeholder="Tipo"
              allowClear
              onClear={() => handleInputChange("tipo", null)}
              onSelect={(value) => handleInputChange("tipo", value)}
              options={[{ label: "Diagnóstico", value: "diagnostico" }]}
            />
          </Form.Item>
          <Form.Item name={"herramienta"}>
            <Select
              placeholder="Herramienta"
              allowClear
              onClear={() => handleInputChange("herramienta", null)}
              onSelect={(value) => handleInputChange("herramienta", value)}
              options={[{ label: "PDCA", value: "testHerramienta" }]}
            />
          </Form.Item>
          <Form.Item>
            <Select
              placeholder="Nivel Kaizen"
              allowClear
              onClear={() => handleInputChange("nivelKaizen", null)}
              onSelect={(value) => handleInputChange("nivelKaizen", value)}
              options={[{ label: "testNK", value: "testNK" }]}
            />
          </Form.Item>
        </div>
        <p>LOCALIZACIÓN</p>
        <div className="filter-container">
          <Form.Item>
            <Select
              placeholder="Provincia"
              allowClear
              onClear={() => handleInputChange("provincia", null)}
              onSelect={(value) => handleInputChange("provincia", value)}
              options={[{ label: "provincia", value: "provincia" }]}
            />
          </Form.Item>
          <Form.Item>
            <Select
              placeholder="Ciudad"
              allowClear
              onClear={() => handleInputChange("ciudad", null)}
              onSelect={(value) => handleInputChange("ciudad", value)}
              options={[{ label: "ciudad", value: "ciudad" }]}
            />
          </Form.Item>
        </div>
      </Form>
      <p>RESULTADOS</p>
      <br />

      {/* <Skeleton title={"Resultados"} active paragraph={{ rows: 6 }} /> */}

      <Table
        columns={columnas}
        dataSource={datatest}
      ></Table>

    </>
  )
}

