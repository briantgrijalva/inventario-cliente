import { types } from "../types/types";


export const uiReducer = (state = {}, action) => {

    switch (action.type) {
        
        case types.viewSidebar:
            
            return {
                view: action.payload.viewComfirm
            }

        default:
            return state;
    }


}