import { Routes, Route} from "react-router-dom";

import { DashboardScreen } from "../components/dashboard/DashboardScreen";
import { AgregarClientesScreen } from "../components/personas/clientes/AgregarClientesScreen";
import { PersonasScreen } from "../components/personas/PersonasScreen";
import { AgregarProveedoresScreen } from "../components/personas/proveedores/AgregarProveedoresScreen";
import { AgregarUsuarioScreen } from "../components/personas/usuarios/AgregarUsuarioScreen";
import { AgregarSucursal } from "../components/sucursales/AgregarSucursal";
import { SucursalesScreen } from "../components/sucursales/SucursalesScreen";
// import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";
import { VentasScreen } from "../components/ventas/VentasScreen";


export const DashboardRoutes = () => {

    localStorage.setItem("paginacion", 1);
    return (
        <>
            {/* <Julon /> */}

            {/* El sidebar contiene las routes */}
            <Sidebar />
            
            <div className="container container-div mt-2" >

                <Routes>
                    <Route path="dashboard" element={<DashboardScreen />} />
                    <Route path="ventas" element={<VentasScreen />} />
                    <Route path="sucursales" element={<SucursalesScreen />} />
                    <Route path="personas" element={<PersonasScreen />} />
                    <Route path="nuevoUsuario" element={<AgregarUsuarioScreen />} />
                    <Route path="nuevoProveedor" element={<AgregarProveedoresScreen />} />
                    <Route path="nuevoCliente" element={<AgregarClientesScreen />} />
                    <Route path="nuevaSucursal" element={<AgregarSucursal />} />
                    
                    
                    <Route path="/*" element={<DashboardScreen />} />
                </Routes>
            
            </div>


        </>
    )
}
