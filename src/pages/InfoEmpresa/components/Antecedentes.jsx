import { Table } from 'antd';
import { useState } from 'react';


export const Antecedentes = () => {

  const [hasData, setHasData] = useState(true);

  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };

  const programColumns = [
    {
      title: 'Motivo',
      dataIndex: 'motivo',
      key: 'motivo',
      align: 'center'
    },
    {
      title: 'Año',
      dataIndex: 'anio',
      key: 'anio',
      align: 'center'
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      align: 'center',
    },
  ]

  const programData = [
    {
      key: '1',
      motivo: 'Problema de productividad',
      anio: '2019',
      tipo: 'Aplicación de 5s'
    },
    {
      key: '2',
      motivo: 'Problema de productividad',
      anio: '2013',
      tipo: 'Aplicación de 5s'
    },
    {
      key: '3',
      motivo: 'Problema de productividad',
      anio: '2005',
      tipo: 'Aplicación de 5s'
    },
  ]

  return (

    <>
      <div className='info-general-titles'>
        <h3>HERRAMIENTAS</h3>
      </div>

      <div className='info-general-titles'>
        <h4>PROGRAMAS</h4>
      </div>

      <Table
        name="programas"
        columns={programColumns}
        dataSource={programData}
        pagination={false}
        checked={!!hasData}
        onChange={handleDataChange}
      />

    </>
  )
}
