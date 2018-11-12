<template>
	<div class="login">
		<h2 class="title">看点资讯精选后台管理</h2>
		<!-- ref类似于id -->
		<el-form ref='userForm' :rules="rules" :model="form" size="mini" label-position="left">
    	<el-form-item prop='username'  label="用户名" label-width="6em">
      	<el-input v-model="form.username" ></el-input>
   		</el-form-item>

   		<el-form-item prop='password' label="密码" label-width="6em">
      	<el-input v-model="form.password" type="password"></el-input>
   		</el-form-item>

   		<div class="btns">
   			<el-button size="mini" @click='login'>登录</el-button>
   		</div>
    	

  	</el-form>


	</div>
</template>

<script>
	import axios from '@/http/axios'
	export default{
		data(){
			return {
				form:{},
				rules:{
					username:[{
						required:true,
						message:'请输入用户名',
						//失焦时触发
						trigger:'blur',
					}],
					password:[{
						required:true,
						message:'请输入密码',
						trigger:'blur',
					}],
				}
			}
		},
		methods:{
			login(){
				//点击登录时validate强制校验是否输入了用户名及密码
				this.$refs.userForm.validate((valid)=>{
					if(valid){
						axios.post('/login',this.form)
						.then(({data:result})=>{
							if(result.status ==200 && result.message=='登录成功'){
							//登录成功处理
							//1.页面跳转。拿到 main中的window.vm.currentComponent='App'; 
							window.vm.currentComponent='App';

							//2.用户信息的保存在浏览器localstorage中,否则已经登陆但刷新后需再次登录
							//localstorage中的值不能为对象,为string类型
							localStorage.setItem('user',JSON.stringify(result.data))
							}
						})
						.catch((error)=>{
							this.$notify.error({
								title:'错误',
								message:'登录错误'
							});
						});
					}
				})


				
			}
		}
	}
</script>

<style>
	/*处理谷歌浏览器inpt的默认填充色*/
	input:-webkit-autofill{
		-webkit-box-shadow:0 0 0px 1000px white inset !important;
	}

	.login{
		width: 400px;
		margin: auto; 
	}
	.login >.title{
		margin-top: 150px;
		text-align:center; 
	}
	.login{
		text-align: right;
	}
</style>