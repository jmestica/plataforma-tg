import { Card } from "antd";
import { Link } from "react-router-dom";
import {
    EnterOutlined,
    QuestionCircleOutlined
  } from "@ant-design/icons";

function HomeCard({img, link, title}) {
  return (
    <div>
      <Card
        hoverable
        className="functionality-card"
        style={{ width: 300 }}
        cover={<img alt="search" src={img} />}
        actions={[
          <Link key="enter" to={link}>
            <EnterOutlined />
          </Link>,
          <QuestionCircleOutlined key="ask" />,
        ]}
      >
        <h3 style={{ textAlign: "center" }}>{title}</h3>
      </Card>
    </div>
  );
}

export default HomeCard;
