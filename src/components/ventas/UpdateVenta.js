import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import { startLoadingProducto } from '../../actions/productos';
import { startLoading } from '../../actions/sucursales';
import { setActiveVenta, startLoadingVenta } from '../../actions/ventas';
import { useForm } from '../../hooks/useForm';

export const UpdateVenta = () => {

    const [btnPrevDisable, setBtnPrevDisable] = useState(false);
    const [btnNextDisable, setBtnNextDisable] = useState(true);
    const [counter, setCounter] = useState(0);
    const [initialPag, setInitialPag] = useState(0);
    const [lastPag, setLastPag] = useState(6);
    const [total, setTotal] = useState(0);
    const [cost, setCost] = useState(0);
    const [valueSelect, setValueSelect] = useState('');
    const [details, setDetails] = useState([]);
    const [totalPlus, setTotalPlus] = useState(0);
    const [costPlus, setCostPlus] = useState(0);
    const [utilityPlus, setUtilityPlus] = useState(0);
    const [sucursalName, setSucursalName] = useState([]);
    
    const {sucursal} = useSelector(state => state.sucursales);
    const {activeVenta} = useSelector(state => state.ventas);
    const {producto} = useSelector(state => state.productos);

    moment.locale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
        relativeTime : {
            future: "en %s",
            past:   "hace %s",
            // s: function (number, withoutSuffix, key, isFuture){
            //     return '00:' + (number<10 ? '0':'') + number + ' minutes';
            // },
            // m:  "01:00 minutes",
            // mm: function (number, withoutSuffix, key, isFuture){
            //     return (number<10 ? '0':'') + number + ':00' + ' minutes';
            // },
            s: 'un segunndo',
            ss: '%d segundos',
            m:  'un minuto',
            mm: '%d minutos',
            h:  "una hora",
            hh: "%d horas",
            d:  "un dia",
            dd: "%d dias",
            M:  "un mes",
            MM: "%d meses",
            y:  "un año",
            yy: "%d años"
        }
      }
    );
    
    // console.log(activeVenta[0].products);
    // let products = activeVenta[0].products;
    const [productoSelect, setProductoSelect] = useState([]);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    let ventaActive = localStorage.getItem('activeVenta');
    
    let parseVenta = JSON.parse(ventaActive);
    // console.log(parseVenta);

    
    // setSucursalName(sucursalVenta[0]);
    
    

    useEffect(() => {
        if (activeVenta) {
            let products = activeVenta[0].products;
            // console.log(activeSucursal[0]);
            // console.log(parseSucursal);
            setProductoSelect( products );
            setDetails(activeVenta[0]);
            setTotalPlus( Number(activeVenta[0].total.$numberDecimal) );
            setCostPlus( Number(activeVenta[0].expenses.$numberDecimal) );
            setUtilityPlus( Number(activeVenta[0].utility.$numberDecimal) );
            setSucursalName(sucursal.filter(s => s.id === activeVenta[0].sucursal).map(s => s.name));
            
            
        } 
        else {
            dispatch(setActiveVenta(parseVenta));
        }
        console.log(activeVenta);
        
        // console.log(details);
        // console.log(sucursalName);
        
        // console.log(activeSucursal);
        // eslint-disable-next-line
    }, [activeVenta, dispatch, sucursal])

    console.log(sucursalName);

    let productos = producto.map(pT => ({
        ...pT,
        cantidad: 1,
        totalSum: pT.price.$numberDecimal,
        totalCost: pT.cost.$numberDecimal,
      })).map(pT => pT);

    let totalItem = producto.length / 6;

    
    

    const [formValues, handleInputChange] = useForm({
        searchText: '',
        desc: 0,
        tax: 0,
        delivery: 0
    });

    const {searchText, desc, tax, delivery} = formValues;

    let initialState = { cantidad: "" };

    const [values, setValues] = useState(initialState);

    // const { cantidad } = values;

    useEffect(() => {

        dispatch(startLoadingProducto());
        dispatch(startLoading());
        dispatch(startLoadingVenta());

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
    let arrCost = [];
  
    useEffect(() => {
        let totales = algProduct;
        let costes = algProduct;
        
        totales.forEach(t => {
            
            arr.push(Number(t.totalSum));
            // console.log(Number(t.totalSum));
        });

        // console.log(arr);

        if (arr.length > 0) {
            const reducer = (accumulator, curr) => accumulator + curr;
            setTotal(arr.reduce(reducer))
        }

        costes.forEach(t => {
            
            arrCost.push(Number(t.totalCost));
            
        });

        if (arrCost.length > 0) {
            const reducer = (accumulator, curr) => accumulator + curr;
            setCost(arrCost.reduce(reducer))
        }
        
        // const arr = [1, 2, 3, 4];
        
    // eslint-disable-next-line
    }, [algProduct])

    const removeProduct = (e) => {
        console.log(e.target.id);

        let id = e.target.id;

        let productoSel = productoSelect.filter(p => p.id !== id).map(p => (p));

        console.log(productoSel);
        setProductoSelect(productoSel);
    }
   

    const handleAddProductSell = (e) => {

        let id = e.target.id;

        let productValidateCant = uniqByKeepLast(productoSelect, it => it.id).filter(p => p.id === id).map(p => (p));
        
        // console.log(productValidateCant[0].cantidad !== 1);
        // console.log(productValidateCant[0]);
        if (productValidateCant[0] === undefined || productValidateCant[0].cantidad === 1)  {
        // if (productValidateCant[0].cantidad === 1)  {
            let productoSel = productos.filter(p => p.id === id).map(p => (p));

            console.log(productoSel[0]);

            // console.log(productoSel[0]);
            
            // productoSel[0].cantidad = value;
            
            setProductoSelect([...productoSelect, productoSel[0]]);
            // productoParcial([...productoParcial, productoSel[0]]);
            productoSelect.forEach(t => {
                
                arr.push(Number(t.totalSum));
                arrCost.push(Number(t.totalCost));

                // console.log(Number(t.totalSum));
            });
        } else {
            return
        }
        
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
        productoSel[0].totalCost = (Number(productoSel[0].cost.$numberDecimal) * Number(productoSel[0].cantidad));
        // console.log(productoSel[0]);
        
        setProductoSelect([...productoSelect, productoSel[0]]);
        
        
      }

      algProduct = (uniqByKeepLast(productoSelect, it => it.id));
    

    const onChangeSelect = (e) => {
        
        setValueSelect(e.target.value);
    }

    const handleCancel = () => {
        // reset();
        navigate('/dashboard');
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let finalTax = (Number(tax) / 100) * Number(total);

        console.log(finalTax);

        let tempTotal = (Number(total) + Number(delivery) + Number(finalTax)) - Number(desc);

        // console.log(Math.round((tempTotal + Number.EPSILON) * 100) / 100);
        // setTotal(Math.round((tempTotal + Number.EPSILON) * 100) / 100);


        // console.log(sucursal[0].id);

       
        let finalTot = (Math.round((tempTotal + Number.EPSILON) * 100) / 100);
        // setTotal(finalTot);
        // console.log(total);


        // console.log(sucursal[0].id);

        let utilityOperation = (total - Number(cost));
        console.log('utility ' + utilityOperation);

        let venta = {
            products: algProduct,
            sucursal: valueSelect ? valueSelect : sucursal[0].id,
            total: finalTot,
            expenses: cost,
            utility: utilityOperation,
        };

        // let utilityOperation = (total - Number(cost));
        // console.log('utility ' + utilityOperation);

        

        // console.log(venta);

        if (venta.products.length === 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Venta rechazada',
                text: 'Parece que no has agregado productos',
                showConfirmButton: false,
                timer: 1500
            })
        } else {

            // dispatch(startCreateNewVenta(venta));
            // console.log('cost ' + cost);
            // console.log('total ' + total);
            // console.log(venta);
            // TODO: sumar a la wallet global el total de la venta

        }
    }
  return (
    <div className='container-sucursales'>
    <div className='title-separator'>
        Detalles de Venta
    </div>
    <Container className='div-card pt-3'>
        <form onSubmit={onSubmit}>
             <Row className='mb-4'>
            
                <Col xs={12} md={6} className='card-shadow'>

                    <div className="input-group mt-4" >
                  
                            
                            <select 
                                name='select' 
                                className="form-select" 
                                onChange={onChangeSelect}
                            >
                                {sucursal.map(s => (
                                    <option key={s.id} id={s.id} value={s.id}>{s.name}</option>
                                ))}
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
                                            </div>
                                            <div
                                                className='aligncenter'
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
                                            </div>
                                                
                                        </td>
                                        <td>${p.totalSum%1 === 0 ? p.totalSum + '.00' : p.totalSum}</td>
                                        <td className='center-element'>
                                            <i 
                                                id={p.id}
                                                className="fas fa-times btn-actions"
                                                onClick={removeProduct}
                                            ></i></td>
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
                                    className="form-control" 
                                    name='tax' 
                                    value={tax} 
                                    onChange={handleInputChange}
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
                                    onClick={handleCancel}
                                >
                                CANCELAR
                            </button>

                            <button 
                                variant="primary" 
                                type='submit' 
                                className="btn-save ms-5">
                                MODIFICAR
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
