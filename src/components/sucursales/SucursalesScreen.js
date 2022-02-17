import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const SucursalesScreen = () => {

    const {sucursal} = useSelector(state => state.sucursales);

    let totalItem = sucursal.length;
    console.log(totalItem);

    let navigate = useNavigate();

    const [btnPrevDisable, setBtnPrevDisable] = useState(false);
    const [btnNextDisable, setBtnNextDisable] = useState(false);
    const [counter, setCounter] = useState(0);
    const [valueSelect, setValueSelect] = useState(0);
    const [initialPag, setInitialPag] = useState(0);
    const [lastPag, setLastPag] = useState(parseInt(localStorage.getItem("paginacion")));

    console.log(counter);

    // useEffect(() => {
    //     if (counter === (totalItem - 2)) {
    //         console.log('last');
    //         setBtnNextDisable(true);
    //     } else {
    //         setBtnNextDisable(false);
    //     }
    // }, [counter])
    
    

    const handleNext = () => {
        setInitialPag(initialPag + parseInt(localStorage.getItem("paginacion")));
        setLastPag(lastPag + parseInt(localStorage.getItem("paginacion")));
        setCounter(counter + 1);
        console.log(`counter ${counter}`);
        // console.log(initialPag);
        // console.log(lastPag);

        if (counter === (totalItem - 2)) {
            console.log('last');
            // setBtnNextDisable(true);
        } 
        // else {
        //     setBtnNextDisable(false);
        // }
    }

    const handlePrev = () => {
        setInitialPag(initialPag - parseInt(localStorage.getItem("paginacion")));
        setLastPag(lastPag - parseInt(localStorage.getItem("paginacion")));

        setCounter(counter - 1);

        if (counter === 1) {
            console.log('first');
            // setBtnPrevDisable(true);
        } 
        // else {
        //     setBtnPrevDisable(false);
        // }

        // console.log(initialPag);
        // console.log(lastPag);
    }

    const onChangeSelect = (e) => {
        setValueSelect(e.target.value);
        localStorage.setItem("paginacion", e.target.value);
        setInitialPag(0);
        setLastPag(parseInt(localStorage.getItem("paginacion")));
    }
    
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
                        className='btn-pdf me-3' 
                    >
                        <i className="fas fa-file-pdf"></i> &nbsp; PDF
                    </button>
                    <button
                        className='btn-add me-3'
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
                        {localStorage.getItem("paginacion") === 'all' 
                        ? sucursal.map(scsal => ( 
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
                            ))
                        : sucursal.map(scsal => ( 
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
                            // Recorre el numero de elementos que indiquemos
                            )).slice(initialPag, lastPag)
                        }
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
                        
                        <select 
                            name='select' 
                            className="form-select ms-1" 
                            value={localStorage.getItem("paginacion")} 
                            onChange={onChangeSelect}
                        >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='all'>all</option>
                        </select>
                        
                    </div>
                    
                </Col>
                <Col xs={2} md={8}>
                    <div >
                        1 - {valueSelect} of 3{/* total de paginas agregar counter*/}
                    </div>
                    
                </Col>
                
                <Col xs={7} md={2}>
                    <button disabled={btnNextDisable} type='button' className='btn-paginacion' onClick={handleNext}>next <i className="fas fa-caret-right"></i></button>
                    <button disabled={btnPrevDisable} type='button' className='btn-paginacion' onClick={handlePrev}><i className="fas fa-caret-left"></i> prev</button>
                </Col>
                
            </Row>
            
        </Container>
        {/* {localStorage.getItem("paginacion") === 'all' ? console.log('all') : console.log('otra')} */}
    </div>
  )     
}
