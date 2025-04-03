const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Get_Users() {
    try {
        const response = await fetch(`${BACKEND_URL}/features/admin-get-users`, {
            method:"GET",
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        return {error:err.message};
    }
}

async function Delete_User (user_id) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/admin-delete-user/${user_id}`,{
            method:"DELETE",
            credentials:"include"
        })
        const data = await response.json();
        if(!response.ok) return {error:data}
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function DeleteProperty(house_id) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/delete-property/${house_id}`,{
            method:"DELETE",
            credentials:"include"
        });
        const data = await response.json();
        if(!response.ok) return {error:data}
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function DeleteLand(land_id) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/delete-land/${land_id}`,{
            method:"DELETE",
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data}
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
async function uploadLand(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/upload-land`,{
            method:"POST",
            credentials:'include',
            body:formData
        })
        const data = await response.json();
        if(!response.ok) return {error:data}
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};

    }
}

async function Upload_Property(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/upload-property`,{
            method:"POST",
            credentials:'include',
            body:formData
        })
        const data = await response.json();
        if(!response.ok) return {error:data}
        return data;


    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

export {Get_Users,Delete_User,DeleteProperty,DeleteLand,uploadLand,Upload_Property};