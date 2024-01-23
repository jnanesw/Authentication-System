import { useNavigate } from "react-router-dom";
import { isAuth } from "./Helpers";
import { Fragment, useEffect } from "react";
const PrivateRoute = ({Component})=>{
    const navigate = useNavigate();

    useEffect(() => {
          if(!isAuth()){
            navigate("/signin");
          }
      }, [navigate]);

    return(
        <Fragment>
            {isAuth() ? <Component /> : null}
         </Fragment>
        
    )
}

export default PrivateRoute;