import { createRouter, createWebHistory } from 'vue-router'

import HomeComponent from '../components/HomeComponent'
import AboutComponent from '../components/AboutComponent'

const routes = [
    {path: '/', component: HomeComponent},
    {path: '/about', component: AboutComponent},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})