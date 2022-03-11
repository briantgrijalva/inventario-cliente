import { types } from '../types/types';

const initialState = {
    producto: []
}

export const productosReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.createNewProducto:
            return {
                ...state,
                producto: [action.payload, ...state.producto],
            }
    
        default:
            return state;
    }
}