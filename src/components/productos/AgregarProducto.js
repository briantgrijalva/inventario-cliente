import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fileUpload, startCreateNewProducto } from '../../actions/productos';
import Image from '../../helpers/Image';
import { useForm } from '../../hooks/useForm';


export const AgregarProducto = () => {

    const [nameImg, setNameImg] = useState('');

    const [file, setFile] = useState(null);

    const nameImage = 'node-js.png';

    const dispatch = useDispatch();

    const initialForm = {
        name: '',
        category: '',
        barsymbol: '',
        price: '',
        unitSell: '',
        alertStock: '',
        barCode: '',
        brand: '',
        cost: '',
        unitProduct: '',
        unitPurchase: '',
        tax: '',
        photo: '',
        comments: ''
    }
    
    const [values, handleInputChange, reset] = useForm(initialForm);

    const {name, category, barsymbol, price, unitSell, alertStock, barCode, brand, cost, unitProduct, unitPurchase, tax, comments} = values;

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (name === '' || category === '' || price === '' || cost === '' || unitProduct === '' || unitSell === '' || unitPurchase === '') {
        //     Swal.fire({
        //         position: 'center',
        //         icon: 'warning',
        //         title: 'Todos los campos son necesarios',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        // } else {

            
            // const data = new FormData();
            // data.append("name", name);
            // data.append("file", file);
        
            // Axios.post(`productos`, data)
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err));
            // dispatch(fileUpload(file));

            console.log(file);
            // fileUpload(file);
            if (file) {
                dispatch(startCreateNewProducto(values, file));
                // Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: 'Sucursal creada correctamente',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
            }

            
    
            

            // navigate('/productos');
        // }
        
        
    }

    const handleCancel = () => {
        reset();
        navigate('/productos');
    }


    
  
  return (
    <div className='container-sucursales'>
      <div className='title-separator'>
          Agregar nuevo producto
      </div>
      <Container className='card-shadow div-card pt-3'>
      <form onSubmit={handleSubmit}>
          <Row>
              
                  <Col xs={12} md={4}>
                      
                      <label htmlFor="name" className="form-label mt-4">Nombre del producto</label>
                      <div className="input-group mt-0">
                          <input
                              type='text'
                              name='name'
                              value={name}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Nombre del producto"
                          />
                          
                      </div>
                          <label htmlFor="category" className="form-label mt-4">Categoría</label>
                          {/* //TODO: implementar select */}
                      <div className="input-group mt-0">
                          <input
                              type='text' 
                              name='category'
                              value={category}
                              onChange={handleInputChange} 
                              className="form-control" 
                              placeholder="Categoría"
                          />
                          
                      </div>
                          <label htmlFor="barsymbol" className="form-label mt-4">Simbología de código de barras(discutir al respecto)</label>
                          {/* //TODO: implementar select */}
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='barsymbol' 
                              value={barsymbol}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Simbología de código de barras(discutir al respecto)"
                          />
                      </div>
                          <label htmlFor="price" className="form-label mt-4">Precio del producto(precio de venta)</label> 
                      <div className="input-group mt-0">
                          <input 
                              type='number' 
                              name='price' 
                              value={price}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Precio del producto(precio de venta)"
                          />
                      </div>
                      <label htmlFor="unitSell" className="form-label mt-4">Unidad de venta</label> 
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='unitSell' 
                              value={unitSell}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Unidad de venta"
                          />
                      </div>
                      <label htmlFor="alertStock" className="form-label mt-4">Alerta de stock</label> 
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='alertStock' 
                              value={alertStock}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Unidad de venta"
                          />
                      </div>
                  </Col>
                  <Col xs={12} md={4}>
                      
                      <label htmlFor="barCode" className="form-label mt-4">Código de producto(aun por discutir)</label>
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='barCode'
                              value={barCode}
                              onChange={handleInputChange} 
                              className="form-control" 
                              placeholder="Código de producto(código de barras escaneado, aun por discutir)"
                          />
                          
                      </div>
                      <label htmlFor="brand" className="form-label mt-4">Marca</label>
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='brand' 
                              value={brand}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Marca"
                          />
                          
                      </div>
                      <label htmlFor="cost" className="form-label mt-4">Costo del producto(precio de compra)</label>
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='cost' 
                              value={cost}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Costo del producto(precio de compra)"
                          />
                      </div>
                      <label htmlFor="unitProduct" className="form-label mt-4">Unidad del producto</label>
                      {/* //TODO: implementar select */}
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='unitProduct' 
                              value={unitProduct}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Unidad del producto"
                          />
                      </div>
                      <label htmlFor="unitPurchase" className="form-label mt-4">Unidad de compra(validar campos relacionados)</label>
                      {/* //TODO: implementar select */}
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='unitPurchase' 
                              value={unitPurchase}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Unidad de compra(todos los campos relacionados a la unidad deben ser validados)"
                          />
                      </div>
                      <label htmlFor="tax" className="form-label mt-4">Impuesto</label>
                      <div className="input-group mt-0">
                          <input 
                              type='text' 
                              name='tax' 
                              value={tax}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Impuesto"
                          />
                      </div>
                    
                  </Col>
                  <Col xs={12} md={4}>
                  <div className="card" style={{width: "18rem"}}>
                    <Image name={nameImg} />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">Some quick example </p>
                      {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                      <div className="mb-3">
                        <label htmlFor="photo" className="form-label">Selecciona una imagen</label>
                        {/* <input 
                            className="form-control btn-primary" 
                            type="file" 
                            id="photo" 
                            name='photo' 
                            // value={photo}
                            onChange={e => setFile(e.target.files[0])}

                        /> */}
                        <input
                            className="form-control btn-primary" 
                            type="file"
                            id="file"
                            name='file' 
                            accept=".jpg"
                            onChange={event => {
                                const file = event.target.files[0];
                                setFile(file);
                            }}
                        />
          

                        {/* <input
                            id='fileSelector'
                            type='file'
                            name='file'
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        /> */}
                      </div>
                    </div>
                  </div>
                  </Col>
              </Row>
              <Row className='mb-4'>
                <Col xs={12} md={12}>
                <label htmlFor="comments" className="form-label mt-4">Comentarios</label> 
                      <div className="input-group mt-0">
                          <textarea 
                              type='textarea' 
                              name='comments' 
                              value={comments}
                              onChange={handleInputChange}
                              className="form-control" 
                              placeholder="Precio del producto(precio de venta)"
                          ></textarea>
                      </div>

                      <button variant="primary" type='submit' className="btn-save mb-4 mt-3">
                          GUARDAR
                      </button>

                      <button
                          variant="primary" 
                          type='button'
                          className="btn-cancel mb-4 mt-3 me-4"
                          onClick={handleCancel}
                      >
                          CANCELAR
                      </button>
                      
                </Col>
              </Row>
          </form>

      </Container>
  </div>
  )
}
