import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task.vue'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
 
Vue.use(Router)
 
let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'task',
      component: Task,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
 
 
export default router