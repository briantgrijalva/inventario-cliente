import { Routes, Route} from "react-router-dom";

import { DashboardScreen } from "../components/dashboard/DashboardScreen";


export const DashboardRoutes = () => {
    return (
        <>
            {/* <Julon /> */}

            <div className="container mt-2">

                <Routes>
                    <Route path="dashboard" element={<DashboardScreen />} />
                    
                    
                    <Route path="/*" element={<DashboardScreen />} />
                </Routes>
            
            </div>


        </>
    )
}
