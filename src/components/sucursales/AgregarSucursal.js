import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addNewSucursal } from '../../actions/sucursales';
import { useForm } from '../../hooks/useForm';
// import '../../styles/SucursalesScreen.css';

export const AgregarSucursal = () => {

    const dispatch = useDispatch();

    const initialForm = {
        name: '',
        tel: '',
        email: '',
        pais: '',
        ciudad: '',
        direccion: ''
    }
    
    const [{name, email, tel, pais, ciudad, direccion}, handleInputChange, reset] = useForm(initialForm);

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(addNewSucursal(name, email, tel, pais, ciudad, direccion));

        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sucursal creada correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        navigate('/sucursales');
    }

    const handleCancel = () => {
        reset();
        navigate('/sucursales');
    }

  return (
    <div className='container-sucursales'>
        <div className='title-separator'>
            Agregar nueva sucursal
        </div>
        <Container className='card-shadow div-card pt-3'>
        <form onSubmit={handleSubmit}>
            <Row className='mb-4'>
                
                    <Col xs={12} md={6}>
                        
                        <label htmlFor="name" className="form-label mt-4">Nombre</label>
                        <div className="input-group mt-0">
                            <input
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Nombre"
                            />
                            
                        </div>
                            <label htmlFor="tel" className="form-label mt-4">Teléfono</label>
                        <div className="input-group mt-0">
                            <input
                                type='tel' 
                                name='tel'
                                value={tel}
                                onChange={handleInputChange} 
                                className="form-control" 
                                placeholder="Teléfono"
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
                        
                            <label htmlFor="pais" className="form-label mt-4">País</label>
                        <div className="input-group mt-0">
                            <input 
                                type='text' 
                                name='pais'
                                value={pais}
                                onChange={handleInputChange} 
                                className="form-control" 
                                placeholder="País"
                            />
                            
                        </div>
                            <label htmlFor="ciudad" className="form-label mt-4">Ciudad</label>
                        <div className="input-group mt-0">
                            <input 
                                type='text' 
                                name='ciudad' 
                                value={ciudad}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Ciudad"
                            />
                            
                        </div>
                            <label htmlFor="direccion" className="form-label mt-4">Dirección</label>
                        <div className="input-group mt-0">
                            <input 
                                type='text' 
                                name='direccion' 
                                value={direccion}
                                onChange={handleInputChange}
                                className="form-control" 
                                placeholder="Dirección"
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
