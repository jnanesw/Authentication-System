import React from "react";
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import App from "./App"
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Activate from "./pages/Activate";
import Private from "./core/Private";
import PrivateRoute from "./pages/privateRoute";
import Admin from "./core/Admin";
import AdminRoute from "./pages/AdminRoute";

const Routing = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={App} />
                <Route path="/signup" Component={Signup} />
                <Route path="/signin" Component={Signin} />
                <Route path="/auth/activate/:token" Component={Activate} />
                <Route path="/private" element={<PrivateRoute Component={Private} />} />
                <Route path='admin' element = {<AdminRoute Component={Admin} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;