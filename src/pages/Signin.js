import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../core/Layout";
import { useState } from "react";
import { authenticate, isAuth } from "./Helpers";
import {  useNavigate } from "react-router-dom";
// import 

const Signin = ()=>{
    const Navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText:'Submit'
    })

    const {email, password, buttonText} = values;

    const handleChange = type=>event=>{
        setValues({...values, [type]: event.target.value});
    }

    const clickSubmit = async (event)=>{
        event.preventDefault();
        await axios.post("http://localhost:8000/api/signin", {email, password})
              .then((res)=>{
                    console.log("Singin Success: ", res);
                    authenticate(res, ()=>{
                        // toast.success(`Hey, ${res.data.user.name}. Welcome Back!`);
                        console.log("From Inside the Success!!", res.data.user.name)
                        setValues({...values,email:'',password:'', buttonText: 'Submited'})

                        isAuth() && isAuth().role === 'admin' ? Navigate('/admin') : Navigate('/private');
                    })
              })
              .catch(error=>{
                console.log("Signup Error: ", error);
                if (error.response && error.response.data && error.response.data.error && error.response.data.error.length > 1 && typeof error.response.data.error !== 'string') {
                    error.response.data.error.map((item) => {
                        return toast.error(item.msg, {
                            position: "top-right",
                        });
                    });
                } else {
                    toast.error(error.response.data.error, {
                        position: "top-right",
                    });
                }
                
                setValues({...values, buttonText:'Submit'})
              })
    }

    const signinForm = ()=>{
        return(
            <form>
                <div className="form-group">
                    <label className="label" >Email</label>
                    <input onChange={handleChange('email')} value={email} type="email" className="input" />
                </div>

                <div className="form-group">
                    <label className="label" >Password</label>
                    <input onChange={handleChange('password')} value={password} type="password" className="input" />
                </div>

                <div className="button">
                    <button className="btn" onClick={clickSubmit} >{buttonText}</button>
                </div>
            </form>
        )
    }
    return(
        <Layout>
            <div>
                <ToastContainer />
                {isAuth() ? <Navigate to={"/"} /> : null}
                <h1>SignIn</h1>
                {signinForm()}
            </div>
        </Layout>
    )
}

export default Signin;