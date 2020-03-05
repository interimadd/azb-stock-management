import Vue from 'vue'
import Router from 'vue-router'
import StockManager from '@/components/StockManager.vue'
import Signin from '@/components/Signin'
import store from '@/store'
 
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

// ログインが完了していない場合にサインインページに飛ばす
router.beforeEach((to, from, next)=>{
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth==true){
    // 未ログイン時
    if(store.state.status==false){
      next('/signin');
    }else{
      next();
    }    
  }
  else{
    next()
  }
})

export default router