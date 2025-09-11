import axios from 'axios';

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function deleteFavorite(currentUser,recipe){
    try{
        const result = axios.delete(`${backendUrl}/favorites`,{
            data:{
                recipe:recipe,
                user:currentUser.uid
            }
        })
        if(result.status === 200){
            return "Deleted from favorites"
        } else if(result.status == 404){
            return "couldn't find favorite"
        } else {
            return result.message
        }
    } catch(err){ 

    }
}

export async function addFavorite(currentUser, recipe) {
    try {
        const result = await axios.post(`${backendUrl}/favorites`, {
            recipe: recipe,
            user: currentUser.uid
        });

        console.log("Favorite request status:", result.status);

        if (result.status === 200) {
            return "Already a favorite"
        } else if (result.status === 201) {
            return "Added to favorites"
        }
    } catch (err) {
        console.error("Error adding to favorites:", err.response ? err.response.data : err.message);
        return "error adding to favorites"
    }
}