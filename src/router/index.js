import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
import CenterRouter from '@/router/routes/center'
import CinemaRouter from '@/router/routes/cinema'
import FilmsRouter from '@/router/routes/film'
import CityRouter from '@/router/routes/city'
const routes = [
  ...CenterRouter, 
  CinemaRouter,
  ...FilmsRouter,
  CityRouter,
  {path:'/',redirect: '/films'}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let arr=["/balance",];
  if(arr.includes(to.path)&&!localStorage.getItem('jwt')){
    router.push({path:'/login',query:{toUrl:to.path}})
  }else{
    next();
  }
 
})

export default router
