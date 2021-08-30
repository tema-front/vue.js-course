import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../views/Dashboard'
import About from '../views/About'
// import NotFound from '../views/NotFound'

// import AddPayment from '../components/AddPayment'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            // component: Dashboard,

            component: () => import(/* webpackChunkName: 'Dashboard' */ '../views/Dashboard.vue'),
            name: 'Dashboard'
        },

        {
            path: '/dashboard/:page',
            component: Dashboard,

            // component: () => import(/* webpackChunkName: 'Dashboard' */ '../views/Dashboard.vue'),
            name: 'Dashboard'
        },

        {

            path: '/dashboard/add/payment',
            // component: Dashboard,

            component: () => import(/* webpackChunkName: 'Dashboard' */ '../views/Dashboard.vue'),
            name: 'Dashboard'
        },

        {
            path: '/dashboard/add/payment/:category',
            // component: Dashboard,
            component: () => import(/* webpackChunkName: 'Dashboard' */ '../views/Dashboard.vue'),
            name: 'Dashboard'
        },

        {
            path: '/dashboard/add/payment/:category/:value',
            component: Dashboard,
            name: 'Dashboard'
        },

        {
            path: '/',
            redirect: '/menu',
        },

        {
            path: '/menu',
            name: 'menu'
        },

        {
            path: '/about',
            component: About,
            name: 'about'
        },

        {
            path: '/about*',
            component: () => import(/* webpackChunkName: 'About' */ '../views/About.vue'), 
            redirect: '/about'
        },

        {
            path: '/dashboard*',
            component: Dashboard,
            redirect: '/dashboard'
        },

        {
            path: '/404',
            component: () => import(/* webpackChunkName: 'NotFound' */ '../views/NotFound.vue'), 
            name: 'notFound',
        },

        {
            path: '*',
            // redirect: '/404'
            redirect: { name: 'notFound' }
        },

        
    ]
});
export default router;



// const userAuth = false

// router.beforeEach((to, from, next) => {
//     if (to.name != 'NotFound' && !userAuth) {
//         next({path: '/404'})
//     } else {
//         next()
//     }
//     console.log(to, from, next)
// })

const getTitle = routname => {
    return {
        'menu': 'Menu',
        'Dashboard':'Take a look on your payments and add more!',
        'about': 'Anything about our awesome application!',
        'notFound': 'Oops! Seems like we lost this page :( '
    }[routname]
}

router.afterEach((to) => {
    document.title = getTitle(to.name)
})

// router.afterEach((from) => {
//     debugger
//     console.log(from);
// })



