import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Middlewares from '../middlewares/'
// import { from } from 'core-js/fn/array'

Vue.use(VueRouter)

const router =  new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                middleware: [Middlewares.guest]
            },
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                middleware: [Middlewares.auth]
            },
            // beforeEnter: (to, from, next) => {
            //     console.log(Login.methods.getLoggedIn == )
            //     next()
            // }
        },
    ]
})

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index];

    if (!nextMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMidd = nextCheck(context, middleware, index + 1)

        nextMiddleware({context, next:nextMidd})
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to
        }

        const nextMiddleware = nextCheck(context, middleware, 1)

        return middleware[0]({...context, next: nextMiddleware})
    }
})

export default router