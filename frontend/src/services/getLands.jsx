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
async function get_land_byId(land_id) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/lands/${land_id}`,{
            method:"GET",
            credentials:'include'
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
export   {Get_Lands,get_land_byId};