import {createRouter, createWebHashHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";
import GameView from "@/views/GameView.vue";
import LocationView from "@/views/LocationView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";
import NewGameView from "@/views/NewGameView.vue";
import GameLocationsView from "@/views/GameQuestionsView.vue";
import AllGamesView from "@/views/AllGamesView.vue";
import ResultView from "@/views/ResultView.vue";
import FavouritesView from "@/views/FavouritesView.vue";
import ProfileInfoView from "@/views/ProfileInfoView.vue";

import GameOverView from "@/views/GameOverView.vue";
import GameScoreView from "@/views/GameScoreView.vue";

const routes = [
    {
        path: '/',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/home',
        name: 'userHomeRoute',
        component: UserHomeView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/register',
        name: 'registerRoute',
        component: RegisterView
    },
    {
        path: '/location',
        name: 'locationRoute',
        component: LocationView
    },
    {
        path: '/home-admin',
        name: 'adminHomeRoute',
        component: AdminHomeView
    },
    {
        path: '/game',
        name: 'gameRoute',
        component: GameView
    },
    {
        path: '/game-new',
        name: 'newGameRoute',
        component: NewGameView
    },
    {
        path: '/game-location',
        name: 'gameLocationsRoute',
        component: GameLocationsView
    },
    {
        path: '/games',
        name: 'allGamesRoute',
        component: AllGamesView
    },
    {
        path: '/game-results',
        name: 'gameResultsRoute',
        component: ResultView
    },
    {
        path: '/favourites',
        name: 'favouritesRoute',
        component: FavouritesView
    },
    {
        path: '/profile',
        name: 'profileRoute',
        component: ProfileInfoView
    },
    {
        path: '/game-over',
        name: 'gameOverRoute',
        component: GameOverView
    },
    {
        path: '/game-score',
        name: 'gameScoreRoute',
        component: GameScoreView
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
