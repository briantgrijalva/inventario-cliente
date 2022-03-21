import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setActiveProducto, startDeleted, startLoadingProducto } from '../../actions/productos';
import Checkbox from '../../helpers/Checkbox';
// import Image from '../../helpers/Image';
import { useForm } from '../../hooks/useForm';

export const ProductosScreen = () => {

    // let baseUrl = process.env.REACT_APP_API_URL;

    const {producto} = useSelector(state => state.productos);

    const dispatch = useDispatch();

    let navigate = useNavigate();
    
    const [btnPrevDisable, setBtnPrevDisable] = useState(false);
    const [btnNextDisable, setBtnNextDisable] = useState(true);
    const [counter, setCounter] = useState(0);
    // eslint-disable-next-line
    const [valueSelect, setValueSelect] = useState(0);
    const [initialPag, setInitialPag] = useState(0);
    const [lastPag, setLastPag] = useState(parseInt(localStorage.getItem("paginacion")));
    const [check, setCheck] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    let totalItem = producto.length / parseInt(localStorage.getItem("paginacion"));

    const [formValues, handleInputChange, reset] = useForm({
        searchText: '',
    });

    const {searchText} = formValues;


    useEffect(() => {
        setList(producto);
    }, [list, producto]);

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);

        if (searchText === '') {
            if (localStorage.getItem("paginacion") === 'all') {
                setIsCheck(list.map((li) => li.id));
                if (isCheckAll) {
                    setIsCheck([]);
                }
            } else {
                setIsCheck(list.map((li) => li.id).slice(initialPag, lastPag));
                if (isCheckAll) {
                    setIsCheck([]);
                }
            }
        } else {
            // setIsCheck(list.map((li) => li.id));
            // setIsCheck(list.map((li) => li.id).filter(s => s.name.toLowerCase().includes(searchText.toLowerCase())));
            setIsCheck(list.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase())).map(s => s.id));
            // sucursal.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase())).map(scsal =>
            if (isCheckAll) {
                setIsCheck([]);
            }
        }
        
    };

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    // let sucursalMap = sucursal.filter(s => (s.id).includes(isCheck)).map(s => s);
    // console.log(isCheck);
    // console.log(sucursalMap);


    // console.log(totalItem);
    // console.log(counter);
    // console.log(btnNextDisable);
    // console.log(btnPrevDisable);


    useEffect(() => {

      dispatch(startLoadingProducto());

    }, [dispatch])

    
    useEffect(() => {
        if (isCheck.length > 0) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    }, [isCheck, setCheck])
    

    useEffect(() => {
        if (counter === 0) {
            setBtnPrevDisable(true);
            // console.log('first');
        } else if (counter !== 0) {
            setBtnPrevDisable(false);
        }
    }, [counter])

    useEffect(() => {
        if (counter === Math.ceil(totalItem - 1)) {
            setBtnNextDisable(true);
        } else if (counter !== (totalItem - 1)){
            setBtnNextDisable(false);
        }
        if (localStorage.getItem("paginacion") === 'all') {
            setBtnNextDisable(true);
            setBtnPrevDisable(true);
        } 
        if (totalItem === 0) {
            setBtnNextDisable(true);
            setBtnPrevDisable(true);
        }
    }, [counter, totalItem])

    const handleNext = () => {
        setInitialPag(initialPag + parseInt(localStorage.getItem("paginacion")));
        setLastPag(lastPag + parseInt(localStorage.getItem("paginacion")));

        setCounter(counter + 1);
        // reset elements checked
        setIsCheck([]);
    }

    const handlePrev = () => {
        setInitialPag(initialPag - parseInt(localStorage.getItem("paginacion")));
        setLastPag(lastPag - parseInt(localStorage.getItem("paginacion")));

        setCounter(counter - 1);
        // reset elements checked
        setIsCheck([]);
    }

    const onChangeSelect = (e) => {
        setCounter(0);
        // console.log(counter);
        setValueSelect(e.target.value);
        localStorage.setItem("paginacion", e.target.value);
        setInitialPag(0);
        setLastPag(parseInt(localStorage.getItem("paginacion")));
        setIsCheck([]);
    }

    const handleView = (e) => {
        // console.log(e.target.id);
        let id = e.target.id;
        let productoSelect = producto.filter(s => s.id === id).map(s => (s));
        dispatch(setActiveProducto(productoSelect));
        
        localStorage.setItem('activeProducto', JSON.stringify(productoSelect));

        // console.log(sucursalSelect[0]);
        navigate('/verProducto');
    }

    const handleDelete = (e) => {

        // console.log(e.target.id);
        let id = e.target.id;    
        let productoSelect = producto.filter(s => s.id === id).map(s => (s));

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
                // console.log(sucursalSelect[0]);
                dispatch(startDeleted(productoSelect[0]));
                swalWithBootstrapButtons.fire(
                    'Borrado!',
                    `La Sucursal ${productoSelect[0].name} fue borrada.`,
                    'success'
                )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                `La Sucursal ${productoSelect[0].name} esta segura :)`,
                'error'
              )
            }
          })
    }

    const handleDeleteCheck = () => {

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
                let productoMap
                for (let i = 0; i < isCheck.length; i++) {
                    productoMap = list.filter(s => s.id === isCheck[i]).map(s => s);
                    // console.log(sucursalMap);
                    dispatch(startDeleted(productoMap[0]));
                }
                setIsCheck([]);
                setCheck(false);
                reset();
                // console.log(sucursalMap);
                swalWithBootstrapButtons.fire(
                    'Borrado!',
                    `La Sucursales seleccionadas fueron borradas.`,
                    'success'
                )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                `Las sucursales estan seguras :)`,
                'error'
              )
            }
          })
    }
    
  return (
     <div className='container-sucursales'>
        <div className='title-separator'>
            Productos
        </div>
        <Container className='card-shadow div-card pt-3'>
            
            <Row>
                <Col xs={6} md={6}>
                    
                    <div className="input-group">
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
                </Col>
                <Col xs={6} md={6}>

                    <button
                        className='btn-pdf me-3' 
                    >
                        <i className="fas fa-file-pdf"></i> &nbsp; PDF
                    </button>
                    <button
                        className='btn-add me-3'
                        onClick={() =>  navigate('/nuevoProducto')}
                    >
                        <i className="fas fa-plus-circle"></i> &nbsp; AGREGAR
                    </button>

                    {check 
                    ?<button
                        className="btn-cancel me-3 btn-small"
                        onClick={handleDeleteCheck}
                    >
                        <i className="fas fa-trash"></i> &nbsp; BORRAR
                    </button>
                    : null }
                    
                </Col>
            </Row>

            <Row>
                <Col xs={6} md={0}></Col>
                <Col xs={12} md={12} className='table-responsive'>
                    <table className="table table-borderless div-card">
                        <thead className='table-light'>
                            <tr>
                            <th scope="col">
                                {/* Componente Checkbox */}
                                <Checkbox
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    handleClick={handleSelectAll}
                                    isChecked={isCheckAll}
                                />
                            </th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Código</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Unidad</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                      
                        <tbody>
                        {searchText === '' 
                        ?
                                   
                            localStorage.getItem("paginacion") === 'all' 
                            ? producto.map(scsal => ( 
                                
                                <tr key={scsal.id}>
                                    <th scope="row">
                                        {/* Componente Checkbox */}
                                        <Checkbox
                                            key={scsal.id}
                                            type="checkbox"
                                            name={scsal.name}
                                            id={scsal.id}
                                            handleClick={handleClick}
                                            isChecked={isCheck.includes(scsal.id)}
                                        />
                                    </th>
                                    <td>
                                        <img 
                                            src={`${process.env.REACT_APP_API_URL}/upload/${scsal.photo}`}
                                            style={{width: "4rem"}}
                                            alt='...'
                                        />
                                    </td>
                                    <td>{scsal.name}</td>
                                    <td>{scsal.barCode}</td>
                                    <td>{scsal.category}</td>
                                    <td>{scsal.brand}</td>
                                    <td>{scsal.price.$numberDecimal}</td>
                                    <td>{scsal.unitProduct}</td>
                                    <td>{0 /* condicion si existe cantidad en ajuste de stock ponerlo si no sera CERO*/}</td>
                                    <td><i
                                            className="fas fa-eye" 
                                            id={scsal.id} 
                                            onClick={handleView} 
                                        ></i> 
                                        <i 
                                            className="fas fa-trash ms-1" 
                                            id={scsal.id} 
                                            onClick={handleDelete}
                                        ></i>
                                    </td>                                
                                </tr>
                                ))
                            : producto.map(scsal => ( 
                                // TODO: generar los IDs
                                <tr key={scsal.id}>
                                    <th scope="row">
                                        {/* Componente Checkbox */}
                                        <Checkbox
                                            key={scsal.id}
                                            type="checkbox"
                                            name={scsal.name}
                                            id={scsal.id}
                                            handleClick={handleClick}
                                            isChecked={isCheck.includes(scsal.id)}
                                        />
                                    </th>
                                    <td>
                                        <img 
                                            src={`${process.env.REACT_APP_API_URL}/upload/${scsal.photo}`}
                                            style={{width: "4rem"}}
                                            alt='...'
                                        />
                                    </td>
                                    <td>{scsal.name}</td>
                                    <td>{scsal.barCode}</td>
                                    <td>{scsal.category}</td>
                                    <td>{scsal.brand}</td>
                                    <td>{scsal.price.$numberDecimal}</td>
                                    <td>{scsal.unitProduct}</td>
                                    <td>{0 /* condicion si existe cantidad en ajuste de stock ponerlo si no sera CERO*/}</td>
                                    <td>
                                        <i 
                                            className="fas fa-eye btn-actions" 
                                            id={scsal.id} 
                                            onClick={handleView}
                                        ></i> 
                                        <i 
                                            className="fas fa-trash ms-1 btn-actions" 
                                            id={scsal.id} 
                                            onClick={handleDelete}
                                        ></i>
                                    </td>                                
                                </tr>
                                // Recorre el numero de elementos que indiquemos
                                )).slice(initialPag, lastPag)
                        : producto.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase())).map(scsal => (
                            <tr key={scsal.id}>
                                <th scope="row">
                                    {/* Componente Checkbox */}
                                    <Checkbox
                                        key={scsal.id}
                                        type="checkbox"
                                        name={scsal.name}
                                        id={scsal.id}
                                        handleClick={handleClick}
                                        isChecked={isCheck.includes(scsal.id)}
                                    />
                                </th>
                                    <td>
                                        <img 
                                            src={`${process.env.REACT_APP_API_URL}/upload/${scsal.photo}`}
                                            style={{width: "4rem"}}
                                            alt='...'
                                        />
                                    </td>
                                    <td>{scsal.name}</td>
                                    <td>{scsal.barCode}</td>
                                    <td>{scsal.category}</td>
                                    <td>{scsal.brand}</td>
                                    <td>{scsal.price.$numberDecimal}</td>
                                    <td>{scsal.unitProduct}</td>
                                    <td>{0 /* condicion si existe cantidad en ajuste de stock ponerlo si no sera CERO*/}</td>
                                    <td>
                                        <i 
                                            className="fas fa-eye btn-actions" 
                                            id={scsal.id} 
                                            onClick={handleView}
                                        ></i> 
                                        <i 
                                            className="fas fa-trash ms-1 btn-actions" 
                                            id={scsal.id} 
                                            onClick={handleDelete}
                                        ></i>
                                    </td>                                
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
                        {}
                        
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
                <Col xs={2} md={6}>
                    <div >
                        {localStorage.getItem("paginacion") === 'all' ? 'TODO' : `${counter + 1} - ${Math.ceil(totalItem)}`}
                    </div>
                    
                </Col>
                
                <Col xs={7} md={4}>
                    <button disabled={btnNextDisable} type='button' className='btn-paginacion' onClick={handleNext}>next <i className="fas fa-caret-right"></i></button>
                    <button disabled={btnPrevDisable} type='button' className='btn-paginacion' onClick={handlePrev}><i className="fas fa-caret-left"></i> prev</button>
                </Col>
                
            </Row>
            
        </Container>
    </div>
  )     
}
