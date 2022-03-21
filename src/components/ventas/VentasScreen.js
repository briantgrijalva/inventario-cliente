import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingProducto } from '../../actions/productos';
import { startLoading } from '../../actions/sucursales';
import { useForm } from '../../hooks/useForm';

export const VentasScreen = () => {

   
  const [btnPrevDisable, setBtnPrevDisable] = useState(false);
  const [btnNextDisable, setBtnNextDisable] = useState(true);
  const [counter, setCounter] = useState(0);
  const [initialPag, setInitialPag] = useState(0);
  const [lastPag, setLastPag] = useState(6);
  
  const {producto} = useSelector(state => state.productos);
  const {sucursal} = useSelector(state => state.sucursales);

  let totalItem = producto.length / 6;

  const dispatch = useDispatch();

  const [formValues, handleInputChange, reset] = useForm({
    searchText: '',
  });

  const {searchText} = formValues;

  useEffect(() => {

    dispatch(startLoadingProducto());

  }, [dispatch])

  useEffect(() => {

    dispatch(startLoading());

  }, [dispatch])

  useEffect(() => {
    if (counter === 0) {
        setBtnPrevDisable(true);
    } else if (counter !== 0) {
        setBtnPrevDisable(false);
    }
    console.log(counter);
  }, [counter])

  useEffect(() => {
      if (counter === Math.ceil(totalItem - 1)) {
          setBtnNextDisable(true);
      } else if (counter !== (totalItem - 1)){
          setBtnNextDisable(false);
      }
      if (totalItem === 0) {
          setBtnNextDisable(true);
          setBtnPrevDisable(true);
      }
  }, [counter, totalItem])

  const handleNext = () => {
      setInitialPag(initialPag + 6);
      setLastPag(lastPag + 6);

      setCounter(counter + 1);
  }

  const handlePrev = () => {
      setInitialPag(initialPag - 6);
      setLastPag(lastPag - 6);

      setCounter(counter - 1);
  }

  let numPag = counter + 1;


  return (
    <div className='container-sucursales'>
    <div className='title-separator'>
        Realizar Venta
    </div>
    <Container className='div-card pt-3'>
        <form>
            <Row className='mb-4'>
            
                <Col xs={12} md={6} className='card-shadow'>

                    <div className="input-group mt-4" >
                            {/* <div>
                                Filas 
                            </div> */}
                            
                            <select 
                                name='select' 
                                className="form-select" 
                                // value={localStorage.getItem("paginacion")} 
                                // onChange={onChangeSelect}
                            >
                                {sucursal.map(s => (
                                    <option key={s.id} value={s.name}>{s.name}</option>
                                ))}
                                {/* <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='all'>all</option> */}
                            </select>
                            
                    </div>
                    <Row>
                        <Col xs={6} md={0}></Col>
                        <Col xs={12} md={12} className='table-responsive'>
                            <table className="table table-borderless div-card">
                                <thead className='table-light'>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col" className='center-element'>Cantidad</th>
                                    <th scope="col">Total Parcial</th>
                                    <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                <tr>
                                    <td>Pan</td>
                                    <td>$15.00</td>
                                    <td>
                                        <div className='alignleft'>
                                            <button 
                                                // disabled={btnPrevDisable} 
                                                type='button' 
                                                className='btn-plus-minus' 
                                                // style={{float: 'left'}}
                                                // className='btn-paginacion'
                                                // onClick={handlePrev}
                                                >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                        </div>
                                        <div
                                            className='aligncenter'
                                            // className='center-element'
                                            // style={{textAlign: 'center'}}
                                        >
                                            <p>1</p>
                                        </div>
                                            
                                        <div className='alignright'>
                                            <button 
                                                // disabled={btnNextDisable} 
                                                type='button' 
                                                className='btn-plus-minus' 
                                                style={{float: 'right'}}
                                                // className='btn-paginacion' 
                                                // onClick={handleNext}
                                                >
                                                <i className="fas fa-plus "></i>
                                            </button>
                                        </div>
                                            
                                    </td>
                                    <td>$15.00</td>
                                    <td className='center-element'><i className="fas fa-times btn-actions"></i></td>
                                </tr>
                                {
                                    // producto.map(scsal => ( 
                                    //     <tr key={scsal.id}>
                                    //         <th scope="row">
                                                
                                    //         </th>
                                    //         <td>
                                    //             <img 
                                    //                 src={`${process.env.REACT_APP_API_URL}/upload/${scsal.photo}`}
                                    //                 style={{width: "4rem"}}
                                    //                 alt='...'
                                    //             />
                                    //         </td>
                                    //         <td>{scsal.name}</td>
                                    //         <td>{scsal.barCode}</td>
                                    //         <td>{scsal.category}</td>
                                    //         <td>{scsal.brand}</td>
                                    //         <td>{scsal.price.$numberDecimal}</td>
                                    //         <td>{scsal.unitProduct}</td>
                                    //         <td>{0 /* condicion si existe cantidad en ajuste de stock ponerlo si no sera CERO*/}</td>
                                    //         <td><i className="fas fa-eye" id={scsal.id} onClick={handleView}></i> <i className="fas fa-trash ms-1" id={scsal.id} onClick={handleDelete}></i></td>                                
                                    //     </tr>
                                    //     ))
                                }
                                </tbody>
                            </table>
                        </Col>
                        <Col xs={6} md={0}></Col>
                    </Row>

                    <div 
                        className="input-group center-element total-div" 
                        // style={{marginTop: '13rem'}}
                    >
                       <div>Total : $50.00</div>  
                    </div>     
                    <Row className='mt-4'>
                        <Col xs={4} md={4}>
                            <label htmlFor="tax" className="form-label">Impuesto</label>
                            <div className="input-group flex-nowrap">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // value='0' 
                                    placeholder='0'
                                    aria-describedby="tax"
                                />
                                <span className="input-group-text" id="tax">%</span>
                            </div>
                        </Col>
                        <Col xs={4} md={4}>
                            <label htmlFor="desc" className="form-label">Descuento</label>
                            <div className="input-group flex-nowrap">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // value='0' 
                                    placeholder='0'
                                    aria-describedby="desc"
                                />
                                <span className="input-group-text" id="desc">$</span>
                            </div>
                        </Col>
                        <Col xs={4} md={4}>
                            <label htmlFor="delivery" className="form-label">Envío</label>
                            <div className="input-group flex-nowrap">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // value='0' 
                                    placeholder='0'
                                    aria-describedby="delivery"
                                />
                                <span className="input-group-text" id="delivery">$</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-4 mb-4'>
                        <Col xs={0} md={2}>
                            
                        </Col>
                        <Col xs={12} md={8} className='center-element'>
                            
                            <button
                                    variant="primary" 
                                    type='button'
                                    className="btn-cancel me-5"
                                    //   onClick={handleCancel}
                                >
                                REINICIAR
                            </button>

                            <button 
                                variant="primary" 
                                type='button' 
                                className="btn-save ms-5">
                                PAGAR
                            </button>
                            
                        </Col>
                        <Col xs={0} md={2}>
                            
                        </Col>
                    </Row>
                    

                      
                </Col>

                <Col xs={12} md={6} className='card-shadow'>
                  
                  <div className="input-group mt-4">
                      <input 
                          type='search' 
                          className="form-control" 
                          placeholder="Escribe un nombre" 
                          name='searchText' 
                          value={searchText} 
                          onChange={handleInputChange}
                      />
                      <button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i></button>
                  </div>

                  <Row>
                  {searchText === '' 
                    ?       
                      producto.map(p => ( 
                        <Col xs={6} md={4} key={p.id} className='mt-2'>
                          <div>
                            <div className="card card-shadow card-products" >
                                <div className="card-body">
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/upload/${p.photo}`}
                                    className="img-fluid"
                                    alt='...'
                                />
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.barCode}</p>
                                <p 
                                    className="card-text price-cube"
                                    
                                >
                                    $ {p.price.$numberDecimal%1 === 0 ? p.price.$numberDecimal + '.00' : p.price.$numberDecimal} 
                                </p>
                                
                                </div>
                            </div>
                          </div>
                        </Col>
                            // Recorre el numero de elementos que indiquemos
                            )).slice(initialPag, lastPag)
                    : producto.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())).map(p => (
                        <Col xs={6} md={4} key={p.id} className='mt-2'>
                          <div>
                            <div className="card card-shadow" >
                                
                                <div className="card-body">
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/upload/${p.photo}`}
                                    className="img-fluid"
                                    alt='...'
                                />
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.barCode}</p>
                                <p className="card-text">$ {p.price.$numberDecimal%1 === 0 ? p.price.$numberDecimal + '.00' : p.price.$numberDecimal} </p>
                                
                                </div>
                            </div>
                          </div>
                        </Col>
                      ))
		              }
                    
                  </Row>

                  <Row className='mt-2 mb-4'>
                    <Col xs={1} md={3}></Col>
                    <Col xs={4} md={2} className='center-element'>
                      <button 
                        disabled={btnPrevDisable} 
                        type='button' 
                        className='paginacion-product' 
                        // className='btn-paginacion'
                        onClick={handlePrev}
                        >
                          <i className="fas fa-caret-left"></i> prev
                      </button>
                      
                    </Col>
                    <Col xs={2} md={2}>
                        <div
                            className='center-element'
                        >
                            {numPag}
                        </div>
                    </Col>
                    <Col xs={4} md={2} className='center-element'>
                    <button 
                        disabled={btnNextDisable} 
                        type='button' 
                        className='paginacion-product' 
                        // className='btn-paginacion' 
                        onClick={handleNext}
                        >
                          next <i className="fas fa-caret-right"></i>
                      </button>

                    </Col>
                    <Col xs={1} md={3}></Col>
                  </Row>
                    
                    
                </Col>
            </Row>
        </form>

    </Container>
</div>
  )
}
