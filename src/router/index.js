import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import StockManager from '@/components/StockManager.vue'
import StockChecker from '@/components/StockChecker.vue'
import StockSetting from '@/components/StockSetting.vue'
import Signin from '@/components/Signin'
import store from '@/store'
 
Vue.use(Router)
 
let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/managestock',
      name: 'StockManager',
      component: StockManager,
      meta: { requiresAuth: true }
    },
    {
      path: '/checkstock',
      name: 'StockChecker',
      component: StockChecker,
      meta: { requiresAuth: true }
    },
    {
      path: '/setting',
      name: 'StockSetting',
      component: StockSetting,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: { requiresAuth: false }
    }
  ]
})

// ログインが完了していない場合にサインインページに飛ばす
router.beforeEach((to, from, next)=>{
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth==true){
    // 未ログイン時
    if (store.getters.isInit !== true) {
      const unwatch = store.watch((state, getters) => getters.isInit, () => {
        unwatch()
        if (store.getters.isSignedIn==true){
          next()
        }
        else{
          next('/signin')
        }
      })
    }else{
      next();
    }    
  }
  else{
    next()
  }
})

export default router