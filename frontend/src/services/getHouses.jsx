const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function Get_All_Houses() {
    try {
        const response = await fetch(`${BACKEND_URL}/features/properties`,{
            method:"GET",
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
async function Get_Particular_House(propertyType) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/properties/${propertyType}`,{
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

async function get_house_byId(house_id) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/property/${house_id}`, {
            method:"GET",
            credentials:'include',
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
export  {Get_All_Houses,Get_Particular_House,get_house_byId};