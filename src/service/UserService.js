import axios from "axios";

export default {
    sendPostRegisterRequest(newUser) {
        return axios.post('/user', newUser);
    },

    sendGetUserInfoRequest(userId) {
        return axios.get('/user', {
                params: {
                    userId: userId
                }
            }
        )
    },
    sendPutUserUpdateRequest(User, userId) {
        return axios.put('/user', User, {
                params: {
                    userId: userId
                }
            }
        )
    },
    sendDeleteUserInfoRequest(userId) {
        return axios.delete('/user', {
                params: {
                    userId: userId
                }
            }
        )
    },


}