import { Button, Result } from "antd";

const Error404 = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que estás buscando no existe."
        extra={<Button href="/" type="primary">Volver al Inicio</Button>}
      />
    </div>
  );
};

export default Error404;
