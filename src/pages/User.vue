<template>
  <div class="app">
    {{multipleSelection}}
    <el-button type='danger'>hello</el-button>
    <el-button type='danger' @click='batchDelete'>批量删除</el-button>
    <el-table :data="users" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope='{row}'>
          <el-button type="text" @click="deleteUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    methods:{
      batchDelete(){
        let ids = this.multipleSelection.map((item)=>{
          return item.id;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteUser(id){
        axios({
          baseURL:'http://120.78.164.247:9999',
          url:'/user/deleteById?id='+id,
          method:'get'
        }).then((result)=>{
          if(result.data.stauts == 200){
            this.$notify({
              title: '成功',
              message: result.data.message,
              type: 'success'
            });
            //刷新
            this.loadAllUsers();
          }
        }).catch((error)=>{
          console.log(error);
        });
      },
      loadAllUsers(){
        axios({
          baseURL:'http://120.78.164.247:9999',
          url:'/user/findAll',
          method:'get'
        }).then((result)=>{
          this.users = result.data.data;
        }).catch((error)=>{
          console.log(error);
        });
      },
    },
    created(){
      this.loadAllUsers();
    },
    data(){
      return {
        users:[],
        multipleSelection:[]
      }
    }
  }
</script>