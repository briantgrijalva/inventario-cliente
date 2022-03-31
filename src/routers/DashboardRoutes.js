import { Routes, Route} from "react-router-dom";

import { DashboardScreen } from "../components/dashboard/DashboardScreen";
import { LoginScreen } from "../components/login/LoginScreen";
import { AgregarClientesScreen } from "../components/personas/clientes/AgregarClientesScreen";
import { PersonasScreen } from "../components/personas/PersonasScreen";
import { AgregarProveedoresScreen } from "../components/personas/proveedores/AgregarProveedoresScreen";
import { AgregarUsuarioScreen } from "../components/personas/usuarios/AgregarUsuarioScreen";
import { AgregarProducto } from "../components/productos/AgregarProducto";
import { ProductosScreen } from "../components/productos/ProductosScreen";
import { ViewProducto } from "../components/productos/ViewProducto";
import { AgregarSucursal } from "../components/sucursales/AgregarSucursal";
import { SucursalesScreen } from "../components/sucursales/SucursalesScreen";
import { ViewSucursal } from "../components/sucursales/ViewSucursal";
// import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";
import { VentasScreen } from "../components/ventas/VentasScreen";
import { ViewVenta } from "../components/ventas/ViewVenta";


export const DashboardRoutes = () => {

    localStorage.setItem("paginacion", 1);
    return (
        <>
            {/* <Julon /> */}

            {/* El sidebar contiene las routes */}
            <Sidebar />
            
            <div className="container container-div mt-2" >

                <Routes>
                    <Route path="login" element={<LoginScreen />} />
                    <Route path="dashboard" element={<DashboardScreen />} />
                    <Route path="ventas" element={<VentasScreen />} />
                    <Route path="verventa" element={<ViewVenta />} />
                    <Route path="sucursales" element={<SucursalesScreen />} />
                    <Route path="nuevaSucursal" element={<AgregarSucursal />} />
                    <Route path="verSucursal" element={<ViewSucursal />} />
                    <Route path="personas" element={<PersonasScreen />} />
                    <Route path="nuevoUsuario" element={<AgregarUsuarioScreen />} />
                    <Route path="nuevoProveedor" element={<AgregarProveedoresScreen />} />
                    <Route path="nuevoCliente" element={<AgregarClientesScreen />} />
                    <Route path="productos" element={<ProductosScreen />} />
                    <Route path="nuevoProducto" element={<AgregarProducto />} />
                    <Route path="verProducto" element={<ViewProducto />} />
                    
                    
                    <Route path="/*" element={<DashboardScreen />} />
                </Routes>
            
            </div>


        </>
    )
}
