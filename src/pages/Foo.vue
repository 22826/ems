<template>
	<div class="foo">
		this is foo
		<div>
			{{$route.params.id}}
		</div>
		<div>{{id}}</div>
		<div>{{article}}</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				article:null
			}
		},
		watch:{
			id(){
				this.getArticle();
			}
		},
		mounted(){
			this.getArticle();
		},
		props:['id'],
		methods:{
			getArticle(){
				setTimeout(()=>{
					this.article=this.id+"文章";
				},1000)
			}
		}
	}
		
			
	
</script>