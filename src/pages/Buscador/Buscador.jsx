import React from 'react'
import {Form, InputNumber, Select} from 'antd'
import './Buscador.css'

function Buscador() {
  return (
    <div className='section-container'>
        <h1 className="section-title">Empresas</h1>
        <p className="section-description">
        Buscá una empresa o grupo de empresas filtrando por sus características.
      </p>

      <Form layout='horizontal'>
      <p>CARACTERÍSTICAS</p>
        <div className='filter-container'>
        <Form.Item name={'CUIT'}>
            <InputNumber controls={false} className='search-input' placeholder='CUIT'/>
        </Form.Item>
        <Form.Item name={'rubro'}>
            <Select placeholder='Rubro'/>
        </Form.Item>
        <Form.Item>
            <Select placeholder='Sección CLAE'/>
        </Form.Item>
        <Form.Item>
            <Select placeholder='Nivel Kaizen'/>
        </Form.Item>
        </div>
      <p>LOCALIZACIÓN</p>
       <div className="filter-container">
       <Form.Item>
            <Select placeholder='Provincia'/>
        </Form.Item>
        <Form.Item>
            <Select placeholder='Ciudad'/>
        </Form.Item>
       </div>
        
        
      </Form>


    </div>
  )
}

export default Buscador