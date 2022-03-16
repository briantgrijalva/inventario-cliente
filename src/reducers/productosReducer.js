import { types } from '../types/types';

const initialState = {
    producto: [],
    activeProducto: null
}

export const productosReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.productoAddNewProducto:
            return {
                ...state,
                producto: [
                    ...state.producto,
                    action.payload
                ]
            }
        
        case types.productoDeleteProducto:
        return {
            ...state,
            producto: state.producto.filter(
                s => (s.id !== action.payload.id)
            ),
            activeProducto: null
        }
    
        case types.productoLoadedProducto:
            return {
                ...state,
                producto: [...action.payload]
            }
        default:
            return state;
    }
}