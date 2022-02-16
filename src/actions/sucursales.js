import { types } from '../types/types';


export const addNewSucursal = (name, email, tel, pais, ciudad, direccion) => ({

    // TODO: guardar en base de datos

    type: types.createNewSucursal,
    payload: {
        name, 
        email, 
        tel, 
        pais, 
        ciudad, 
        direccion
    }
})

