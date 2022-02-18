import React from 'react'

import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../styles/SucursalesScreen.css';

export const ClientesScreen = () => {

    let navigate = useNavigate();
    const {clientes} = useSelector(state => state.personas);

    return (
        
    <Container className='card-shadow div-card pt-3'>
                
                <Row>
                    <Col xs={6} md={6}>
                        
                        <div className="input-group">
                            <input type='search' className="form-control" placeholder="Escribe un nombre"/>
                            <button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </Col>
                    
                    <Col xs={3} md={6}>

                        <button
                            className='btn-add me-3'
                            onClick={() =>  navigate('/nuevoCliente')}
                        >
                            <i className="fas fa-plus-circle"></i> &nbsp; AGREGAR
                        </button>

                        <button
                            className='btn-pdf me-3' 
                        >
                            <i className="fas fa-file-pdf"></i> &nbsp; PDF
                        </button>

                    </Col>



                </Row>

            
                <Row>
                    
                    <Col xs={6} md={0}></Col>
                    <Col xs={12} md={12} className='table-responsive'>
                        <table className="table table-borderless div-card">
                            <thead className='table-light'>
                                <tr>
                                <th scope="col"><input type='checkbox'/></th>
                                <th scope="col">Clientes</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(scsal => ( 
                                // TODO: generar los IDs
                                <tr key={Math.random()}>
                                    <th scope="row"><input type='checkbox'/></th>
                                    <td>{scsal.nombres}</td>
                                    <td>{scsal.email}</td>
                                    <td>{scsal.tipoCuenta}</td>
                                    <td>{scsal.tel}</td>
                                    <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>                                
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                    <Col xs={6} md={0}></Col>
                </Row>

            </Container>
  )
}
