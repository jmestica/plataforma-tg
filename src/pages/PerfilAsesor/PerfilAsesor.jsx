import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import "./PerfilAsesor.css";

import linkedin from "../../assets/social-media-icons/linkedin.png";
import whatsapp from "../../assets/social-media-icons/whatsapp.png";
import outlook from "../../assets/social-media-icons/outlook.png";

function PerfilAsesor() {
  return (
    <div className="section-container">
      {/* ======================================== HEADER ======================================== */}
      <div className="profile-header section">
        <h1 className="section-title">Juan Mestica</h1>
        <div className="avatar-container">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<UserOutlined />}
          />
        </div>
        <h2 className="subtitle">INTI Neuquén</h2>
      </div>

      {/* ======================================== CONTACTO ======================================== */}
      <div className="profile-header section">
        <b>Contacto</b>
        <div className="media">
          <img src={whatsapp} alt="linkedin-logo" className="media-img" />
          <div className="contact-info">
            <b>Whatsapp</b>
            <br />
            <p>+542944390332</p>
          </div>
        </div>
        <div className="media">
          <img src={outlook} alt="linkedin-logo" className="media-img" />
          <div className="contact-info">
            <b>Mail</b>
            <br />
            <p>jmestica@inti.gob.ar</p>
          </div>
        </div>
        <div className="media">
          <img src={linkedin} alt="linkedin-logo" className="media-img" />
          <div className="contact-info">
            <b>LinkedIn</b>
            <p>Link</p>
          </div>
        </div>
      </div>

      {/* ======================================== CONOCIMIENTOS/HABILIDADES ======================================== */}
      <div className="profile-header section">
        <b>Habilidades</b>
        <div className="tag-container">
          <Tag color="geekblue">Transformación Digital</Tag>
          <Tag color="geekblue">Software</Tag>
          <Tag color="geekblue">Hardware</Tag>
          <Tag color="geekblue">Industria 4.0</Tag>
          <Tag color="orange">5S</Tag>
          <Tag color="orange">Modelado de Procesos</Tag>



        </div>
      </div>
    </div>
  );
}

export default PerfilAsesor;
