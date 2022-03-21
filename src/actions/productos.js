import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';


export const startCreateNewProducto = (producto, file) => {

    return async (dispatch) => {

        
        
        try {
            await fileUpload(file);
            const resp = await fetchConToken('productos', producto, 'POST');
            const body = await resp.json();
            // const fileUrl = await fileUpload(file);

            // console.log(body.producto.photo);

            if (body.ok && body.producto.photo !== '') {
                // producto.photo = fileUrl;
                producto.id = body.producto.id;
                dispatch(addNewProducto(producto));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto creado',
                    text: `Producto ${producto.name} creado correctamente`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
           
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: error,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

const addNewProducto = (producto) => ({
    type: types.productoAddNewProducto,
    payload: producto
});


export const startLoadingProducto = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('productos');
            const body = await resp.json();
            const producto = body.productos;

            dispatch(loadedProducto(producto));
        } catch (error) {
            console.log(error);
        }

    }
}

export const fileUpload = async (file) => {

    const token = localStorage.getItem('token') || '';

    const cloudUrl = `${process.env.REACT_APP_API_URL}/productos/upload`;

    const formData = new FormData();
    // formData.append('upload_preset','react-journal');
    formData.append('file', file);

    // try {
        await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'x-token': token
            }
        });
        
        
        // fetchSinToken('productos/upload', formData, 'POST');

        // if (resp.ok) {
        //     const cloudResp =  resp.json();
        //     return cloudResp.secure_url;
        // } else {
        //     throw  resp.json();
        // }
    // } catch (error) {
    //     throw error;
    // }

    // return url de la imagen
}



const loadedProducto = (producto) => ({
    type: types.productoLoadedProducto,
    payload: producto
});

export const setActiveProducto = (producto) => ({
    type: types.productoSetActive,
    payload: producto
});

export const clearActiveProducto = () => ({
    type: types.productoClearActiveProducto
});

export const startUpdatedProducto= (producto) => {
    return async(dispatch) => {
        
        try {

            // console.log(sucursal);
            const resp = await fetchConToken(`productos/${producto.id}`, producto, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(updatedProducto(producto));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sucursal modificada',
                    text: `Sucursal ${producto.name} modificada correctamente`,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: body.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: error,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

const updatedProducto = (producto) => ({
    type: types.productoUpdatedProducto,
    payload: producto
});

export const startDeleted = (producto) => {
    return async(dispatch) => {
        
        try {

            // console.log(sucursal);
            const resp = await fetchConToken(`productos/${producto.id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(deletedProducto(producto));
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: body.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: error,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

const deletedProducto = (producto) => ({
    type: types.productoDeleteProducto,
    payload: producto
});