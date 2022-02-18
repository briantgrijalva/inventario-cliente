import { types } from '../types/types';


export const addNewUsuario = (nombres, apellidos, tel, email, tipoCuenta, pass, pass2) => ({

    // TODO: guardar en base de datos

    type: types.createNewUsuario,
    payload: {
        nombres, apellidos, tel, email, tipoCuenta, pass, pass2
    }
})

export const addNewProveedor = (name, email, tel, pais, ciudad, direccion) => ({

    // TODO: guardar en base de datos

    type: types.createNewProveedor,
    payload: {
        name, 
        email, 
        tel, 
        pais, 
        ciudad, 
        direccion
    }
})

export const addNewCliente = (name, email, tel, pais, ciudad, direccion) => ({

    // TODO: guardar en base de datos

    type: types.createNewCliente,
    payload: {
        name, 
        email, 
        tel, 
        pais, 
        ciudad, 
        direccion
    }
})