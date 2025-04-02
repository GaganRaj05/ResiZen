const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function Get_Lands() {
    try {
        const response =await fetch(`${BACKEND_URL}/features/lands-for-sale`,{
            method:"GET", 
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
export default  Get_Lands;