import axios from 'axios';
import qs from 'qs'

axios.defaults.withCredentials=true;

 //axios.defaults.baseURL = 'http://120.78.164.247:8888'
//axios.defaults.baseURL = 'http://47.107.45.167:8888'
axios.defaults.baseURL = 'http://119.23.50.171:8888'

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
//此拦截器每次发送请求前都会执行
axios.interceptors.request.use((config)=>{
	if(config.method=='post'){
		config.data=qs.stringify(config.data,{arrayFormat:'repeat'});
	}
	return config;
})
//此拦截器每次发送请求后都会执行
//在请求每次回来时先判断回应信息是否包含未登陆信息，未包含，跳转到登陆页面，否则正常进行
//如果没有登录跳转到登陆页面
axios.interceptors.response.use((response)=>{
	if(response&& response.data.status == 500 && response.data.message=='尚未登录，请登录!'){
		//在main.js中设置
		window.vm.currentComponent='Login';
	}
	return response;

});


export default axios;