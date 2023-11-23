// ============================ANT DESIGN IMPORT===================================

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  PieChartOutlined,
  LogoutOutlined,
  BarsOutlined,
  DeploymentUnitOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { MdOutlineBusinessCenter } from "react-icons/md";
import { GiTabletopPlayers } from "react-icons/gi";
import { FaNewspaper } from "react-icons/fa";

import { Layout, Menu, Button, theme, Dropdown } from "antd";
const { Header, Sider, Content } = Layout;

// ===========================================================================

import { useState } from "react";
import "./LayoutDashboard.css";
import { Link, Outlet } from "react-router-dom";

// =================================SIDEBAR ITEMS======================================

function getItem(label, key, icon, children, to) {
  return {
    key,
    icon,
    children,
    label,
    to,
  };
}

const items = [
  getItem( (<Link to='/'>  Inicio </Link>), "1", <HomeOutlined />, null),
  getItem((<Link to='/noticias'> Noticias </Link>), "2", <FaNewspaper />, null),
  getItem("Empresas", "3", <MdOutlineBusinessCenter />, [
    getItem((<Link to='/buscador'> Buscador </Link>), "4", null, null),
    getItem((<Link to='/asistencias'> Asistencias </Link>), "5", null, null),
    getItem((<Link to='/herramientas'> Herramientas de TG </Link>), "6", null, null),
  ]),
  getItem("Act. Lúdicas", "7", <GiTabletopPlayers />, [
    getItem((<Link to='/catalogo'> Catálogo </Link>), "8"),
    getItem((<Link to='/equipos'> Equipos </Link>), "9"),
  ]),
  getItem((<Link to='/asesores'> Asesores </Link>), "10", <UsergroupAddOutlined />),
  getItem((<Link to='/estadisticas'> Estadísticas </Link>), "11", <PieChartOutlined />),
];

// =================================SIDEBAR ITEMS======================================

const user_items = [
  {
    label: (
      <div className="dropdown-header">
        <div className="dropdown-username">
          <div>Juan Mestica</div>
          <div style={{ color: "rgb(140, 140, 140)" }}>Neuquén</div>
        </div>

        <div className="logout-btn">
          <Button
            borderColorDisabled
            type="link"
            icon={<LogoutOutlined style={{ fontSize: "26px" }} />}
          ></Button>
        </div>
      </div>
    ),
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: (
      <Button
        borderColorDisabled
        type="link"
        icon={<UserOutlined style={{ fontSize: "20px" }} />}
      >
        <Link to='/perfil'> Ver Perfil </Link>
      </Button>
    ),
    key: "1",
  },

  {
    label: (
      <Button
        borderColorDisabled
        type="link"
        icon={<BarsOutlined style={{ fontSize: "20px" }} />}
      >
        <Link to='/historial'>Mi Historial</Link>
      </Button>
    ),
    key: "3",
  },
];

// =================================COMPONENT======================================

function LayoutDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout className="main-container">
        <Sider
          trigger={null}
          breakpoint="md"
          collapsedWidth="70"
          collapsible
          collapsed={collapsed}
          width={250}
          theme="light"
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          <div className="demo-logo-vertical" />

          <div className="logo">
            <DeploymentUnitOutlined
              style={{ fontSize: "32px", color: "#1677FF" }}
            />

            {!collapsed ? <h1 className="title"> Red TG </h1> : null}
          </div>

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items} 
          />
        </Sider>
        <Layout>
          <Header className="topbar" style={{ padding: 0, background: "#fff" }}>
            {/* ===================== COLLAPSE BTN ========================= */}

            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Dropdown
              menu={{ items: user_items }}
              className="ant-btn ant-btn-text ant-btn-icon-only user-dropdown"
            >
              <div onClick={(e) => e.preventDefault()}>
                <UserOutlined style={{ margin: "0 5px" }} />
                <a className="username">Juan Mestica</a>
              </div>
            </Dropdown>

            {/* ===================== USER DROPDOWN ========================= */}
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: "#f0f0f0",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutDashboard;
