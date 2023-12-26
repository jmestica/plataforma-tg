import { useState } from 'react';
import { Table, Button } from 'antd';
import { LinkOutlined, TeamOutlined } from '@ant-design/icons';

export const InfoGeneral = () => {

    const [hasData, setHasData] = useState(true);

    const handleDataChange = (newHasData) => {
        setHasData(newHasData);
    };


    /* DATOS Y CONFIGURACION DE LAS TABLAS*/
    const columns = [
        {
            title: 'CUIT',
            dataIndex: 'Cuit',
            key: 'Cuit',
            align: 'center',
        },
        {
            title: 'DOMICILIO',
            dataIndex: 'Domicilio',
            key: 'Domicilio',
            align: 'center',
        },
        {
            title: 'LOCALIDAD',
            dataIndex: 'Localidad',
            key: 'Localidad',
            align: 'center',
        },
        {
            title: 'PROVINCIA',
            key: 'Provincia',
            dataIndex: 'Provincia',
            align: 'center',
        }
    ]

    const infoData = [
        {
            key: '1',
            Cuit: 33502104689,
            Domicilio: 'Parque Industrial Este, km 13',
            Localidad: 'Neuquén',
            Provincia: 'Neuquén'
        },
    ]

    const sectorColumns = [
        {
            title: 'SECTOR DE PERTENENCIA',
            dataIndex: 'sectorPertenencia',
            key: 'CUIT',
            align: 'center'
        },
        {
            title: 'SECTOR QUE ABASTECE',
            dataIndex: 'sectorAbastece',
            key: 'sectorAbastece',
            align: 'center',
        },
    ]

    const sectorData = [
        {
            key: '1',
            sectorPertenencia: 'Metalmecánica',
            sectorAbastece: 'Petróleo',
        },
    ]

    const claesColumns = [
        {
            title: 'Código de actividad',
            dataIndex: 'codigoActividad',
            key: 'codigoActividad',
            align: 'center'
        },
        {
            title: 'Sección',
            dataIndex: 'seccion',
            key: 'seccion',
            align: 'center'
        },
        {
            title: 'Descripción de actividad',
            dataIndex: 'descripcionActividad',
            key: 'descripcionActividad',
            align: 'center',
        },
    ]

    const claesData = [
        {
            key: '1',
            codigoActividad: '#14578658',
            seccion: 'IT',
            descripcionActividad: 'Servicios de tecnología'
        },
        {
            key: '2',
            codigoActividad: '#14578658',
            seccion: 'IT',
            descripcionActividad: 'Servicios de tecnología'
        },
        {
            key: '3',
            codigoActividad: '#14578658',
            seccion: 'IT',
            descripcionActividad: 'Servicios de tecnología'
        },
    ]


    return (

        <>

            <div className='info-general-titles'>
                <h3>DESCRIPCIÓN</h3>
            </div>
            <hr className="linea-gris" />

            <Table
                name="datos-generales"
                columns={columns}
                dataSource={infoData}
                pagination={false}
                checked={!!hasData}
                onChange={handleDataChange}
            />

            <br />

            <Table
                name="sectores"
                columns={sectorColumns}
                dataSource={sectorData}
                pagination={false}
                checked={!!hasData}
                onChange={handleDataChange}
            />

            <br />

            <div className='info-general-titles'>
                <h3>LINKS</h3>
            </div>

            <div className='info-general-buttons'>

                <Button
                    type="primary"
                    icon={<TeamOutlined />}
                    size='default'
                    style={{ margin: '10px' }} >
                    Historial CRM
                </Button>

                <Button
                    type="primary"
                    icon={<LinkOutlined />}
                    size='default'
                    style={{ margin: '10px' }} >
                    Página Web
                </Button>
            </div>

            <br />

            <div className='info-general-titles'>
                <h3>TAMAÑO DE EMPRESA (SEPYME)</h3>
            </div>

            <div className='info-general-titles'>
                <h3>CLAES</h3>
            </div>

            <Table
                name='claes'
                columns={claesColumns}
                dataSource={claesData}
                pagination={false}
                checked={!!claesData}
                onChange={handleDataChange}
            />
        </>

    )
}
