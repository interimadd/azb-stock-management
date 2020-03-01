import Vue from 'vue'
import Router from 'vue-router'
import StockManager from '@/components/StockManager.vue'
import Signin from '@/components/Signin'
import firebase from 'firebase'
 
Vue.use(Router)
 
let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'StockManager',
      component: StockManager,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

// ログインが完了していない場合にサインインページの飛ばす
router.beforeEach((to, from, next)=>{
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth){
  if (!currentUser){
    next({
      path: '/signin',
      query: {redirect: to.fullPath}
    })
  }else{
    next()
  }
}else{
  next()
}
})

export default router