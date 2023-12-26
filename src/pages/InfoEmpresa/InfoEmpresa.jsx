import { Tabs } from 'antd';
import { InfoGeneral } from './components/InfoGeneral';
import { Antecedentes } from './components/Antecedentes';
import './InfoEmpresa.css'


export const InfoEmpresa = () => {

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Información general',
            children: <InfoGeneral />,
        },
        {
            key: '2',
            label: 'Antecedentes',
            children: <Antecedentes />,
        },

    ];


    return (
        
            <Tabs 
            defaultActiveKey="1" 
            items={items} 
            onChange={onChange} 
            centered 
            />
        
    )
}
