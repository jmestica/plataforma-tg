import {
  Button,
  Form,
  Tag,
  Row,
  Modal,
  Space,
  Steps,
  Checkbox,
  InputNumber,
  Select,
  Input,
  Tooltip,
  Table,
  DatePicker,
  Col,
  Collapse,
  Popconfirm,
  Alert,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Search } = Input;
const { RangePicker } = DatePicker;
import { useState, useRef } from "react";
import "./CargarEmpresa.css";

const tipo_diagnostico = [
  "Productivo Simple (DPS)",
  "Organismo Público",
  "Madurez Digital",
  "Industria 4.0",
  "Auditoría",
  "Otros",
].map((item) => ({
  label: item,
  value: item,
}));

const herramientas_test = ["5S", "Layout", "PDCA", "LEAN"].map((item) => ({
  label: item,
  value: item,
}));

function CargarEmpresa() {
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [formEditKey, setFormEditKey] = useState(0);

  const [prefijo, setPrefijo] = useState("");
  const [id, setId] = useState("");
  const [sufijo, setSufijo] = useState("");

  const [tipoAT, setTipoAT] = useState("");
  // ============================ Cambios de pasos =============================

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const stepOnChange = (value) => {
    setCurrent(value);
  };

  // ============================  Antecedente =============================

  const [countAntecedente, setCountAntecedente] = useState(1);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [antecedentes, setAntecedentes] = useState([]);
  const [currentAntecedente, setCurrentAntecedente] = useState();

  const formRef = useRef(null);

  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const handleEditAntecedente = (values) => {
    setIsModalOpenEdit(false);

    const antecedentesEdit = antecedentes.filter(
      (obj) => obj.key !== values.key
    );

    setAntecedentes([...antecedentesEdit, values]);
  };

  const handleDeleteAntecedente = () => {
    const antecedentesEdit = antecedentes.filter(
      (obj) => obj.key !== currentAntecedente.key
    );

    setAntecedentes(antecedentesEdit);

    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleOkAdd = (values) => {
    const yaExiste = antecedentes.some(
      (objeto) => JSON.stringify(objeto) === JSON.stringify(values)
    );

    let año_inicio = values.duracion[0].$y;
    let año_fin = values.duracion[1].$y;

    if (año_inicio === año_fin) {
      values["año"] = año_inicio;
    } else {
      values["año"] = `${año_inicio}-${año_fin}`;
    }

    if (!yaExiste) {
      //índice de tabla
      values["key"] = countAntecedente;
      setCountAntecedente(countAntecedente + 1);

      setAntecedentes([...antecedentes, values]);
    } else {
      console.log("error");
    }

    formRef.current.resetFields();

    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleDelete = (key) => {
    const newData = antecedentes.filter((item) => item.key !== key);
    setAntecedentes(newData);
  };

  const columnas = [
    {
      title: "#",
      dataIndex: "key",
      width: "10%",
    },
    {
      title: "Tipo AT",
      dataIndex: "tipo_at",
    },
    {
      title: "Año",
      dataIndex: "año",
    },
  ];

  const handleRowClick = (record) => {
    setCurrentAntecedente(record);
    formEdit.setFieldsValue(record);
    setIsModalOpenEdit(true);
    setTipoAT(record.tipo_at);
  };

  const tagRender = (props) => {
    // eslint-disable-next-line react/prop-types
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="blue"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  // ==============================   BÚSQUEDA DE CLAES  ===================================

  const [claes, setClaes] = useState([]);

  const searchClae = (valor) => {
    setClaes([...claes, valor]);
  };

  // ==============================   CONTACTOS  ===================================

  const [contactos, setContactos] = useState([]);
  const [isModalOpenContactos, setIsModalOpenContactos] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formContacto] = Form.useForm(); // Crear una instancia del formulario

  const agregarContacto = () => {
    setIsModalOpenContactos(true);
  };

  const guardarContacto = (value) => {
    if (!value.mail_contacto && !value.telefono_contacto) {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);

      let existeContacto = contactos.some(
        (contacto) => contacto.nombre_contacto === value.nombre_contacto
      );

      if (!existeContacto) {
        value.key = value.label = value.nombre_contacto;

        value.children = (
          <>
            <b>Nombre de contacto</b>
            <p>{value.nombre_contacto}</p>
            <br />
            <b>Teléfono/WhatsApp</b>
            <p>{value.telefono_contacto}</p>
            <br />
            <b>Mail</b>
            <p>{value.mail_contacto}</p>
            <br />
            <Button onClick={() => handleEliminarContacto(value.key)}>
              Eliminar
            </Button>
          </>
        );

        setContactos((prevContactos) => [...prevContactos, value]);

        setIsModalOpenContactos(false);

        formContacto.resetFields();
          
      } else {
        setErrorMessage("Ya existe un contacto con ese nombre");
        setErrorVisible(true);
      }
    }
  };

  const handleEliminarContacto = (key) => {
    const nuevosContactos = contactos.filter(
      (contacto) => contacto.key !== key
    );
    setContactos(nuevosContactos);
  };

  // ============================ Formulario de Pasos =============================

  const steps = [
    // ==========================================   STEP: DATOS GENERALES =========================================================

    {
      title: "Datos Generales",
      content: (
        <>
          <Form.Item
            label="CUIT:"
            name="cuit"
            rules={[
              {
                required: true,
                message: "Por favor, complete el CUIT de la empresa",
              },
            ]}
          >
            <Space style={{ width: "100%" }}>
              <Space.Compact size="large" style={{ width: "114%" }}>
                <InputNumber
                  style={{ width: "25%" }}
                  maxLength={2}
                  controls={false}
                  onChange={(value) => setPrefijo(value)}
                />
                <InputNumber
                  style={{ width: "50%" }}
                  maxLength={10}
                  controls={false}
                />
                <InputNumber
                  style={{ width: "25%" }}
                  maxLength={2}
                  controls={false}
                />
              </Space.Compact>
            </Space>
          </Form.Item>

          <Form.Item label="Tamaño SEPYME:" name="tamaño_sepyme">
            <Select
              placeholder="Seleccione el tamaño SEPYME"
              allowClear
              className="form-input"
              options={[
                { value: "No conocido", label: "No conocido" },
                { value: "Micro", label: "Micro" },
                { value: "Pequeña", label: "Pequeña" },
                { value: "Mediana Tramo 1", label: "Mediana Tramo 1" },
                { value: "Mediana Tramo 2", label: "Mediana Tramo 2" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Razón Social"
            name="razon_social"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la razón social",
              },
            ]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label="Domicilio"
            name="domicilio"
            rules={[
              { required: true, message: "Por favor, ingrese el domicilio" },
            ]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Descripción: &nbsp;
                <Tooltip title="Ingresá una descripción breve de las actividades de la empresa">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            name="descripcion"
            rules={[
              {
                required: true,
                message:
                  "Por favor, describa brevemente las actividades de la empresa",
              },
            ]}
          >
            <TextArea rows={3} className="form-input" />
          </Form.Item>

          <Form.Item
            label="Link página web"
            name="web"
            rules={[{ type: "link" }]}
          >
            <Input className="form-input" placeholder="www.paginaweb.com" />
          </Form.Item>

          <Form.Item
            label="Link Perfil CRM"
            name="crm"
            rules={[{ type: "link" }]}
          >
            <Input className="form-input" placeholder="www.crm.inti.gob.ar" />
          </Form.Item>
          <p style={{ transform: "translateY(-20px)" }}>
            La búsqueda de la empresa puede hacerse desde{" "}
            <a href="https://crm.inti.gob.ar/index.php?module=Accounts&action=index">
              USUARIOS EXTERNOS
            </a>{" "}
          </p>

          <div className="btn-bar">
            <div className="btns">
              <Button
                style={{ marginRight: "10px" }}
                type="primary"
                disabled
                onClick={prev}
              >
                Anterior
              </Button>
              <Button type="primary" onClick={next}>
                Siguiente
              </Button>
            </div>
          </div>
        </>
      ),
    },

    // ==========================================   STEP: LOCALIZACIÓN =========================================================

    {
      title: "Localización",
      content: (
        <>
          <Form.Item
            label="Provincia:"
            name="provincia"
            rules={[{ required: true, message: "Selecciona la provincia" }]}
          >
            <Select className="form-input" />
          </Form.Item>
          <Form.Item
            label="Ciudad:"
            name="ciudad"
            rules={[{ required: true, message: "Selecciona la ciudad" }]}
          >
            <Select className="form-input" />
          </Form.Item>
          <Checkbox>Pertenece a parque industrial</Checkbox>
          <div className="btn-bar">
            <div className="btns">
              <Button
                style={{ marginRight: "10px" }}
                type="primary"
                onClick={prev}
              >
                Anterior
              </Button>
              <Button type="primary" onClick={next}>
                Siguiente
              </Button>
            </div>
          </div>
        </>
      ),
    },

    // ==========================================   STEP: ANTECEDENTES =========================================================

    {
      title: "Antecedentes",
      content: (
        <>
          <Form onFinish={handleOkAdd}>
            <Table
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.resumen}</p>
                ),
                rowExpandable: (record) => record.resumen !== "Not Expandable",
              }}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
              bordered
              columns={columnas}
              dataSource={antecedentes}
            />

            <Button
              onClick={() => setIsModalOpenAdd(true)}
              type="primary"
              block
              style={{
                marginBottom: 16,
              }}
            >
              Agregar Antecedente
            </Button>

            {/* // ===============================MODAL EDITAR ================================= */}

            <Modal
              title="Antecedente"
              open={isModalOpenEdit}
              onCancel={handleCancelEdit}
              okText="Cerrar"
              footer={null}
              key={formEditKey}
            >
              {currentAntecedente ? (
                <Form
                  form={formEdit}
                  layout="vertical"
                  initialValues={{
                    key: currentAntecedente.key,
                    resumen: currentAntecedente.resumen,
                    tipo_at: currentAntecedente.tipo_at,
                    duracion: currentAntecedente.duracion,
                    tipo_orden: currentAntecedente.tipo_orden,
                    herramientas: currentAntecedente.herramientas,
                    nro_orden: currentAntecedente.nro_orden,
                    cant_horas: currentAntecedente.cant_horas,
                    ciudad: currentAntecedente.ciudad,
                    asesores: currentAntecedente.asesores,
                    tipo_diagnostico: currentAntecedente.tipo_diagnostico,
                  }}
                  onFinish={handleEditAntecedente}
                >
                  <Form.Item label="Número de Antecedente:" name="key">
                    <Input disabled bordered={false} />
                  </Form.Item>

                  <Form.Item
                    shouldUpdate
                    label="Resumen:"
                    name="resumen"
                    rules={[
                      {
                        required: true,
                        message:
                          "Se debe cargar un resumen de la intervención en la empresa",
                      },
                    ]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                  <Form.Item
                    label="Tipo AT:"
                    name="tipo_at"
                    rules={[
                      {
                        required: true,
                        message: "Se debe seleccionar el tipo de asistencia",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      onClear={() => setTipoAT(null)}
                      onSelect={(value) => setTipoAT(value)}
                      placeholder="Seleccione el tipo de AT"
                      options={[
                        { label: "Diagnóstico", value: "Diagnóstico" },
                        { label: "Implementación", value: "Implementación" },
                        { label: "Relevamiento", value: "Relevamiento" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Duración:"
                    name="duracion"
                    rules={[
                      {
                        required: true,
                        message:
                          "Por favor, seleccione las fechas de inicio y fin de la asistencia",
                      },
                    ]}
                  >
                    <RangePicker
                      value={currentAntecedente.duracion}
                      style={{ width: "100%" }}
                      format="DD-MM-YYYY"
                      placeholder={["Inicio", "Fin"]}
                      size="large"
                    />
                  </Form.Item>

                  {tipoAT === "Diagnóstico" ? (
                    <Form.Item
                      label="Tipo de Diagnóstico"
                      name="tipo_diagnostico"
                    >
                      <Select
                        placeholder="Seleccione el tipo de Diagnóstico"
                        allowClear
                        options={tipo_diagnostico}
                        placement="bottom"
                      />
                    </Form.Item>
                  ) : null}

                  {tipoAT === "Implementación" ? (
                    <Form.Item label="Herramientas" name="herramientas">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Seleccione la o las temáticas de la asistencia"
                        options={herramientas_test}
                        tagRender={tagRender}
                      />
                    </Form.Item>
                  ) : null}

                  <Form.Item
                    label="Tipo de órden de trabajo"
                    name="tipo_orden"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, seleccione el tipo de órden",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Seleccione el tipo de órden"
                      options={[
                        { label: "OT", value: "OT" },
                        { label: "SOT", value: "SOT" },
                        { label: "RUT", value: "RUT" },
                      ]}
                    />
                  </Form.Item>

                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item label="Nro. OT/SOT/RUT:" name="nro_orden">
                        <InputNumber
                          size="large"
                          placeholder="Nro"
                          controls="false"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Cant. total de horas"
                        name="cant_horas"
                        rules={[
                          {
                            required: "true",
                            message: "Por favor, ingrese la cant de horas",
                          },
                        ]}
                      >
                        <InputNumber size="large" placeholder="Total" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Ciudad:"
                    name="ciudad"
                    rules={[
                      {
                        required: true,
                        message:
                          "Se debe seleccionar la ciudad de la asistencia",
                      },
                    ]}
                  >
                    <Select
                      options={[{ label: "test", value: "test" }]}
                      showSearch
                      notFoundContent={
                        <p style={{ padding: "10px" }}>
                          No se encontraron ciudades
                        </p>
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Asesores"
                    name="asesores"
                    rules={[
                      {
                        required: true,
                        message: "Se deben agregar los asesores",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      options={[{ label: "test", value: "test" }]}
                    />
                  </Form.Item>

                  <Button type="primary" block htmlType="submit" size="large">
                    Editar Antecedente
                  </Button>

                  <Popconfirm
                    title="Borrar antecedente"
                    description="¿Está seguro de eliminar el antecedente?"
                    okText="Sí"
                    cancelText="Cancelar"
                    onConfirm={handleDeleteAntecedente}
                  >
                    <Button
                      block
                      type="primary"
                      danger
                      size="large"
                      style={{ marginTop: "10px" }}
                    >
                      Eliminar Antecedente
                    </Button>
                  </Popconfirm>
                </Form>
              ) : null}
            </Modal>

            {/* // ===============================MODAL AGREGAR ================================= */}
            <Modal
              title={`Cargar Antecedente`}
              footer={null}
              open={isModalOpenAdd}
              onCancel={handleCancelAdd}
            >
              <Form layout="vertical" onFinish={handleOkAdd} ref={formRef}>
                <Form.Item
                  label="Resumen:"
                  name="resumen"
                  rules={[
                    {
                      required: true,
                      message:
                        "Se debe cargar un resumen de la intervención en la empresa",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  label="Tipo AT:"
                  name="tipo_at"
                  rules={[
                    {
                      required: true,
                      message: "Se debe seleccionar el tipo de asistencia",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    onClear={() => setTipoAT(null)}
                    onSelect={(value) => setTipoAT(value)}
                    placeholder="Seleccione el tipo de AT"
                    options={[
                      { label: "Diagnóstico", value: "Diagnóstico" },
                      { label: "Implementación", value: "Implementación" },
                      { label: "Relevamiento", value: "Relevamiento" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Duración:"
                  name="duracion"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, seleccione las fechas de inicio y fin de la empresa",
                    },
                  ]}
                >
                  <RangePicker
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    placeholder={["Inicio", "Fin"]}
                    size="large"
                  />
                </Form.Item>

                {tipoAT === "Diagnóstico" ? (
                  <Form.Item
                    label="Tipo de Diagnóstico"
                    name="tipo_diagnostico"
                  >
                    <Select
                      placeholder="Seleccione el tipo de Diagnóstico"
                      allowClear
                      options={tipo_diagnostico}
                      placement="bottom"
                    />
                  </Form.Item>
                ) : null}

                {tipoAT === "Implementación" ? (
                  <Form.Item label="Herramientas" name="herramienta">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Seleccione la o las temáticas de la asistencia"
                      options={herramientas_test}
                      tagRender={tagRender}
                    />
                  </Form.Item>
                ) : null}

                <Form.Item
                  label="Tipo de órden de trabajo"
                  name="tipo_orden"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione el tipo de órden",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Seleccione el tipo de órden"
                    options={[
                      { label: "OT", value: "OT" },
                      { label: "SOT", value: "SOT" },
                      { label: "RUT", value: "RUT" },
                    ]}
                  />
                </Form.Item>

                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="Nro. OT/SOT/RUT:" name="nro_orden">
                      <InputNumber
                        size="large"
                        placeholder="Nro"
                        controls="false"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Cantidad total de horas"
                      name="cant_horas"
                      rules={[
                        {
                          required: "true",
                          message: "Por favor, ingrese la cant de horas",
                        },
                      ]}
                    >
                      <InputNumber size="large" placeholder="Total" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Ciudad:"
                  name="ciudad"
                  rules={[
                    {
                      required: true,
                      message: "Se debe seleccionar la ciudad de la asistencia",
                    },
                  ]}
                >
                  <Select
                    options={[{ label: "test", value: "test" }]}
                    showSearch
                    notFoundContent={
                      <p style={{ padding: "10px" }}>
                        No se encontraron ciudades
                      </p>
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Asesores"
                  name="asesores"
                  rules={[
                    {
                      required: true,
                      message: "Se deben agregar los asesores",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    options={[{ label: "test", value: "test" }]}
                  />
                </Form.Item>

                <Button type="primary" block htmlType="submit" size="large">
                  Agregar Antecedente
                </Button>
              </Form>
            </Modal>
          </Form>
        </>
      ),
    },

    // ==========================================   STEP: CADENA DE VALOR =========================================================

    {
      title: "Cadena de Valor",
      content: (
        <>
          <Form layout="vertical">
            <Form.Item
              label="Sector de pertenencia:"
              name="sector_pertenece"
              rules={[
                {
                  required: "true",
                  message: "Por favor, seleccione el sector de pertenencia",
                },
              ]}
            >
              <Select placeholder="Seleccione el sector de pertenencia" />
            </Form.Item>
            <Form.Item
              label="Sector(es) a los que provee"
              name="sectores_provee"
              rules={[
                {
                  required: "true",
                  message:
                    "Por favor, seleccione los sectores a los que provee",
                },
              ]}
            >
              <Select placeholder="Seleccione los sectores a los cuales provee" />
            </Form.Item>

            <Form.Item label="CLAE:" name="clae">
              <Search
                placeholder="Ingrese el código de CLAE"
                allowClear
                onSearch={searchClae}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <div className="clae-display">
              <h4>CLAES ENCONTRADOS</h4>

              {claes.map((clae) => {
                return (
                  <Tag
                    className="tag-clae"
                    closeIcon
                    color="geekblue"
                    key={clae.codigo}
                    onClose={(e) => {
                      console.log(e);
                    }}
                  >
                    {`CLAE #${clae} - ${clae.descripcion}`}
                  </Tag>
                );
              })}
            </div>
          </Form>
        </>
      ),
    },

    // ==========================================   STEP: CONTACTOS =========================================================
    {
      title: "Contactos",
      content: (
        <>
          {contactos.length > 0 ? (
            <Collapse
              accordion
              items={contactos}
              style={{ margin: "20px 0" }}
            />
          ) : (
            <p style={{ margin: "10px" }}>Aún no se cargaron contactos</p>
          )}

          <Modal
            title="Cargar Contacto"
            open={isModalOpenContactos}
            onOk={agregarContacto}
            onCancel={() => {
              setIsModalOpenContactos(false);
            }}
            okText={`Guardar Contacto`}
            cancelText={"Cerrar"}
            footer={null}
          >
            <Form layout="vertical" onFinish={guardarContacto} form={formContacto}>
              <Form.Item
                label="Nombre de Contacto:"
                name="nombre_contacto"
                rules={[
                  {
                    required: "true",
                    message: "Por favor, ingrese el nombre del contacto",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Puesto:" name="puesto">
                <Input />
              </Form.Item>
              <Form.Item label="Teléfono/WhatsApp:" name="telefono_contacto">
                <InputNumber controls={false} style={{ padding: ".1rem" }} />
              </Form.Item>
              <Form.Item label="Mail:" name="mail_contacto">
                <Input />
              </Form.Item>

              <Button block type="primary" htmlType="submit">
                Guardar Contacto
              </Button>
            </Form>

            {errorVisible ? (
              <Alert
                closable
                afterClose={() => {
                  setErrorVisible(false);
                }}
                style={{ marginTop: "10px" }}
                message="Por favor, agregá el mail o teléfono del contacto"
                type="error"
                showIcon
              />
            ) : null}
          </Modal>

          <Button
            block
            type="primary"
            style={{ backgroundColor: "#58B15B" }}
            onClick={agregarContacto}
          >
            Agregar Contacto
          </Button>
        </>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    width: "80%",
    marginTop: 16,
  };

  return (
    <div>
      <Steps
        onChange={stepOnChange}
        type="navigation"
        current={current}
        items={items}
      />

      <Form form={form} className="form" layout="vertical">
        <div style={contentStyle}>{steps[current].content}</div>
      </Form>
    </div>
  );
}

export default CargarEmpresa;
