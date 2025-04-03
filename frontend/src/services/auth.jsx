const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Sign_up(formData) {
    try {   
        const response = await fetch(`${BACKEND_URL}/auth/sign-up`,{
            method:"POST",
            credentials:'include',
            body:formData, 
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function Logout() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-out`, {
            method:"POST",
            credentials:'include',
        })
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function login(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-in`,{
            method:"POST",
            credentials:'include',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
        })
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

export {Sign_up,Logout,login};