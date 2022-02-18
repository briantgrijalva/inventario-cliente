import { types } from '../types/types';

const initialState = {
    usuarios: [],
    clientes: [],
    proveedores: [],
}

export const personasReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.createNewUsuario:
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload],
            }
    
        case types.createNewProveedor:
            return {
                ...state,
                proveedores: [action.payload, ...state.proveedores],
            }
    
        case types.createNewCliente:
            return {
                ...state,
                clientes: [action.payload, ...state.clientes],
            }

        default:
            return state;
    }
}