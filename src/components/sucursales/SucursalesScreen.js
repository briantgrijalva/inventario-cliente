import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import '../../styles/SucursalesScreen.css';

export const SucursalesScreen = () => {

    
    const {sucursal} = useSelector(state => state.sucursales);
    

    // console.log(sucursal[0].name);
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
                        className='btn-pdf me-3 btn-pdf-small' 
                    >
                        <i className="fas fa-file-pdf"></i> &nbsp; PDF
                    </button>
                    <button
                        className='btn-add me-3 btn-pdf-small'
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
                        {sucursal.map(scsal => ( 
                            // TODO: generar los IDs
                            <tr key={Math.random()}>
                                <th scope="row"><input type='checkbox'/></th>
                                <td>{scsal.name}</td>
                                <td>{scsal.pais}</td>
                                <td>{scsal.ciudad}</td>
                                <td>{scsal.tel}</td>
                                <td>{scsal.email}</td>
                                <td><i className="fas fa-pen"></i> <i className="fas fa-trash ms-1"></i></td>                                
                            </tr>
                            ))}
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
