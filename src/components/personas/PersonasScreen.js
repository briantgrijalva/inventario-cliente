import React, { useState } from 'react';
import '../../styles/UsuariosScreen.css';
import { ClientesScreen } from './clientes/ClientesScreen';
import { ProveedoresScreen } from './proveedores/ProveedoresScreen';
import { UsuariosScreen } from './usuarios/UsuariosScreen';

export const PersonasScreen = () => {

    let buttons = document.querySelectorAll(".selected");
    
    buttons.forEach(button =>{
        button.addEventListener("click",_ =>{
          buttons.forEach(button =>{
            button.classList.remove("edit");
            
          })
          button.classList.toggle("edit");
        })
      })


    const [view, setView] = useState('Usuarios')
    /*El view se tiene que agregar en el localStorage*/ 
    
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

            <div className='ms-3 mt-4'>
                <button className='selected me-1 user' onClick={handleChangeView} id="usuarios">Usuarios</button>  
                <button className='selected me-1' onClick={handleChangeView} id="Clientes">Clientes</button>  
                <button className='selected' onClick={handleChangeView} id="Proveedores">Proveedores</button> 
            </div>

            {
                view === 'Usuarios' ? <UsuariosScreen /> : 
                view === 'Clientes' ? <ClientesScreen /> : 
                view === 'Proveedores' ? <ProveedoresScreen /> : <UsuariosScreen />
            }
            
        </div>
    )
}
