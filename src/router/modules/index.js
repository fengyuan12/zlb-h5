const baseRoutes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/index',
    component: resolve => require(['@/layout/index'], resolve),
    children: [
      {
        path: '/index',
        name: 'index',
        component: resolve => require(['@/views/index/index'], resolve)
      },
      {
        path: '/info',
        name: 'info',
        meta: {
          keepAlive: true
        },
        component: resolve => require(['@/views/info/index'], resolve)
      },
      {
        path: '/mine',
        name: 'mine',
        component: resolve => require(['@/views/mine/index'], resolve)
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          keepAlive: true
        },
        component: resolve => require(['@/views/list/index'], resolve)
      },
      {
        path: '/list/correction',
        name: 'list_correction',
        component: resolve => require(['@/views/correction/index'], resolve)
      },
      {
        path: '/list/score',
        name: 'list_score',
        component: resolve => require(['@/views/score/index'], resolve)
      },
      {
        path: '/problemfound',
        name: 'problemfound',
        component: resolve => require(['@/views/problemfound/index'], resolve)
      },
      {
        path: '/afterrectification',
        name: 'afterrectification',
        component: resolve => require(['@/views/afterrectification/index'], resolve)
      },
      {
        path: '/rectification',
        name: 'rectification',
        component: resolve => require(['@/views/rectification/index'], resolve)
      }
    ]
  }
]

export default baseRoutes
