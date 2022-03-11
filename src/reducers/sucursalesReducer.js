import { types } from '../types/types';

// {
//     id: '4444444444',
//     name: 'Sucursal pro', 
//     email: 'sucursal@sucursal.com', 
//     tel: '777777', 
//     pais: 'El Salvador', 
//     ciudad: 'Atiquizaya', 
//     direccion: 'direccion de la sucursal'
// }

const initialState = {
    sucursal: [],
    activeSucursal: null
}

export const sucursalesReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.sucursalAddNewSucursal:
            return {
                ...state,
                sucursal: [
                    ...state.sucursal,
                    action.payload
                ]
            }

        case types.sucursalSetActive:
            return {
                ...state,
                activeSucursal: action.payload
            }

        case types.sucursalClearActiveSucursal:
            return {
                ...state,
                activeSucursal: null
            }
        
        case types.sucursalUpdatedSucursal:
            return {
                ...state,
                sucursal: state.sucursal.map(
                    s => (s.id === action.payload.id) ? action.payload : s 
                )
            }

        case types.sucursalDeletedSucursal:
            return {
                ...state,
                sucursal: state.sucursal.filter(
                    s => (s.id !== action.payload.id)
                ),
                activeSucursal: null
            }

        case types.sucursalLoadedSucursal:
            return {
                ...state,
                sucursal: [...action.payload]
            }
            
        //   const myDeletedArray = draft.list;
        //   const objDeletedIndex = myDeletedArray.filter(obj => 
        //     !action.payload.find(itemToDelete=>itemToDelete._id===obj.id)
        //   );
        //   draft.list = objDeletedIndex; //update data
    
        default:
            return state;
    }
}