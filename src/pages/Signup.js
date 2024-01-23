// import axios from "axios";
import { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import { isAuth } from "./Helpers";
import { Navigate } from "react-router-dom";
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = ()=>{

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const {name, email, password, buttonText} = values

    const handleChange =  type => event =>{
        setValues({...values, [type]: event.target.value})
    }
    const clickSubmit = async (event)=>{
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting...'})
        axios.post('http://localhost:8000/api/signup', {name, email, password}) //check by process.env.REACT_APP_API
              .then((res)=>{
                console.log("Signup Success: ", res.data.message)
                toast.success(res.data.message,{
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
                setValues({...values,name:'', email: '', password:'', buttonText:'Submitted'})
              })
              .catch(error=>{
                console.log("Signup Error: ", error);
                if (error.response && error.response.data && error.response.data.error && error.response.data.error.length > 1  && typeof error.response.data.error !== 'string') {
                    error.response.data.error.map((item) => {
                        return toast.error(item.msg, {
                            position: "top-right",
                        });
                    });
                } else {
                    toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                }
                
                setValues({...values, buttonText:'Submit'})
              })
    }

    const singupForm = ()=>(
        <form>
            <div className="form-group">
                <label className="label" >Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="input" />
            </div>

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

    return(
        <Layout>
            <div>
                <ToastContainer />
                {isAuth() ? <Navigate to={"/"} /> : null}
                <h1>Signup</h1>
                {singupForm()}
            </div>
        </Layout>
    )
}

export default Signup;