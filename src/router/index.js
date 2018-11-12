import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Category from '@/pages/Category'
import Article from '@/pages/Article'
import User from '@/pages/User'
import Exam from '@/pages/Exam'
import ExamCreate from '@/pages/exam/ExamCreate'
import ExamPlace from '@/pages/exam/ExamPlace'

import Department from '@/pages/Department'
import Info from '@/pages/Info'
import Foo from '@/pages/Foo'




Vue.use(Router)
// 乐高	7 scrath

export default new Router({
  routes: [
    {
      path: '/foo/:id',
      component: Foo,
      props:true
    },
    {
      path: '/department',
      component: Department
    },

    {
      path: '/info',
      //name:'info',
      component:Info
    },
   
    {
      path: '/',
       component: HelloWorld,
      //redirect:'info',
      //redirect:{name:'info'}

     
    },{
      path: '/category',
      component: Category
    },{
      path: '/article',
      component: Article
    },{
      path: '/user',
      component: User
    },{
      path: '/exam',
      component: Exam,
      children:[{
        path: 'create', /*  路由  /exam/create */
        component: ExamCreate,
      },{
        path: 'place',  /*  路由  /exam/place */
        component: ExamPlace,
      }]
    }
  ]
})







