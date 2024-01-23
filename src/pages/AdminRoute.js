import { isAuth } from "./Helpers";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";

const AdminRoute = ({Component})=>{
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuth() || isAuth().role !== 'admin'){
            navigate('/signin');
        }
    },[navigate])

    return(
        <Fragment>
            { isAuth() && isAuth().role === 'admin' ? <Component /> : null }
        </Fragment>
    )
}

export default AdminRoute;