import { Route, Routes } from "react-router-dom";
import './App.css'

import { AdminLogin, AdminSignup, AdminHome } from "./Pages";

function App() {
    return(
      <Routes>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/" element={<AdminHome />}/>

        </Routes>

  )
}

export default App
