import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import Users from '@/components/users/Users'
import Roles from '@/components/roles/Roles'
import Rights from '@/components/roles/Rights'
import Goods from '@/components/goods/Goods'
import GoodsAdd from '@/components/goods/Goods-Add'
import GoodsEdit from '@/components/goods/Goods-Edit'
import Params from '@/components/goods/Params'
import Categories from '@/components/goods/Categories'
import Orders from '@/components/orders/Orders'
import Reports from '@/components/reports/Reports'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/users', component: Users},
        {path: '/roles', component: Roles},
        {path: '/rights', component: Rights},
        {path: '/goods', component: Goods},
        {path: '/goods/add', component: GoodsAdd},
        {path: '/goods/edit/:id', component: GoodsEdit},
        {path: '/params', component: Params},
        {path: '/categories', component: Categories},
        {path: '/orders', component: Orders},
        {path: '/reports', component: Reports}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!sessionStorage.getItem('token')) return next('/login')
  next()
})
export default router
