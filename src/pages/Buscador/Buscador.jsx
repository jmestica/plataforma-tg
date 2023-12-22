import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  InputNumber,
  Select,
  Table,
  Skeleton,
  FloatButton,
  Tooltip,
  Modal,
  Input,
  Button,
} from "antd";

const { TextArea } = Input;
import { DownloadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import "./Buscador.css";

// ========================DATOS DE TEST========================

const datatest = [
  { key: "1", razon_social: "Empresa 1", CUIT: 123, provincia: "Provincia 1" },
];

// =============================================================

const columnas = [
  {
    title: "CUIT",
    dataIndex: "CUIT",
    align: "center",
  },
  {
    title: "Razón Social",
    dataIndex: "razon_social",
    align: "center",
  },
  {
    title: "Provincia",
    dataIndex: "provincia",
    align: "center",
  },
];

function Buscador() {
  // ============================= ESTADO DE FILTROS =================================
  const [filtros, setFiltros] = useState({
    CUIT: null,
    rubro: null,
    seccionCLAE: null,
    nivelKaizen: null,
    provincia: null,
    ciudad: null,
  });

  // ============================= INICIALIZACIÓN Y ESTADOS =================================

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    console.log("INIT");
  }, []);

  // ============================= BÚSQUEDA =================================

  // Función debounce
  const debouncedSearch = debounce(async () => {
    setIsLoading(true);

    try {
      //test de skeleton
      await new Promise((resolve) => {
        setTimeout(() => {
          // Realizar la búsqueda con los filtros llamando a la API
          console.log("Realizar búsqueda con filtros:", filtros);
          resolve(); // Resolver la promesa después de realizar la búsqueda
        }, 500);
      });
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch();
  }, [filtros]);

  const handleInputChange = (campo, valor) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [campo]: valor,
    }));
  };

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
  // ============================= DIFUSIÓN =================================

  const [isOpenModalDifusion, setIsOpenModalDifusion] = useState(false);

  const handleCopiarContactos = async () => {
    // Selecciona el texto en el input
    const lista = inputRef.current.resizableTextArea.textArea.textContent;

    await navigator.clipboard.writeText(lista);

    setIsOpenModalDifusion(false);
  };

  const handleDescargarDifusion = async () => {
    const lista = inputRef.current.resizableTextArea.textArea.textContent;

    //Generación y descarga de TXT
    const blob = new Blob([lista], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "Lista de Difusión.txt"; // Nombre del archivo
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  };

  const handleCancel = () => {
    setIsOpenModalDifusion(false);
  };

  const handleCrearDifusion = () => {
    setIsOpenModalDifusion(true);
  };

  // ============================= COMPONENTE =================================

  return (
    <div className="section-container">
      <h1 className="section-title">Empresas</h1>
      <p className="section-description">
        Buscá una empresa o grupo de empresas filtrando por sus características.
      </p>
      <Form layout="horizontal">
        <p>CARACTERÍSTICAS</p>
        <div className="filter-container">
          <Form.Item name={"CUIT"}>
            <InputNumber
              controls={false}
              className="search-input"
              placeholder="CUIT"
              onChange={(value) => handleInputChange("CUIT", value)}
            />
          </Form.Item>
          <Form.Item name={"rubro"}>
            <Select
              placeholder="Rubro"
              allowClear
              onClear={() => handleInputChange("rubro", null)}
              onSelect={(value) => handleInputChange("rubro", value)}
              options={[{ label: "testRubro", value: "testRubro" }]}
            />
          </Form.Item>
          <Form.Item>
            <Select
              placeholder="Sección CLAE"
              allowClear
              onClear={() => handleInputChange("seccionCLAE", null)}
              onSelect={(value) => handleInputChange("seccionCLAE", value)}
              options={[{ label: "testCLAE", value: "testCLAE" }]}
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
      {isLoading ? (
        <Skeleton title={"Resultados"} active paragraph={{ rows: 6 }} />
      ) : (
        <Table
          columns={columnas}
          dataSource={datatest}
          onRow={(record) => ({
            onClick: () => navigate(`/info-general/${record.CUIT}`),
          })}
        ></Table>
      )}

      {/* Lista de difusión */}
      <Tooltip
        placement="left"
        title="Si querés generar una lista de difusión para estas empresas, hacé click acá"
      >
        <FloatButton
          type="primary"
          onClick={handleCrearDifusion}
          badge={{ count: empresas.length, color: "red" }}
        />
      </Tooltip>

      <Modal
        title="Lista de Difusión"
        open={isOpenModalDifusion}
        onOk={handleCopiarContactos}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Copiar mails"
        centered
        style={{ marginLeft: "150px", marginTop: "50px" }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              onClick={handleDescargarDifusion}
              type="primary"
              icon={<DownloadOutlined />}
            >
              Descargar
            </Button>
            <OkBtn />
          </>
        )}
      >
        <TextArea
          rows={7}
          ref={inputRef}
          style={{
            backgroundColor: "#f1f1f1",
            fontFamily: "'Courier New', Courier, monospace",
          }}
          value={"mail1@gmail.com \nmail2@gmail.com \nmail3@gmail.com"}
        />
      </Modal>
    </div>
  );
}

export default Buscador;
