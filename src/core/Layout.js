import { Link, useLocation} from "react-router-dom";
import { Fragment } from "react";
import { isAuth, signout } from "../pages/Helpers";
import { useNavigate } from "react-router-dom";

import '../App.css';
const Layout = ({children})=>{

    const Location = useLocation();
    const Navigate = useNavigate();

    const isActive=(path)=>{
        if(Location.pathname === path){
            return {color: '#000'}
        }
        return {};
    }
    let LC = localStorage.getItem('user');
    LC = JSON.parse(LC)
    var Name;
    if(LC){
        Name = LC.name
    }

    const nav = ()=>(
        <Fragment>
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/" className="home" style={isActive('/')} >Home</Link>
                </li>
                { !isAuth() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link to="/signin" className="signup" style={isActive('/signin')} >SignIn</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="signup" style={isActive('/signup')} >Signup</Link>
                        </li>
                    </Fragment>
                )}

                { isAuth() && (
                    <Fragment>
                        <li className="nav-item" style={{ paddingLeft: 4 }}>
                            <span className="nav-link" onClick={()=>{
                                signout(()=>{
                                    Navigate("/signin")
                                })
                            }}>
                                Signout
                            </span>
                        </li>
                    </Fragment>
                )}
                
                {isAuth() && isAuth().role === 'admin' && (
                    <li className="nav-item">
                        <Link to='/admin' className="admin" style={isActive('/admin')}>{Name}</Link>
                    </li>
                )}
                {isAuth() && isAuth().role === 'subscriber' && (
                    <li className="nav-item">
                        <Link to='/private' className="private" style={isActive('/private')}>{Name}</Link>
                    </li>
                )}
            </ul>
            
            </Fragment>
        )

    return(
        <>
            {nav()}
            <div className="container">{children}</div>
        </>
    )
}

export default Layout;