import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startCreateNewSucursal = (sucursal) => {
    return async (dispatch) => {
        
        try {
            const resp = await fetchConToken('sucursales', sucursal, 'POST');
            const body = await resp.json();

            if (body.ok) {

                sucursal.id = body.sucursal.id;
                dispatch(addNewSucursal(sucursal));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sucursal creada',
                    text: `Sucursal ${sucursal.name} creada correctamente`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            // TODO: SweetAlert
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

const addNewSucursal = (sucursal) => ({
    type: types.sucursalAddNewSucursal,
    payload: sucursal
});

// * servira para modificar una sucursal
export const setActiveSucursal = (sucursal) => ({
    type: types.sucursalSetActive,
    payload: sucursal
});

export const clearActiveSucursal = () => ({
    type: types.sucursalClearActiveSucursal
});

export const startUpdatedSucursal = (sucursal) => {
    return async(dispatch) => {
        
        try {

            // console.log(sucursal);
            const resp = await fetchConToken(`sucursales/${sucursal.id}`, sucursal, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(updatedSucursal(sucursal));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sucursal modificada',
                    text: `Sucursal ${sucursal.name} modificada correctamente`,
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

const updatedSucursal = (sucursal) => ({
    type: types.sucursalUpdatedSucursal,
    payload: sucursal
});

export const startDeleted = (sucursal) => {
    return async(dispatch) => {
        
        try {

            // console.log(sucursal);
            const resp = await fetchConToken(`sucursales/${sucursal.id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(deletedSucursal(sucursal));
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

const deletedSucursal = (sucursal) => ({
    type: types.sucursalDeletedSucursal,
    payload: sucursal
});

export const startLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('sucursales');
            const body = await resp.json();
            const sucursal = body.sucursales;

            dispatch(loadedSucursal(sucursal));
        } catch (error) {
            console.log(error);
        }

    }
}

const loadedSucursal = (sucursal) => ({
    type: types.sucursalLoadedSucursal,
    payload: sucursal
});