import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useJwt} from 'react-jwt';
import Layout from "../core/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Activate = ()=>{
    
    const {token} = useParams();
    const decodedToken = useJwt(token);
    let name='';
    if(decodedToken.decodedToken){
        name = decodedToken.decodedToken.name
    }

    console.log("Token: ", token);
    console.log("Decode token: ", decodedToken);
    console.log("Name: ", name);
    
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: false
    })

    useEffect(()=>{
        
        if(token){
            setValues({...values, name:name, token:token}); 
        }
    // eslint-disable-next-line
    }, [token])

    console.log("Name: ", name);

    const clickSubmit = async (event)=>{
        event.preventDefault();
        console.log("Token Inside clickSubmit: ", token);

        await axios.post('http://localhost:8000/api/account-activation', {token})
              .then((res)=>{
                    console.log("Account Activate: ", res);
                    toast.success("Activation Successful");
              })
              .catch((error)=>{
                if (error.response && error.response.data && error.response.data.error && error.response.data.error.length > 0) {
                    error.response.data.error.map((item) => {
                        return toast.error(item.msg, {
                            position: "top-right",
                        });
                    });
                } else {
                    toast.error(error.response.data.err, {
                        position: "top-right",
                    });
                }
                    console.log("Not Activate: ", error);
              })
    }

    return (
        <Layout>
            <div>
                <ToastContainer />
                <div>
                    <h1>Hey {name}, Ready to activate your account</h1>
                    <button onClick={clickSubmit} className="btn">Activate Account</button>
                </div>
            </div>
        </Layout>
    )
}

export default Activate;