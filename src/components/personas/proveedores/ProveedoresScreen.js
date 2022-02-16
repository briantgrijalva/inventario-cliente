import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Col, Container, Row } from 'react-bootstrap';
import '../../../styles/SucursalesScreen.css';

export const ProveedoresScreen = () => {

    let navigate = useNavigate();
    


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
                            onClick={() =>  navigate('/nuevoProveedor')}
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
                                <th scope="col">Proveedores</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row"><input type='checkbox'/></th>
                                <td>Larry</td>
                                <td>larry@gmail.com</td>
                                <td>Activo</td>
                                <td>+503 777 777 7</td>
                                <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                                </tr>

                                <tr>
                                <th scope="row"><input type='checkbox'/></th>
                                <td>Larry</td>
                                <td>larry@gmail.com</td>
                                <td>Activo</td>
                                <td>+503 777 777 7</td>
                                <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                                </tr>

                                <tr>
                                <th scope="row"><input type='checkbox'/></th>
                                <td>Larry</td>
                                <td>larry@gmail.com</td>
                                <td>Activo</td>
                                <td>+503 777 777 7</td>
                                <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                                </tr>

                                <tr>
                                <th scope="row"><input type='checkbox'/></th>
                                <td>Larry</td>
                                <td>larry@gmail.com</td>
                                <td>Activo</td>
                                <td>+503 777 777 7</td>
                                <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col xs={6} md={0}></Col>
                </Row>

            </Container>
  )
}
