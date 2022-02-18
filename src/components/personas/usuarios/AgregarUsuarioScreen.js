import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewUsuario } from '../../../actions/personas';
import { useForm } from '../../../hooks/useForm';
// import '../../styles/SucursalesScreen.css';

export const AgregarUsuarioScreen = () => {

    const initialForm = {
        nombres: '', 
        apellidos: '', 
        tel: '', 
        email: '', 
        tipoCuenta: '', 
        pass: '', 
        pass2: ''
    }
    
    const [{nombres, apellidos, tel, email, tipoCuenta, pass, pass2}, handleInputChange, reset] = useForm(initialForm);

    // TODO: Implementar redux

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        dispatch(addNewUsuario(nombres, apellidos, tel, email, tipoCuenta, pass, pass2));
        // TODO: mostrar alerta
        reset();
        //navigate('/personas');
    }

    const handleCancel = () => {
        // TODO: limpiar campos
        reset();
        navigate('/personas');
    }

  return (
    <div className='container-sucursales'>
        <div className='title-separator'>
            Agregar un nuevo usuario
        </div>
        <Container className='card-shadow div-card py-3'>
            <form onSubmit={handleSubmit}>
                <Row className='mb-4'>
                
                    <Col xs={12} md={6}>
                        
                        <label htmlFor="name" className="form-label mt-4">Nombre</label>
                        <div className="input-group mt-0">
                            <input
                                type='text'
                                name='nombres'
                                value={nombres}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Nombres"
                            />
                            
                        </div>

                        <label htmlFor="name" className="form-label mt-4">Apellidos</label>
                        <div className="input-group mt-0">
                            <input
                                type='text'
                                name='apellidos'
                                value={apellidos}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Apellidos"
                            />
                            
                        </div>

                            <label htmlFor="tel" className="form-label mt-4">Teléfono</label>
                        <div className="input-group mt-0">
                            <input
                                type='number' 
                                name='tel'
                                value={tel}
                                onChange={handleInputChange} 
                                className="form-control" 
                                placeholder="Telefono"
                            />
                            
                        </div>
                            <label htmlFor="email" className="form-label mt-4">Correo Electronico</label>
                        <div className="input-group mt-0">
                            <input 
                                type='email' 
                                name='email' 
                                value={email}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Correo"
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        
                            <label htmlFor="tipoCuenta" className="form-label mt-4">Tipo de cuenta</label>
                        <div className="input-group mt-0">
                            <input 
                                type='text' 
                                name='tipoCuenta'
                                value={tipoCuenta}
                                onChange={handleInputChange} 
                                className="form-control" 
                                placeholder="País"
                            />
                            
                        </div>
                            <label htmlFor="pass" className="form-label mt-4">Contraseña</label>
                        <div className="input-group mt-0">
                            <input 
                                type='password' 
                                name='pass' 
                                value={pass}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Contraseña"
                            />
                            
                        </div>
                            <label htmlFor="pass" className="form-label mt-4">Repetir contraseña</label>
                        <div className="input-group mt-0">
                            <input 
                                type='password' 
                                name='pass2' 
                                value={pass2}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Repetir contraseña"
                            />
                            
                        </div>
                        
                        <button variant="primary" type='submit' className="btn-save mb-4 mt-3">
                            GUARDAR
                        </button>

                        <button
                            variant="primary" 
                            type='button'
                            className="btn-cancel mb-4 mt-3 me-4"
                            onClick={handleCancel}
                        >
                            CANCELAR
                        </button>
                        
                        
                    </Col>
                </Row>
            </form>

        </Container>
    </div>
  )
}
