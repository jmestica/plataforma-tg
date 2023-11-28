import { Card, Input, Button, Row, Col, Select, InputNumber } from "antd";
import "./Registro.css";
import {
  DeploymentUnitOutlined,
  UserOutlined,
  NumberOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import Form from "antd/es/form/Form";
import intiLogo from "../../assets/logo-inti.png";
import { useState } from "react";

function Registro() {
  const [password, setPassword] = useState("");

  const [lengthCheck, setLengthCheck] = useState("red");
  const [complexCheck, setComplexCheck] = useState("red");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const checkPassword = (event) => {
    const { value } = event.target;

    if (value.length >= 6) {
      setLengthCheck("green");

      if (/[a-zA-Z]/.test(value) && /\d/.test(value)) {
        setComplexCheck("green");
        setPassword(value);
      } else {
        setComplexCheck("red");
      }
    } else {
      setLengthCheck("red");
      setComplexCheck("red");
    }
  };

  const confirmPassword = (event) => {
    const { value } = event.target;

    setPasswordMatch(value === password);
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <div style={{ display: "flex", alignItems: "center" }}>
          <DeploymentUnitOutlined
            style={{ fontSize: "32px", color: "#1677FF", marginRight: "12 px" }}
          />
          <p>Red TG</p>
        </div>
        <div>
          <img style={{ width: "50px" }} src={intiLogo} />
        </div>
      </div>
      <div className="card-container">
        <Card className="login-card">
          <div className="login-card-header">
            <h3 className="card-title">Registrate</h3>
            <Link to="/login">¿Ya tenés cuenta?</Link>
          </div>
          <br />
          <Form layout="vertical" autoComplete="off">
            <Row style={{ display: "flex", gap: "20px", width: "100%" }}>
              <Col span={11} lg={11} md={24} xs={24}>
                <Form.Item
                  name="Nombre"
                  label="Nombre(s)"
                  rules={[
                    { required: true, message: "Ingresá tu nombre" },
                    { type: "string" },
                  ]}
                >
                  <Input allowClear placeholder="Nombre" />
                </Form.Item>
              </Col>
              <Col span={11} lg={11} md={24} xs={24}>
                <Form.Item
                  name="apellido"
                  label="Apellidos"
                  rules={[
                    { required: true, message: "Ingresá tu apellido" },
                    { type: "string" },
                  ]}
                >
                  <Input allowClear placeholder="Nombre" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="legajo"
              label="Legajo"
              rules={[
                { required: true, message: "Ingresá tu legajo" },
                { type: "number", message: "El legajo debe ser numérico" },
              ]}
            >
              <InputNumber
                style={{ width: "100%", padding: ".5rem" }}
                size="lg"
                controls={false}
                placeholder="Legajo"
                prefix={<NumberOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="sede"
              label="Sede"
              rules={[{ required: true, message: "Ingresá tu sede" }]}
            >
              <Select
                className="select-sede"
                placeholder="Seleccione su sede"
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

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Ingresá tu usuario" },
                { type: "string" },
              ]}
            >
              <Input
                allowClear
                placeholder="Usuario"
                prefix={<UserOutlined className="site-form-item-icon" />}
                addonAfter="@inti.gob.ar"
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresá tu contraseña",
                },
              ]}
            >
              <Input.Password
                autoComplete="off"
                showCount
                onChange={checkPassword}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <div className="warnings" style={{transform: 'translateY(-20px)'}}>
              <p style={{ color: lengthCheck, transition: "0.4s" }}>
                La contraseña debe tener al menos 6 caracteres
              </p>
              <p style={{ color: complexCheck, transition: "0.4s" }}>
                La contraseña debe tener al menos un caracter numérico y
                alfabético
              </p>
            </div>

            <Form.Item
              label="Confirmar contraseña"
              name="check-password"
              onChange={confirmPassword}
              rules={[
                {
                  required: true,
                  message: "Por favor, confirmá tu contraseña",
                },
              ]}
            >
              <Input.Password
                autoComplete="off"
                showCount
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            {!passwordMatch ? (
              <p style={{ transform: "translateY(-8px)", color: "red" }}>
                Las contraseñas no coinciden
              </p>
            ) : null}

            <Button
              type="primary"
              htmlType="submit"
              style={{ height: "45px" }}
              block
            >
              Registrarse
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Registro;
