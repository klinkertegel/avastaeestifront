import axios from "axios";

export default {
    sendGetUserFavouritesRequest(userId) {
        return axios.get('/user-favourites', {
            params: {
                userId: userId,
            },
        });
    },

    sendPostUserFavoritesRequest(userId, locationId) {
        return axios.post('/add-favorites', null, {
                params: {
                    userId: userId,
                    locationId: locationId
                }
            }
        );
    },
};