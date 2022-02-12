import { types } from "../types/types"


export const viewSidebar = (viewComfirm) => {
    return {
        type: types.viewSidebar,
        payload: viewComfirm
    }
};