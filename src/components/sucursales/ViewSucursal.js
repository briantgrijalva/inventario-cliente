import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clearActiveSucursal, setActiveSucursal, startLoading, startUpdatedSucursal } from '../../actions/sucursales';

export const ViewSucursal = () => {

    const initialForm = {
        name: '',
        tel: '',
        email: '',
        pais: '',
        ciudad: '',
        direccion: ''
    }


    const [isDisabled, setIsDisabled] = useState(true);
    const [values, setValues] = useState(initialForm);

    const reset = () => {
        setValues( initialForm );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
        // console.log(values);
    }

    const { name, email, tel, pais, ciudad, direccion } = values;

    const dispatch = useDispatch();
    
    const { activeSucursal } = useSelector(state => state.sucursales);

    let navigate = useNavigate();

    let sucursal = localStorage.getItem('activeSucursal');
    // console.log(JSON.parse(sucursal));
    let parseSucursal = JSON.parse(sucursal);
    

    useEffect(() => {

        dispatch(startLoading());
        
      }, [dispatch])
      

    useEffect(() => {
        if (activeSucursal) {
            // console.log(activeSucursal[0]);
            // console.log(parseSucursal);
            setValues( activeSucursal[0] );
        } 
        else {
            dispatch(setActiveSucursal(parseSucursal));
        }
        // console.log(activeSucursal);
        // eslint-disable-next-line
    }, [activeSucursal, dispatch])
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || tel === '' || pais === '' || ciudad === '' || direccion === '') {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Todos los campos son necesarios',
                showConfirmButton: false,
                timer: 1500
            })
        } else {

            if (activeSucursal) {
                console.log(values);
                dispatch(startUpdatedSucursal(values));
                dispatch(clearActiveSucursal());
                navigate('/sucursales');
            }
        }
    }

    const handleCancel = () => {
        reset();
        dispatch(clearActiveSucursal());
        navigate('/sucursales');
    }

    const handleClickDisable = () => {
        setIsDisabled(!isDisabled)
      };

  return (
    <div className='container-sucursales'>
        <div className='title-separator'>
            Detalles de la sucursal
            <i className="fas fa-pen btn-edit-icon" onClick={handleClickDisable}></i>
        </div>
        <Container className='card-shadow div-card pt-3'>
        <form onSubmit={handleSubmit}>
            <Row className='mb-4'>
                
                    <Col xs={12} md={6}>
                        
                        <label htmlFor="name" className="form-label mt-4">Nombre</label>
                        <div className="input-group mt-0">
                            <input
                                contentEditable='false'
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleInputChange}
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                disabled={isDisabled} 
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
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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