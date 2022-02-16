import React, { useState } from 'react';
import '../../styles/UsuariosScreen.css';
import { ClientesScreen } from './clientes/ClientesScreen';
import { ProveedoresScreen } from './proveedores/ProveedoresScreen';
import { UsuariosScreen } from './usuarios/UsuariosScreen';

export const PersonasScreen = () => {

    const [view, setView] = useState('Usuarios')
    
    const handleChangeView = (e) => {
        
        e.target.id === 'usuarios' ? setView('Usuarios') :
        e.target.id === 'Clientes' ? setView('Clientes') :
        e.target.id === 'Proveedores' ? setView('Proveedores') : setView('Usuarios')
         
    }




    return (
        <div className='container-sucursales'>
            
            <div className='title-separator'>
                {view}
            </div>

            <div className='panel pink'>
                <button className='selected me-3' onClick={handleChangeView} id="usuarios">Usuarios</button>  
                <button className='selected me-3' onClick={handleChangeView} id="Clientes">Clientes</button>  
                <button className='selected me-3' onClick={handleChangeView} id="Proveedores">Proveedores</button> 
            </div>

            {
                view === 'Usuarios' ? <UsuariosScreen /> : 
                view === 'Clientes' ? <ClientesScreen /> : 
                view === 'Proveedores' ? <ProveedoresScreen /> : <UsuariosScreen />
            }
            
        </div>
    )
}
