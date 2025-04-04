const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function sendMail(property_name) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/submit-interest/${property_name}`,{
            credentials:'include',
            method:"POST"
        })
        const data = await response.json();
        if(!response.ok) return {error:data};
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}   

export default sendMail;