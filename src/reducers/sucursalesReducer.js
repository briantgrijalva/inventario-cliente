import { types } from '../types/types';

const initialState = {
    sucursal: []
}

export const sucursalesReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.createNewSucursal:
            return {
                ...state,
                sucursal: [action.payload, ...state.sucursal],
            }
    
        default:
            return state;
    }
}