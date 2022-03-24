import { types } from '../types/types';

const initialState = {
    venta: [],
    activeVenta: null
}

export const ventasReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.ventaAddNewVenta:
            return {
                ...state,
                producto: [
                    ...state.producto,
                    action.payload
                ]
            }
        // case types.productoSetActive:
        //     return {
        //         ...state,
        //         activeProducto: action.payload
        //     }

        // case types.productoClearActiveProducto:
        //     return {
        //         ...state,
        //         activeProducto: null
        //     }
        
        // case types.productoUpdatedProducto:
        //     return {
        //         ...state,
        //         producto: state.producto.map(
        //             p => (p.id === action.payload.id) ? action.payload : p
        //         )
        //     }
        
        // case types.productoDeleteProducto:
        // return {
        //     ...state,
        //     producto: state.producto.filter(
        //         s => (s.id !== action.payload.id)
        //     ),
        //     activeProducto: null
        // }
    
        // case types.productoLoadedProducto:
        //     return {
        //         ...state,
        //         producto: [...action.payload]
        //     }
        default:
            return state;
    }
}