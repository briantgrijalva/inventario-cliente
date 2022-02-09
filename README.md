# App de control de inventario

El programa esta dedicado a empresas que necesiten administrar sus transacciones y el inventario de sus productos, y ver de manera grafica el flujo de efectivo de su negocio.

---
## Tecnologías a usar
- **React js** para el frontend.
- **Node js, express** para el backend.
- **Mongo DB** como base de datos.

---

## Pantallas a implementar
- **Dashboard** - ***principal***
  - En esta pantalla se mostrará el grafico con los procentajes de ventas a nivel de categoría(y otras vistas).
  - Se tendrá el total de ingresos/ventas y gastos en $ dolares, así como la utilidad y/o ganancias.
- **Sidebar/menu** al lado izquierdo tendra las secciones:
    - *Productos:* Agregar productos, ver productos y una opcion para modificar y borrar el producto, el id no debe ser modificado.
    - *Transacciones:* En este apartado estaran todas las transacciones a un nivel mas detallado, graficos, total de gastos sin retorno, total de gastos generales y total de ingresos, todo el historial de ventas a lo largo del tiempo, fecha de las transacciones y una vista detallada a cada una de ellas, *solo el perfil de admin puede modificar las transacciones (cualquier transaccion solo puede ser realizada por el admin)*, las vistas se manejaran a nivel de **día, semana, mes y año.**
- **Agregar gasto** - al agregar un gasto se tendran los campos:
    - Total.
    - Nombre.
    - Descripción.
    - Proveedor.
    - Sucursal.
    - Fecha(por defecto se tomara la fecha presente).
- **Personas** datos de:
    - Clientes.
    - Proveedores.

---

## Funcionalidades
- Al registrar los productos se eligira la unidad de medida, unidad de compra y la unidad de venta(*kg, g, lt, ml, pieza, metro, mm*), y al momento de la venta tambien se especificara la cantidad de ser necesario, el valor por defecto sera de ***UNO***.
- ***No*** tendra opcion de registro de usuario, esto solo podra hacerse desde la base de datos, solo tendra ***login*** para los usuarios predefinidos.
- Manejarlo por suscursales, ejemplo:
    - Sucursal **Santa Ana**.
    - Sucursal **Atiquizaya**.
- Un ***botón flotante*** para realizar venta de manera fácil.
- Se llevara el control de cuando los productos se vayan acabando y se notificara al usuario en el **icono de notificaciones**.
- El registro de productos tendra los campos:
    - Nombre.
    - ID - Codigo de barras.
    - precio de compra.
    - precio de venta.
    - cantidad.
    - imagen.
    - marca.
    - categoría.
    - unidad(*kg, g, lt, pieza, etc*).
    - unidad de compra(*kg, g, lt, pieza, etc*).
    - unidad de venta(*kg, g, lt, pieza, etc*).
- Debe haber un apartado para agregar gastos del negocio, gastos sin retorno de inversion por ejempo:
    - herramientas.
    - alquiler.
    - cosas que no tienen precio de venta.