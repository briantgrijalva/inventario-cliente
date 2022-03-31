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
                venta: [
                    ...state.venta,
                    action.payload
                ]
            }
        case types.ventaSetActive:
            return {
                ...state,
                activeVenta: action.payload
            }

        case types.ventaClearActiveVenta:
            return {
                ...state,
                activeVenta: null
            }
        
        case types.ventaUpdatedVenta:
            return {
                ...state,
                venta: state.venta.map(
                    v => (v.id === action.payload.id) ? action.payload : v
                )
            }
        
        case types.ventaDeleteVenta:
        return {
            ...state,
            venta: state.venta.filter(
                v => (v.id !== action.payload.id)
            ),
            activeVenta: null
        }
    
        case types.ventaLoadedVenta:
            return {
                ...state,
                venta: [...action.payload]
            }
        default:
            return state;
    }
}