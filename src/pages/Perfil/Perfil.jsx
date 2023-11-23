import {
  Card,
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  InputNumber,
  Upload,
  message,
  Tooltip,
} from "antd";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import {
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./Perfil.css";
import { useState } from "react";
import httpbin from "axios"; // Asegúrate de instalar axios: npm install axios

const beforeUpload = (file) => {
  const isPng = file.type === "image/png";
  if (!isPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isPng && isLt2M;
};

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

function Perfil() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Simulamos una solicitud POST con httpbin
      try {
        const response = await httpbin.post("post", info.file.originFileObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // URL simulada desde la respuesta
        const imageUrl = response.data.files.firma;
        setLoading(false);
        setImageUrl(imageUrl);
      } catch (error) {
        message.error("Error al simular la carga de la imagen");
        console.log(error.message);
        setLoading(false);
      }
    }

    if (info.file.status === "error") {
      console.log("Upload error:", info);
      message.error("Error al cargar la imagen");
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Subir firma
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <Card
        className="profile-card"
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "20rem",
        }}
        bordered
      >
        <p className="profile-username">Juan Mestica</p>

        <p className="profile-description">Legajo #123123</p>
        <p className="profile-description">Neuquén</p>

        <div
          className="social"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <Button icon={<BsMicrosoftTeams />} style={{ margin: "0 5px" }} />
          <Button icon={<FaLinkedinIn />} style={{ margin: "0 5px" }} />
        </div>
      </Card>

      <Card style={{ width: "70%" }}>
        <div className="card-header">
          <p style={{ marginBottom: "10px" }}>Información personal</p>
        </div>

        <Form
          scrollToFirstError
          style={{ marginTop: "15px" }}
          layout="vertical"
        >
          {/* ============================ Nombre y apellido ===================================== */}
          <Row gutter={10}>
            <Col span={12} lg={12} md={24} xs={24}>
              <Form.Item
                name="nombre"
                label="Nombre(s)"
                rules={[
                  {
                    required: true,
                    message: "El nombre del asesor no puede estar vacío",
                  },
                ]}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
            </Col>

            <Col span={12} lg={12} md={24} xs={24}>
              <Form.Item
                name="apellido"
                label="Apellido(s)"
                rules={[
                  {
                    required: true,
                    message: "El apellido del asesor no puede estar vacío",
                  },
                ]}
              >
                <Input placeholder="Apellido" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12} lg={12} md={24} xs={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "El mail no puede estar vacío",
                  },
                ]}
              >
                <Input
                  name="mail"
                  addonAfter="@inti.gob.ar"
                  style={{ textAlign: "center" }}
                />
              </Form.Item>
            </Col>

            <Col span={12} lg={12} md={24} xs={24}>
              <Form.Item
                name="fecha_nacimiento"
                label="Fecha de Nacimiento"
                rules={[
                  {
                    required: true,
                    message: "Se debe seleccionar una fecha de nacimiento",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  allowClear
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: ".5rem",
                  }}
                  placeholder="Seleccione una fecha"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24} lg={24} md={24} xs={24}>
              <Form.Item
                name="numero_telefono"
                label="Número de teléfono"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  addonBefore="+54"
                  controls={false}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="card-header">
            <p style={{ marginBottom: "10px" }}>Sede</p>
          </div>
          <br />

          <Row gutter={10}>
            <Col span={12} lg={12} md={24} xs={24}>
              <Form.Item
                name="region"
                label="Región"
                rules={[
                  {
                    required: true,
                    message: "Se debe seleccionar una región",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={[
                    { value: "Patagonia Norte", label: "Patagonia Norte" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12} lg={12} md={24} xs={24}>
              <Form.Item
                name="sede"
                label="Sede"
                rules={[
                  {
                    required: true,
                    message: "Se debe seleccionar una sede",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={[
                    { value: "Neuquén", label: "Neuquén" },
                    { value: "Cipolletti", label: "Cipolleti" },
                    {
                      value: "San Martín de los Andes",
                      label: "San Martín de los Andes",
                    },
                    { value: "Bariloche", label: "Bariloche" },
                    {
                      value: "Comodoro Rivadavia",
                      label: "Comodoro Rivadavia",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="card-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p>Firma</p>

              <Tooltip title="La firma es para la generación de las minutas automáticas, de esta manera se podrá firmar y generar automáticamente las minutas de las visitas en las que participes">
                <QuestionCircleOutlined style={{ margin: "0 10px" }} />
              </Tooltip>
            </div>
          </div>
          <br />

          {/* ========================== Firma =================================  */}
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Item>
              <Upload
                style={{ margin: "0 auto" }}
                name="firma"
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                action="https://httpbin.org/post"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="firma asesor"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Row>

          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Perfil;
