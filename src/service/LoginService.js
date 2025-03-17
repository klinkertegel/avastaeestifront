import axios from "axios";

export default {
    sendLoginRequest(username, password) {
        return axios.get('/login', {
            headers: {Accept: 'application/json'},
            params: {
                    username: username,
                    password: password
                }
            }
        );
    },
}

