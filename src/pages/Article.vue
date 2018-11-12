<template>
	<div class="article">
		<!-- 按钮区 -->
		<div class="btns">

			<el-select size='mini' v-model="params.categoryId" clearable placeholder="所有栏目"  style='width:100px'>
		    <el-option v-for=' c in categories' :value='c.id' :key='c.id' :label="c.name">
		    	{{c.name}}
		     </el-option>
		    	}
  		</el-select>

  		<el-input  
  			style='width:200px'
			  placeholder="请输入关键字"
			  v-model="params.keywodrds"
			  clearable size='mini'>
			</el-input>
			
			<el-button size='mini' @click='toAddArticle'>新增</el-button>
			<el-button size='mini'>批量删除</el-button>
		</div>
		<!-- 列表区 -->
		<!-- {{params}} -->
		<div class="article-tbl" v-loading='loading'>
			<el-table :data="articles" style="width: 100%" size='mini' :border='true' @selection-change="handleSelectionChange"> 
				<el-table-column
				  fixed="left"
		      type="selection"
		      width="40">
		    </el-table-column>

				<el-table-column
	        prop="title"
	        label="文章标题"
	        width="300">
	      </el-table-column>
	      <el-table-column
	      	align="center"
	        prop="category.name"
	        label="所属栏目"
	        width="100">
	      </el-table-column>
	      <el-table-column
	      	align="center"
	        prop="author"
	        label="作者"
	        width="120">
	      </el-table-column>
	       <el-table-column
	      	align="center"
	        prop="publishtime"
	        width="160"
	        label="发布时间">
	      </el-table-column>
	       <el-table-column
	      	align="center"
	        prop="readtimes"
	        label="阅读次数"
	        width="100">
	      </el-table-column>
	      <el-table-column fixed="right" label="操作" width='60' align="center"> 
	      	<template slot-scope='{row}'>
	      		<i class="fa fa-trash" @click='deleteArticle(row.id)'></i>
	      		<i class="fa fa-pencil" @click='toUpdateArticle(row)'></i>
	      	</template>
	      </el-table-column>
    	</el-table>
		</div>
		<!-- 列表区结束 -->
		<!-- 分页 -->
		<div class="page">
			<el-pagination
	    	layout="prev, pager, next"
	    	:total=total
	    	:page-size='params.pageSize'
	    	@current-change='handleCurrentChange'
	    	>
	  	</el-pagination>
		</div>
		<!-- 分页结束 -->

		<!-- 模态框开始 -->
		<el-dialog fullscreen :title="articleDialog.title" :visible.sync="articleDialog.visible" >
			{{articleDialog.form}}
  		<el-form  :model="articleDialog.form" size="mini" label-position="left">
	    	<el-form-item label="资讯标题" label-width="6em">
	      	<el-input v-model="articleDialog.form.title" autocomplete="off"></el-input>
	   		</el-form-item>

				<el-row>


					<el-col :span="12">
						<el-form-item label="列表样式" label-width="6em" >
	      	<ul class="list_style">
	      		<li class="style_one"  :class="{current:articleDialog.form.liststyle=='style_one'}" @click="articleDialog.form.liststyle='style_one'" >
	      			<img src="@/assets/style_one.jpg" alt="">
	      		</li>
	      		<li class="style_two" :class="{current:articleDialog.form.liststyle=='style_two'}"  @click="articleDialog.form.liststyle='style_two'">
	      			<img src="@/assets/style_two.jpg" alt="">
	      		</li>
	      	</ul>
	   		</el-form-item>
					</el-col>



					<el-col :span="12">
						<el-form-item label="资讯栏目" label-width="6em">
		      <el-select style='width:100%' v-model="articleDialog.form.categoryId" placeholder="一级栏目">
		        <el-option  :key='c.id' v-for='c in categories' :label='c.name' :value="c.id"></el-option>
		      </el-select>
	    	</el-form-item>
					</el-col>

					

				</el-row>

				<!-- http://119.23.50.171:8099/manager/file/upload -->
				<!-- http://120.78.164.247:8888 -->
				<el-form-item label="缩略图" label-width="6em" >
	      	<el-upload
	      		:on-remove='handleFileRemove'
					  :file-list='fileList'
						
					  action="http://120.78.164.247:8888/manager/file/upload"
					  :on-success='handleUploadSuccess'
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
	      	
	   		</el-form-item>

	    	<el-form-item label="资讯正文" label-width="6em" >
	      	<!-- <el-input v-model="articleDialog.form.content"type="textarea" :rows="6" >
	      	</el-input> -->
					<!-- ref属性即拿到所有的引用 -->
	      	<mavon-editor ref="articleContent" v-model="articleDialog.form.content"type="textarea"/>

	   		</el-form-item>

  		</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="mini" @click='closeArticleDialog'>取 消</el-button>
		    <el-button size="mini" type='primary' @click='saveOrUpdateArticle'>确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 模态框结束 -->
	</div>
</template>


<script>
	import axios from '@/http/axios';


	export default{
		data(){
			return {
				articles:[],
				multipleSelection:[],
				loading:false,
				categories:[],
				total:10,
				fileList:[],
				//可同时监听它们的变化，只要一个变化及触发。此处选择不同父栏目，出现不同父栏目下的文章
				params:{
					page:0,
					pageSize:7
					// categoryId:undefined,
					// keywords:undefined,
				},
				articleDialog:{
					title:'',
					visible:false,
					form:{
						liststyle:'style_one',
						fileIds:[]


					}
				},


				
				
			}
		},
		watch:{
			params:{
				handler:function(){
					this.findAllArticles();
				},
				deep:true
			}
		},
		created(){
			this.findAllArticles();
			this.findAllCategories();
		},
		methods:{
			handleFileRemove(file){
				//1.通过id删除附件
				axios.get('/manager/file/delete',{
					params:{id:file.name }
				})
				.then(()=>{
						this.$notify.success({
		          title: '成功',
		          message: '删除成功！'
		        });
			  		//2.从fileIds中挪出
			  		_.remove(this.articleDialog.form.fileIds,(id)=>{
			  			return id=file.name;
			  		})
			  		//采用lodash更新不了
			  		this.articleDialog.form.fileIds.push(1);
			  		this.articleDialog.form.fileIds.pop();

					})
				.catch(()=>{
					this.$notify.error({
          title: '错误',
          message: '删除失败!'
        	});
				})
			},


			//文件上传成功时的钩子。此处请求后台
			handleUploadSuccess(response,file,fileList){

				file.name=response.data.id;


				this.articleDialog.form.fileIds.push(response.data.id);


			},


			toAddArticle(){
				this.articleDialog.title='发布资讯';
				//再点击新增时清空模态框,即还原为初始值
				this.articleDialog.form={
					liststyle:'style_one',
						fileIds:[]
				};
				//重置附件列表
				this.fileList=[];

				this.articleDialog.visible=true;


			},

			//关闭文章模态框
			closeArticleDialog(){
				this.articleDialog.visible=false;
			},
			//$ref拿到所有的引用中的articleContent
			saveOrUpdateArticle(){
				//将html代码绑定放到form.source上
				this.articleDialog.form.source =this.$refs.articleContent.d_render; 



				//console.log(_.clone(this.$refs.articleContent));

				axios.post('/manager/article/saveOrUpdateArticle',this.articleDialog.form)
					.then(()=>{
						this.$notify.success({
		          title: '成功',
		          message: '提交成功！'
		        });
		        this.closeArticleDialog()
		        this.findAllArticles();
					})
				.catch(()=>{
					this.$notify.error({
          title: '错误',
          message: '提交失败!'
        	});
				})
			},



			handleCurrentChange(page){
				this.params.page=page-1;
			},


			//查询所有栏目
			findAllCategories(){
				axios.get('/manager/category/findAllCategory')
				.then(({data:result})=>{
					this.categories=result.data; 
				})
				.catch(()=>{
					this.$notify.error({
          title: '错误',
          message: '网络异常!'
        	});
				})
				
			},
			//查询所有文章
			findAllArticles(){
				this.loading=true;
				axios.get('/manager/article/findArticle',{
					params:this.params
					/*params:{
						page:this.page,
						pageSize:this.pageSize,
						categoryId:this.categoryId,
					}*/
				})
				.then(({data:result})=>{
					this.total=result.data.total;
					this.articles=result.data.list; 
				})
				.catch(()=>{
					this.$notify.error({
          title: '错误',
          message: '网络异常!'
        	});
				})
				.finally(()=>{
					this.loading=false;
				})
			},



			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			deleteArticle(id){

			},
			toUpdateArticle(row){
				//克隆row。克隆对象。对象从数组中删除一个元素api中无这些方法，所以引入lodash
				//1.删除article.category，添加categoryId
				let article=_.clone(row);
				article.categoryId=article.category.id;
				delete article.category;
				/*console.log(article);
				console.log(row);//想要的数据
				console.log(row==article);//false*/

				//4.删除前附件默认显示
				this.fileList=article.articleFileVMs.map((item)=>{
						return {
							name:item.cmsFile.id,
							url:'http://39.108.81.60:8888/group1/'+item.cmsFile.id
						}
				})
				
				//2.删除article.articleFileVMs，添加article.fileIds
				article.fileIds=article.articleFileVMs.map(item=>item.cmsFile.id);
				delete article.articleFileVMs;





				//3.删除属性值为null的属性
				for (let key in article){
					let val=article[key];
					if(!val){
						delete article[key];
					}
				}

				this.articleDialog.form=article;


				this.articleDialog.title='修改资讯 ';
				this.articleDialog.visible=true;

			},
		},
	}
</script>

<style>
	.btns{
		margin-bottom: .5em;
	}
	.fa{
		margin:0 .3em;
		cursor: pointer;
		}
		i.fa.fa-trash{
			color:#F56C6C;
		}

		.list_style{
			
		}

		.list_style >li{
			width: 200px;
			height: 80px;
			border: 1px solid #ededed;
			border-radius: 3px;
			padding:.5em; 
		}

		.list_style >li.current{
			border-color: #8abdf3;
		}

		.list_style >li img{
			width: 100%;
			height: 80px;

		}

		.list_style >li.style_one{
			float: left;
		}
		.list_style >li.style_two{
			margin-left: 220px;
		}


</style>