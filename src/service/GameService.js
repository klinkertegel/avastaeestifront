import axios from "axios";

export default {
    sendCreateNewGameRequest(newGame) {
        return axios.post('/game', newGame);
    },

    sendSaveGameLocations(gameData) {
        return axios.post('/game-save', gameData);
    },

    sendGetGamesRequest() {
        return axios.get('/games');
    },

    sendPostNewRandomGame(userId) {
        return axios.post('/random/game', null,
            {
                params: {
                    userId: userId
                }
            });
    },

    sendGetUserGames(userId) {
        return axios.get('/user-games',
            {
                params: {
                    userId: userId
                }
            });
    },

    sendGetRandomGameLocationsRequest(randomGameId) {
        return axios.get('/random/game/location', {
                params: {
                    randomGameId: randomGameId,
                }
            }
        );
    },

    sendGetUserGameLocationsRequest(userGameId) {
        return axios.get('/user/game/location', {
                params: {
                    userGameId: userGameId,
                }
            }
        );
    },

    sendPostUserAnswerRequest(userAnswer) {
        return axios.post('/game/location/result', userAnswer);

    },

    sendPostUserGameUserAnswerRequest(userAnswer) {
        return axios.post('/user/game/location/result', userAnswer);

    },

    sendGetGameOverResultsRequest(randomGameId) {
        return axios.get('/game/gameover', {
                params: {
                    randomGameId: randomGameId,
                }
            }
        );
    },
    sendGetUserGameOverResultsRequest(userGameId) {
        return axios.get('/user/game/gameover', {
                params: {
                    userGameId: userGameId,
                }
            }
        );
    },

    sendGetUserGameOverScoreRequest(userGameId) {
        return axios.get('/user/game/score', {
                params: {
                    userGameId: userGameId,
                }
            }
        );
    },

    sendPostNewLocationToUserGame(gameId, selectedLocationId) {
        return axios.post('/game-location', null, {
                params: {
                    gameId: gameId,
                    locationId: selectedLocationId
                }
            }
        )
    },

    sendDeleteGameLocationRequest(gameLocationId) {
        return axios.delete('/game-location', {
                params: {
                    gameLocationId: gameLocationId
                }
            }
        )
    },
    sendUserGameDeleteRequest(gameId) {
        return axios.delete('/user-game', {
                params: {
                    gameId: gameId
                }
            }
        )
    },
    sendPostNewUserGameRequest(gameId, userId) {
        return axios.post('/user/game', null, {
                params: {
                    gameId: gameId,
                    userId: userId
                }
            }
        );
    },

    sendGetTopScoresRequest(userGameId) {
        return axios.get('/user/game/topscores', {
                params: {
                    userGameId: userGameId,
                }
            }
        );
    },
}