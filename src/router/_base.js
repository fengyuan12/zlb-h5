// import api from '../api' // 导入api接口
const baseRoutes = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/login/index'], resolve)
  }
]
/*
* 自动按模块去引入modules文件夹底下的路由
* */
const files = require.context('./modules', false, /\.js$/)
const modules = []
files.keys().forEach(key => {
  const routes = files(key).default || files(key)
  modules.push(...routes)
})

const routes = baseRoutes.concat(modules)

export default routes
