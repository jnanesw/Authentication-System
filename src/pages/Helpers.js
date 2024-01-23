import cookie from 'js-cookie';

// set cookie
export const setCookie = (key, val)=>{
    if(window !== undefined){
        cookie.set(key, val, {
            expires: 1
        })
    }
}
//Remove cookie when user got logOut
export const removeCookie = (key, val)=>{
    if(window !== undefined){
        cookie.remove(key, {
            expires: 1
        })
    }
}

//get from cookie such as stored token will be useful when we need to request the server with token
export const getCookie = (key)=>{
    if(window !== undefined){
        return cookie.get(key);
    }
}


// Set in localStorage
export const setLocalStorage = (key, val)=>{
    if(window !== undefined){
        localStorage.setItem(key, JSON.stringify(val));
    }
}
// Remove from localStorage
export const removeLocalStorage = (key)=>{
    if(window !== undefined){
        localStorage.removeItem(key);
    }
}

// Authenticate user by passing the data to cookie and localstorage during signin
export const authenticate = (response, next)=>{

    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();

}
// Access user info from localstorage
export const isAuth = ()=>{
    // console.log("User: ", localStorage.getItem('user'))
    if(window !== 'undefined'){
        // console.log("User: ", localStorage.getItem('user'));
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }
            else{
                return false;
            }
        }
    }
}

export const signout = (next)=>{
    removeCookie('token');
    removeLocalStorage('user')
    next();
}