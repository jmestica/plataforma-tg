import { Card, Input, Button, Row, Col } from "antd";
import "./Registro.css";
import {
  DeploymentUnitOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import Form from "antd/es/form/Form";
import intiLogo from "../../assets/logo-inti.png";

function Registro() {
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
            <Row style={{display: 'flex'}}>
              <Col>
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
              <Col>
                <Form.Item
                  name="apellido"
                  label="Apellido"
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
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Registro;
