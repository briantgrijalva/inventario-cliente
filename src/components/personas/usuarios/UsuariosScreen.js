import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import '../../../styles/SucursalesScreen.css';
import { useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

export const UsuariosScreen = () => {

    const navigate = useNavigate()
    

    const {usuarios} = useSelector(state => state.personas);

    const [formValues, handleInputChange] = useForm({
        searchText: '',
    });

    let busqueda = '';
    const {searchText} = formValues;
    

    

  return (
    <Container className='card-shadow div-card pt-3'>
                
                <Row>
                    <Col xs={6} md={6}>
                        
                        <div className="input-group">
                            <input autoComplete='off' type='search' name='searchText' value={searchText} onChange={handleInputChange} className="form-control" placeholder="Escribe un nombre"/>
                            <button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </Col>
                    
                    <Col xs={3} md={6}>

                        <button
                            className='btn-add me-3'
                            onClick={() =>  navigate('/nuevoUsuario')}
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
                                <th scope="col">Usuario</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Tipo de cuenta</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                
                                    searchText === '' ?
                                    
                                    usuarios.map(scsal => ( 
                                    // TODO: generar los IDs
                                    <tr key={Math.random()}>
                                        <th scope="row"><input type='checkbox'/></th>
                                        <td>{scsal.nombres}</td>
                                        <td>{scsal.email}</td>
                                        <td>{scsal.tipoCuenta}</td>
                                        <td>{scsal.tel}</td>
                                        <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>                                
                                    </tr>
                                    ))

                                    :

                                    usuarios.filter(nombre => nombre.nombres.toLowerCase().includes(searchText.toLowerCase())).map(scsal => ( 
                                        // TODO: generar los IDs
                                        <tr key={Math.random()}>
                                            <th scope="row"><input type='checkbox'/></th>
                                            <td>{scsal.nombres}</td>
                                            <td>{scsal.email}</td>
                                            <td>{scsal.tipoCuenta}</td>
                                            <td>{scsal.tel}</td>
                                            <td> &nbsp; <i className="fas fa-pen"></i> &nbsp; <i className="fas fa-trash"></i></td>                                
                                        </tr>
                                        ))
                                        
                            
                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col xs={6} md={0}></Col>
                </Row>

            </Container>
  )
}
