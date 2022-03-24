import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';

export const startCreateNewVenta = (venta) => {

    return async (dispatch) => {
        
        try {
            await fileUpload(file);
            const resp = await fetchConToken('ventas', venta, 'POST');
            const body = await resp.json();
            // const fileUrl = await fileUpload(file);

            // console.log(body.producto.photo);

            if (body.ok) {
                // producto.photo = fileUrl;
                venta.id = body.venta.id;
                dispatch(AddNewVenta(venta));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Venta creada',
                    text: `Venta ${venta.name} creada correctamente`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
           
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: error,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

const AddNewVenta = (venta) => ({
    type: types.ventaAddNewVenta,
    payload: venta
});