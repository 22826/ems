// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './Login'


import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  data:{
  	currentComponent:'Login'
  },
  created(){
  	//json转化为对象
  	//当用户刷新页面时，先查看本地存储中是否保存了用户的登录信息，如何包含了用户信息，认为用户已经登录跳转到App，否则跳转到登录
		let user=JSON.parse(localStorage.getItem('user'));
		if(user&&user.id){
			this.currentComponent='App';
		}else{
			this.currentComponent='Login';
		}


  },
  components: { App ,Login},
  template: `
  <component v-bind:is="currentComponent"></component>
  `
})


window.vm=vm;
