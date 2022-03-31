import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startLoadingProducto } from '../../actions/productos';
import { startLoading } from '../../actions/sucursales';
import { setActiveVenta, startDeletedVenta, startLoadingVenta } from '../../actions/ventas';
import Checkbox from '../../helpers/Checkbox';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const DashboardScreen = () => {

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [utility, setUtility] = useState(0);
  const [initialPag, setInitialPag] = useState(0);
  const [lastPag, setLastPag] = useState(6);
  const [check, setCheck] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const {venta} = useSelector(state => state.ventas);
  const {producto} = useSelector(state => state.productos);
  const {sucursal} = useSelector(state => state.sucursales);

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

  

  // TODO: Hacer una funcionalidad que me devulva la suma(wallet) de el total de las ventas ventas(venta.total)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let arrTotal = [];
  let arrCost = [];
  let arrUtility = [];

  let ventaDate = venta.map(v => v.dateSell);

  // console.log(ventaDate);

  useEffect(() => {

      let totales = venta;
      let costes = venta;
      let utilidades = venta;
      
      totales.forEach(t => {
          arrTotal.push(Number(t.total.$numberDecimal));
      });


      if (arrTotal.length > 0) {
          const reducer = (accumulator, curr) => accumulator + curr;
          setIncome(arrTotal.reduce(reducer))
      }

      costes.forEach(t => {
          arrCost.push(Number(t.expenses.$numberDecimal)); 
      });

      if (arrCost.length > 0) {
          const reducer = (accumulator, curr) => accumulator + curr;
          setExpenses(arrCost.reduce(reducer))
      }

      utilidades.forEach(t => { 
        arrUtility.push(Number(t.utility.$numberDecimal));    
      });

      if (arrUtility.length > 0) {
          const reducer = (accumulator, curr) => accumulator + curr;
          setUtility(arrUtility.reduce(reducer))
      }
      
      
  // eslint-disable-next-line
  }, [venta])

  // console.log('Ingresos ' + income);
  // console.log('Gastos ' + expenses);
  // console.log('Utilidad ' + utility);

  useEffect(() => {

    dispatch(startLoadingProducto());
    dispatch(startLoadingVenta());
    dispatch(startLoading());

  }, [dispatch])

  const handleView = (e) => {
    // console.log(e.target.id);
    let id = e.target.id;
    let ventaSelect = venta.filter(v => v.id === id).map(v => (v));

    console.log(ventaSelect);
    dispatch(setActiveVenta(ventaSelect));
    
    localStorage.setItem('activeVenta', JSON.stringify(ventaSelect));

    // console.log(sucursalSelect[0]);
    navigate('/verventa');
  }

  const handleDelete = (e) => {

    // console.log(e.target.id);
    let id = e.target.id;    
    let ventaSelect = venta.filter(v => v.id === id).map(v => (v));

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn-ok ms-3',
          cancelButton: 'btn-cancel'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás reverir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡BORRALO!',
        cancelButtonText: 'CANCELAR',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {      
            console.log(ventaSelect[0]);
            dispatch(startDeletedVenta(ventaSelect[0]));
            swalWithBootstrapButtons.fire(
                'Borrado!',
                `El registro de venta fue borrado.`,
                'success'
            )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            `El registro de venta esta seguro :)`,
            'error'
          )
        }
      })
  }

  
  return (
    <div className='container-sucursales'>
        <div className='title-separator'>
            Dashboard
        </div>
        <Container className='card-shadow div-card pt-3'>
            
            <Row>
              <Col xs={12} md={4} className='mt-2'>

                <div>
                  <div className=" card-shadow wallets-card mb-3" style={{"maxWidth": "540px"}}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <i 
                          className='fas fa-cash-register center-element mt-4 ms-1 wallets-text' 
                          style={{"fontSize": "4.5rem"}}
                        ></i>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">VENTAS <span style={{"fontWeight": "bold"}} className='wallets-text'>{venta.length}</span></h5>
                          <p 
                            className="card-text wallets-text"
                            style={{"fontSize": "1.5rem", "fontWeight": "bold"}}
                          >$ {income%1 === 0 ? income + '.00' : income}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              Ultima venta {moment(ventaDate.pop()).startOf('hour').fromNow()}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Col>
              <Col xs={12} md={4} className='mt-2'>

                <div>
                  <div className=" card-shadow wallets-card mb-3" style={{"maxWidth": "540px"}}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <i 
                          className='fas fa-coins center-element wallets-text mt-4 ms-1' 
                          style={{"fontSize": "4.5rem"}}
                        ></i>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">GASTOS</h5>
                          <p 
                            className="card-text wallets-text"
                            style={{"fontSize": "1.5rem", "fontWeight": "bold"}}
                          >$ {expenses%1 === 0 ? expenses + '.00' : expenses}</p>
                          <p className="card-text"><small className="text-muted">Gastos realizados en materia prima</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Col>
              <Col xs={12} md={4} className='mt-2'>

                <div>
                  <div className=" card-shadow wallets-card mb-3" style={{"maxWidth": "540px"}}>
                    <div className="row g-0">
                      <div className="col-md-4"> 
                        <i 
                          className='fas fa-hand-holding-usd center-element mt-4 ms-1 wallets-text' 
                          style={{"fontSize": "4.5rem"}}
                        ></i>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">GANANCIAS </h5>
                          <p 
                            className="card-text wallets-text"
                            style={{"fontSize": "1.5rem", "fontWeight": "bold"}}
                          >$ {utility%1 === 0 ? utility + '.00' : utility}</p>
                          <p className="card-text"><small className="text-muted">La utilidad de tu negocio</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Col>
            </Row>
            <Row>
                <Col xs={6} md={0}></Col>
                <Col xs={12} md={12} className='table-responsive'>
                <div className=" card-shadow wallets-card mb-3">
                  <h3 className="card-title center-element">VENTAS RECIENTES</h3>
                    <table className="table table-borderless div-card">
                        <thead className='table-light'>
                            <tr>
                              <th scope="col">
                                  {/* Componente Checkbox */}
                                  <Checkbox
                                      type="checkbox"
                                      name="selectAll"
                                      id="selectAll"
                                      // handleClick={handleSelectAll}
                                      // isChecked={isCheckAll}
                                  />
                              </th>
                              {/* <th scope="col">Id</th> */}
                              <th scope="col">Fecha</th>
                              <th scope="col">Total</th>
                              <th scope="col">Gastos</th>
                              <th scope="col">Ganancia</th>
                              <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                      
                        <tbody>
                          {/* // TODO: invertir el orden del arreglo*/}
                        {venta.map(v => ( 
                                <tr key={v.id}>
                                    <th scope="row">
                                        {/* Componente Checkbox */}
                                        <Checkbox
                                            key={v.id}
                                            type="checkbox"
                                            name={v.name}
                                            id={v.id}
                                            // handleClick={handleClick}
                                            // isChecked={isCheck.includes(v._id)}
                                        />
                                    </th>
                                    {/* <td>
                                        {v._id}
                                    </td> */}
                                    <td>{moment(v.dateSell).format("LL")}</td>
                                    <td>
                                      $ {v.total.$numberDecimal%1 === 0 ? v.total.$numberDecimal + '.00' : v.total.$numberDecimal}
                                    </td>
                                    <td>
                                      $ {v.expenses.$numberDecimal % 1 === 0 ? v.expenses.$numberDecimal + '.00' : v.expenses.$numberDecimal}
                                    </td>
                                    <td>
                                      $ {v.utility.$numberDecimal % 1 === 0 ? v.utility.$numberDecimal + '.00' : v.utility.$numberDecimal}
                                    </td>
                                    <td>
                                        <i 
                                            className="fas fa-eye btn-actions" 
                                            id={v.id} 
                                            onClick={handleView}
                                        ></i> 
                                        <i 
                                            className="fas fa-trash ms-1 btn-actions" 
                                            id={v.id} 
                                            onClick={handleDelete}
                                        ></i>
                                    </td>                                
                                </tr>
                                // Recorre el numero de elementos que indiquemos
                                )).reverse().slice(initialPag, lastPag)
                        }
                        </tbody>
                    </table>
                  </div>
                </Col>
                <Col xs={6} md={0}></Col>
            </Row>
        </Container>
    </div>
  )
}
