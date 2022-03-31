import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';

export const startCreateNewVenta = (venta) => {

    return async (dispatch) => {
        
        try {
            // await fileUpload(file);
            const resp = await fetchConToken('ventas', venta, 'POST');
            const body = await resp.json();
            // const fileUrl = await fileUpload(file);

            // console.log(body.producto.photo);

            if (body.ok) {
                // producto.photo = fileUrl;
                venta.id = body.venta.id;
                dispatch(AddNewVenta(venta));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Venta creada',
                    text: `Venta creada correctamente`,
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

const AddNewVenta = (venta) => ({
    type: types.ventaAddNewVenta,
    payload: venta
});

export const startLoadingVenta = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('ventas');
            const body = await resp.json();
            const venta = body.ventas;

            dispatch(loadedProducto(venta));
        } catch (error) {
            console.log(error);
        }

    }
}

const loadedProducto = (venta) => ({
    type: types.ventaLoadedVenta,
    payload: venta
});

export const setActiveVenta = (venta) => ({
    type: types.ventaSetActive,
    payload: venta
});

export const clearActiveVenta = () => ({
    type: types.ventaClearActiveVenta
});

export const startUpdatedVenta = (venta) => {
    return async(dispatch) => {
        
        try {

            // console.log(sucursal);
            const resp = await fetchConToken(`ventas/${venta.id}`, venta, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(updatedVenta(venta));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sucursal modificada',
                    text: `Reporte de venta modificado correctamente`,
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

const updatedVenta = (venta) => ({
    type: types.ventaUpdatedVenta,
    payload: venta
});

export const startDeletedVenta = (venta) => {
    return async(dispatch) => {
        
        try {

            // console.log(sucursal);
            const resp = await fetchConToken(`ventas/${venta.id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(deletedVenta(venta));
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

const deletedVenta = (venta) => ({
    type: types.ventaDeleteVenta,
    payload: venta
});