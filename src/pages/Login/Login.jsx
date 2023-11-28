import { Card, Input, Button, Form } from "antd";
import "./Login.css";

import {
  DeploymentUnitOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import intiLogo from "../../assets/logo-inti.png"


function Login() {
  const handleLogin = () => {
    console.log("test");
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <DeploymentUnitOutlined
            style={{ fontSize: "32px", color: "#1677FF", marginRight: "12 px" }}
          />
          <p>Red TG</p>
        </div>
        <div>
          <img style={{width: '50px'}} src={intiLogo}/>
        </div>

      </div>
        <div className="card-container">
        <Card className="login-card">
        <div className="login-card-header">
          <h3 className="card-title">Inicia Sesión</h3>
          <Link to="/registro">¿No tenés cuenta?</Link>
        </div>

        <Form layout="vertical" autoComplete="off" onFinish={handleLogin}>
          <br />
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
          <br />
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, ingresá tu contraseña",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="login-btn" block>
            Ingresar
          </Button>
          <br />
          <Link>Restablecer contraseña</Link>
        </Form>
      </Card>

        </div>

    </div>
  );
}

export default Login;
