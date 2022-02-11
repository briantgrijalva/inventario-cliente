import { Routes, Route} from "react-router-dom";

import { DashboardScreen } from "../components/dashboard/DashboardScreen";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";


export const DashboardRoutes = () => {
    return (
        <>
            {/* <Julon /> */}

            <Navbar />
            <Sidebar />
            
            <div className="container mt-2">

                <Routes>
                    <Route path="dashboard" element={<DashboardScreen />} />
                    
                    
                    <Route path="/*" element={<DashboardScreen />} />
                </Routes>
            
            </div>


        </>
    )
}
