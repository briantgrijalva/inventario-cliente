import { types } from '../types/types';


export const addNewProducto = (id, img, name, codigo, category, brand, price, unity, quantity) => ({

    // TODO: guardar en base de datos

    type: types.createNewProducto,
    payload: {
        id,
        img,
        name,
        codigo,
        category,
        brand,
        price,
        unity,
        quantity
    }
})
