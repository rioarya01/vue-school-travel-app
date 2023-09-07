import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
// import NotFoundVue from '@/views/NotFound.vue'
import sourceData from '@/data.json'

const routes = [
    // Home
    { path: '/', name: 'Home', component: Home, alias: '/home' },
    // Bisa menggunakan redirect seperti dibawah ini atau cukup menggunakan alias diatas
    // { path: '/home', redirect: "/" },

    // Protected = hasil dari login
    {
        path: '/protected',
        name: 'protected',
        components: {
            default: ()=>import('@/views/Protected.vue'),
            LeftSidebar: ()=>import('@/components/LeftSidebar.vue')
        },
        meta: {
            requireAuth: true,
        }
    },

    // Login
    {
        path: '/login',
        name: 'login',
        component: ()=>import('@/views/Login.vue'),
    },

    // Invoices
    {
        path: '/invoices',
        name: 'invoices',
        components: {
            default: ()=>import('@/views/Invoices.vue'),
            LeftSidebar: ()=>import('@/components/LeftSidebar.vue'),
        },
        meta: {
            requireAuth: true,
        }
    },

    {
        path: "/example/:id(\\d+)?",
        component: ()=>import('@/views/Login.vue'),
    },

    // Destination
    { 
        path: '/destination/:id/:slug', 
        name: 'destination.show', 
        component: ()=>import('@/views/DestinationShow.vue'),
        props: route=> ({...route.params, id: parseInt(route.params.id)}),
        beforeEnter(to, from){
            const exists = sourceData.destinations.find(
                destination => destination.id === parseInt(to.params.id)
            )
            if(!exists) return {
                name: 'NotFound',
                // allows keeping the URL while rendering a different page
                params: { pathMatch: to.path.split('/').slice(1) },
                query: to.query,
                hash: to.hash,
            }
        },
        children: [
            {
                path: ':experienceSlug',
                name: 'experience.show',
                component: ()=>import('@/views/ExperienceShow.vue'),
                props: route=> ({...route.params, id: parseInt(route.params.id)})
            }
        ]
    },
    // Routes dibawah ini bisa digunakan jika tidak menggunakan children. 
    // Fungsinya untuk membuat halaman baru pada tampilan website tanpa menggunakan tag <a>
    // {
    //     path: '/destination/:id/:slug/:experienceSlug',
    //     name: 'experience.show',
    //     component: ()=>import('@/views/ExperienceShow.vue'),
    //     props: route=> ({...route.params, id: parseInt(route.params.id)})
    // }

    // NotFound
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ()=> import('@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        return savedPosition || new Promise((resolve)=>{
            setTimeout(()=> resolve({top: 0, behavior: 'smooth'}), 300)
        })
        // return{top: null, left: null, behavior: null}
    }
})
router.beforeEach((to, from)=>{
    if(to.meta.requireAuth && !window.user){
        // need to login if not already logged in
        return {name: 'login', query: {redirect: to.fullPath}}
    }
})
export default router