import { Routes, Route} from "react-router-dom";

import { DashboardScreen } from "../components/dashboard/DashboardScreen";
// import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";
import { VentasScreen } from "../components/ventas/VentasScreen";


export const DashboardRoutes = () => {
    return (
        <>
            {/* <Julon /> */}

            {/* El sidebar contiene las routes */}
            <Sidebar />
            
            <div className="container mt-2">

                <Routes>
                    <Route path="dashboard" element={<DashboardScreen />} />
                    <Route path="ventas" element={<VentasScreen />} />
                    
                    
                    <Route path="/*" element={<DashboardScreen />} />
                </Routes>
            
            </div>


        </>
    )
}
