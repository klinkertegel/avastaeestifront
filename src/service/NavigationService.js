import router from "@/router";

export default {
    navigateToUserHomeView() {
        router.push(
            {
                name: 'userHomeRoute'
            }
        )
    },
    // todo: see välja kommenteerida lõpus
    navigateToErrorView() {
        // router.push({name: 'errorRoute'})
    },

    navigateToAdminHomeView() {
        router.push({
                name: 'adminHomeRoute'
            }
        )
    },

    navigateToProfileInfoView() {
        router.push({
                name: 'profileRoute'
            }
        )
    },

    navigateToLoginView() {
        router.push({
                name: 'loginRoute'
            }
        )
    },

    navigateToLocationView(locationId) {
        router.push({
            name: 'locationRoute',
            query: {
                locationId: locationId
            }
        })
    },

    navigateToGameQuestionView(gameId) {
        router.push({
            name: 'gameLocationsRoute',
            query: {
                gameId: gameId
            }
        })
    },

    navigateToGameView(randomGameId) {
        router.push({
            name: 'gameRoute',
            query: {
                randomGameId: randomGameId
            }
        })

    },
    navigateToUserGameView(userGameId) {
        router.push({
            name: 'gameRoute',
            query: {
                userGameId: userGameId
            }
        })

    },

    navigateToResultView(userAnswerResult, randomGameId) {
        router.push({
            name: 'gameResultsRoute',
            query: {
                locationId: userAnswerResult.locationId,
                locationName: userAnswerResult.locationName,
                locationIsCorrect: userAnswerResult.locationIsCorrect,
                totalQuestions: userAnswerResult.totalQuestions,
                questionsAnswered: userAnswerResult.questionsAnswered,
                randomGameId: randomGameId,

            }
        })
    },
    navigateToUserGameResultView(userAnswerResult, userGameId) {
        router.push({
            name: 'gameResultsRoute',
            query: {
                locationId: userAnswerResult.locationId,
                locationName: userAnswerResult.locationName,
                locationIsCorrect: userAnswerResult.locationIsCorrect,
                totalQuestions: userAnswerResult.totalQuestions,
                questionsAnswered: userAnswerResult.questionsAnswered,
                userGameId: userGameId,

            }
        })
    },

    navigateToGameOverView(randomGameId) {
        router.push({
            name: 'gameOverRoute',
            query: {
                randomGameId: randomGameId
            }
        })

    },

    navigateToGameScoreView(userGameId) {
        router.push({
            name: 'gameScoreRoute',
            query: {
                userGameId: userGameId
            }
        })

    },
}