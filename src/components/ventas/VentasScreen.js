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
    const [total, setTotal] = useState(0);
    const [productoSelect, setProductoSelect] = useState([]);
    const [finalTotal, setFinalTotal] = useState(0);
    
    
    const {producto} = useSelector(state => state.productos);
    const {sucursal} = useSelector(state => state.sucursales);

    // console.log(producto);
    let productos = producto.map(pT => ({
        ...pT,
        cantidad: 1,
        totalSum: pT.price.$numberDecimal //* pT.cantidad
      })).map(pT => pT);

    

    // console.log(productos);

    let totalItem = producto.length / 6;

    const dispatch = useDispatch();
    

    const [formValues, handleInputChange, reset] = useForm({
        searchText: '',
        desc: 0,
        tax: 0,
        delivery: 0
    });

    const {searchText, desc, tax, delivery} = formValues;

    let initialState = { cantidad: "" };

    const [values, setValues] = useState(initialState);

    const { cantidad } = values;

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
        // console.log(counter);
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

    const uniqByKeepLast = (a, key) => {
        return [
            ...new Map(
                a.map(x => [key(x), x])
            ).values()
        ]
    }
    
    let algProduct = [];
    let arr = [];
  
    useEffect(() => {
        let totales = algProduct;
        
        totales.forEach(t => {
            
            arr.push(Number(t.totalSum));
            // console.log(Number(t.totalSum));
        });

        // console.log(arr);

        if (arr.length > 0) {
            const reducer = (accumulator, curr) => accumulator + curr;
            setTotal(arr.reduce(reducer))
        }
        
        // const arr = [1, 2, 3, 4];
        
    // eslint-disable-next-line
    }, [algProduct])
   


    const handleAddProductSell = (e) => {


        let id = e.target.id;
        
        let productoSel = productos.filter(p => p.id === id).map(p => (p));

        // console.log(productoSel[0]);
        
        // productoSel[0].cantidad = value;
        
        setProductoSelect([...productoSelect, productoSel[0]]);
        // productoParcial([...productoParcial, productoSel[0]]);
        productoSelect.forEach(t => {
            
            arr.push(Number(t.totalSum));
            // console.log(Number(t.totalSum));
        });
        
    }


    function handleChange({target}) {
        // console.log(target.value);
        setValues({
            ...values,
            [ target.name ]: target.value
        });

        let id = target.id;
        
        let productoSel = productos.filter(p => p.id === id).map(p => (p));

        productoSel[0].cantidad = target.value;
        productoSel[0].totalSum = (Number(productoSel[0].price.$numberDecimal) * Number(productoSel[0].cantidad));
        // console.log(productoSel[0]);
        
        setProductoSelect([...productoSelect, productoSel[0]]);
        // productoParcial([...productoParcial, productoSel[0]]);

        // let arrForAmount = (uniqByKeepLast(productoParcial, it => it.id));

        // console.log(arrForAmount);
        
      }

      algProduct = (uniqByKeepLast(productoSelect, it => it.id));
    //   console.log(productoSelect);
      
    //   console.log(algProduct);
    const onSubmit = (e) => {
        e.preventDefault()

        let finalTax = (Number(tax) / 100) * Number(total);

        console.log(finalTax);

        let tempTotal = (Number(total) + Number(delivery) + Number(finalTax)) - Number(desc);

        console.log(tempTotal);
        setFinalTotal(tempTotal)

        console.log('enviar');
    }

   

  return (
    <div className='container-sucursales'>
    <div className='title-separator'>
        Realizar Venta
    </div>
    <Container className='div-card pt-3'>
        <form onSubmit={onSubmit}>
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
                                
                                    {algProduct.map(p => (
                                        <tr key={p.id} >
                                        <td>{p.name}</td>
                                        <td>$ {p.price.$numberDecimal%1 === 0 ? p.price.$numberDecimal + '.00' : p.price.$numberDecimal}</td>
                                        <td>
                                            <div className='alignleft' id={p.id}>
                                                {/* <button 
                                                    // disabled={btnPrevDisable} 
                                                    type='button' 
                                                    className='btn-plus-minus' 
                                                    // style={{float: 'left'}}
                                                    id={p.id}
                                                    name="firstName" 
                                                    onChange={handleChange}
                                                    // className='btn-paginacion'
                                                    onClick={handleDecrement}
                                                    ref={currentR}
                                                    >
                                                    <i className="fas fa-minus" id={p.id}></i>
                                                </button> */}
                                            </div>
                                            <div
                                                className='aligncenter'
                                                // className='center-element'
                                                // style={{textAlign: 'center'}}
                                            >
                                                <input 
                                                    style={{width: '2rem'}}
                                                    type='number' 
                                                    name="cantidad"
                                                    id={p.id}
                                                    value={p.cantidad}
                                                    onChange={handleChange} min={1}/>
                                                <p >{p.cantidad}</p>
                                            </div>
                                                
                                            <div className='alignright' id={p.id}>
                                                {/* <button 
                                                    // disabled={btnNextDisable} 
                                                    type='button' 
                                                    className='btn-plus-minus' 
                                                    style={{float: 'right'}}
                                                    id={p.id}
                                                    // className='btn-paginacion' 
                                                    onClick={handleAddProductSell}
                                                    >
                                                    <i className="fas fa-plus "  id={p.id}></i>
                                                </button> */}
                                            </div>
                                                
                                        </td>
                                        <td>${p.totalSum%1 === 0 ? p.totalSum + '.00' : p.totalSum}</td>
                                        <td className='center-element'><i className="fas fa-times btn-actions"></i></td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </Col>
                        <Col xs={6} md={0}></Col>
                    </Row>

                    <div 
                        className="input-group center-element total-div" 
                        // style={{marginTop: '13rem'}}
                    >
                       <div>Total : $ {total%1 === 0 ? total + '.00' : total}</div>  
                    </div>     
                    <Row className='mt-4'>
                        <Col xs={4} md={4}>
                            <label htmlFor="tax" className="form-label">Impuesto</label>
                            <div className="input-group flex-nowrap">
                                <input 
                                    type="number" 
                                    min={0}
                                    // max={1}
                                    // step={0.01}
                                    className="form-control" 
                                    name='tax' 
                                    value={tax} 
                                    onChange={handleInputChange}
                                    // value='0' 
                                    // placeholder='0'
                                    aria-describedby="tax"
                                />
                                <span className="input-group-text" id="tax">%</span>
                            </div>
                        </Col>
                        <Col xs={4} md={4}>
                            <label htmlFor="desc" className="form-label">Descuento</label>
                            <div className="input-group flex-nowrap">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name='desc' 
                                    value={desc} 
                                    onChange={handleInputChange}
                                    // value='0' 
                                    // placeholder='0'
                                    aria-describedby="desc"
                                />
                                <span className="input-group-text" id="desc">$</span>
                            </div>
                        </Col>
                        <Col xs={4} md={4}>
                            <label htmlFor="delivery" className="form-label">Envío</label>
                            <div className="input-group flex-nowrap">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name='delivery' 
                                    value={delivery} 
                                    onChange={handleInputChange}
                                    // value='0' 
                                    // placeholder='0'
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
                                type='submit' 
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
                          
                            <div 
                                className="card card-shadow card-products" 
                                
                            >
                                <div
                                    className="card-body" 
                                    id={p.id}
                                    onClick={handleAddProductSell}
                                >
                                <img 
                                    id={p.id}
                                    src={`${process.env.REACT_APP_API_URL}/upload/${p.photo}`}
                                    className="img-fluid"
                                    alt='...'
                                />
                                <h5 className="card-title" id={p.id}>{p.name} </h5>
                                <p className="card-text" id={p.id}>{p.barCode}</p>
                                <p 
                                    className="card-text price-cube"
                                    id={p.id}
                                >
                                    $ {p.price.$numberDecimal%1 === 0 ? p.price.$numberDecimal + '.00' : p.price.$numberDecimal} 
                                </p>
                                
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
