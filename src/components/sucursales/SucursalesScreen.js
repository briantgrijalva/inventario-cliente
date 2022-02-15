import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/SucursalesScreen.css';

export const SucursalesScreen = () => {

    let navigate = useNavigate();
    
  return (
     <div className='container-sucursales'>
        <div className='title-separator'>
            Sucursales
        </div>
        <Container className='card-shadow div-card pt-3'>
            
            <Row>
                <Col xs={6} md={6}>
                    
                    <div className="input-group">
                        <input type='text' className="form-control" placeholder="Escribe un nombre"/>
                        <button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </Col>
                <Col xs={6} md={6}>
                    
                    <button
                        className='btn-add'
                        onClick={() =>  navigate('/nuevaSucursal')}
                    >
                        <i className="fas fa-plus-circle"></i> &nbsp; AGREGAR
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
                            <th scope="col">Nombre</th>
                            <th scope="col">País</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row"><input type='checkbox'/></th>
                            <td>Sucursal1</td>
                            <td>El Salvador</td>
                            <td>Atiquizaya</td>
                            <td>+503 777 777 7</td>
                            <td>kike@gmail.com</td>
                            <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                            </tr>
                            <tr>
                            <th scope="row"><input type='checkbox'/></th>
                            <td>Sucursal Jacob</td>
                            <td>Thornton</td>
                            <td>Atiquizaya</td>
                            <td>+503 777 777 7</td>
                            <td>kike@gmail.com</td>
                            <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                            </tr>
                            <tr>
                            <th scope="row"><input type='checkbox'/></th>
                            <td>Sucursal Larry</td>
                            <td>the Bird</td>
                            <td>Atiquizaya</td>
                            <td>+503 777 777 7</td>
                            <td>kike@gmail.com</td>
                            <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                <Col xs={6} md={0}></Col>
            </Row>

            <Row className='paginacion'>
                
                
                <Col xs={3} md={2} className='mb-2 mt-2' >
                    <div className="input-group paginacion" >
                        <div>
                            Filas 
                        </div>
                        
                        <select className="form-select ms-1" aria-label="Default select example" >
                            <option defaultValue>10</option>
                            <option value="1">10</option>
                            <option value="2">20</option>
                            <option value="3">30</option>
                        </select>
                    </div>
                     
                </Col>
                <Col xs={2} md={8}>
                    <div >
                        1 - 3 of 3
                    </div>
                </Col>
                
                <Col xs={7} md={2}>
                    <button type='button' className='btn-paginacion'>next <i className="fas fa-caret-right"></i></button>
                    <button type='button' className='btn-paginacion'><i className="fas fa-caret-left"></i> prev</button>
                </Col>
                
            </Row>

        </Container>
    </div>
  )     
}
