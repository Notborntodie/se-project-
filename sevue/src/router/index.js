import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import ArticleMana from '@/components/ArticleMana'
import CateMana from '@/components/CateMana'
import DataCharts from '@/components/DataCharts'
import PostArticle from '@/components/PostArticle'
import UserMana from '@/components/UserMana'
import BlogDetail from '@/components/BlogDetail'
import LayoutView from '@/Layout/LayoutView'
import UnloginArticleList from '@/components/UnloginArticleList'
import HomePage from '@/components/HomePage'
import Profile from '@/components/Profile'
import Register from '@/components/Register'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login, 
  }
  ,
    {
      path: '/index',
      //name: '未登录首页',
      component: LayoutView,
      children:[
        {
          path: '',
          name: '未登录首页2',
          component: HomePage,
        },
        {
          path: 'articleList/:keywords',
          name: '未登录文章1',
          component: UnloginArticleList
        },
        {
          path: 'articleList',
          name: '未登录文章2',
          component: UnloginArticleList
        },
        {
          path: 'blogDetail',
          name: '未登录文章3',
          component: BlogDetail
        },
      ]
    },
   
    {
      path: '/login',
      name: '登录',
      // hidden: true,
      component: Login
    },

    {
      path: '/register',
      name: '注册',
      // hidden: true,
      component: Register
    }
  ,
    {
      path: '/home',
      component: Home,
      //name: '首页',
      // redirect: '/home/articleList',
      children: [
        {
          path: '/',
          name: '中心',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/articleList',
          name: '文章列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        },

        {
          path:'/articleMana',
          name:'文章管理',
          component:ArticleMana,
          meta:{ 
            keepAlive:true
          }
        }
        ,
        {
          path: '/postArticle',
          name: '发表文章',
          component: PostArticle,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/blogDetail',
          name: '博客详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/editBlog',
          name: '编辑博客',
          component: PostArticle,
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/user',
          name: '用户管理',
          component: UserMana,
          meta: {
            iconCls: 'fa fa-user-o'
          }
        },
        {
          path: '/cateMana',
          name: '栏目管理',
          component: CateMana,
          meta: {
            iconCls: 'fa fa-reorder'
          }
        },
        {
          path: '/charts',
          name: '数据统计',
          component: DataCharts,
          meta: {
            iconCls: 'fa fa-bar-chart'
          }
        }
        ,{
          path: '/profile',
          name: '个人中心',
          component: Profile,
          meta:{ 
            keepAlive:true
          }
        }
      ]
    }
  ]
});
