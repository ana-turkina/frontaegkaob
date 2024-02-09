import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import BeforeView from "@/views/BeforeView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import AfterView from "@/views/AfterView.vue";
import FuneralView from "@/views/FuneralView.vue";
import ErrorView from "@/views/ErrorView.vue";
import GalleryView from "@/views/GalleryView.vue";
import MapView from "@/views/MapView.vue";
import userProfileView from "@/views/UserProfileView.vue";
import inviteFriendView from "@/views/InviteFriendView.vue";
import memoryView from "@/views/MemoryView.vue";


const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/about',
        name: 'aboutRoute',
        component: AboutView
    },
    {
        path: '/welcome',
        name: 'WelcomeRoute',
        component: WelcomeView
    },
    {
        path: '/before',
        name: 'beforeRoute',
        component: BeforeView
    },

    {
        path: '/after',
        name: 'afterRoute',
        component: AfterView
    },
    {
        path: '/funeral',
        name: 'funeralRoute',
        component: FuneralView
    },
    {
        path: '/gallery',
        name: 'galleryRoute',
        component: GalleryView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/map',
        name: 'MapRoute',
        component: MapView
    },
    {
        path: '/user-profile',
        name: 'userProfileRoute',
        component: userProfileView
    },
    {
        path: '/invite',
        name: 'inviteFriendRoute',
        component: inviteFriendView
    },
    {
        path: '/memory',
        name: 'memoryRoute',
        component: memoryView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
