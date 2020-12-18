import * as Route from '../js/constants/RouteConstants'
import Main from '@/components/HomePageView'
import EngineLayout from '@/components/EngineView/SingleEngineLayout'

export default [
  {
    path: "/",
    name: 'dashboard',
    component: ()=> import('@/components/Dashboard'),
    redirect: 'engines',
    children:[
      {
        path: '/engines',
        name: 'engines',
        component: () => import('@/components/EngineView/Engines')
      },
    ]
  },
  {
    path: '/engine/:name',
    name:'engine',
    meta: {
       title: 'Containers',
       icon: 'ios-home'
    },
    component: EngineLayout,
    children: [
      {
        path: '',
        name: 'engine',
        meta: {
          icon: 'ios-cube',
          title: 'Containers',
          hideInMenu: true,
        },
        component: () => import('@/components/ContainersView/ContainersView')
      },
      {
        path: '/container',
        name: 'container',
        meta: {
          icon: 'md-construct',
          title: 'Single',
          hideInMenu: true,
        },
        component: () => import('@/components/ContainersView/SingleContainerView')
      },
    ]
  },
  {
    path: '/image',
    name: 'image',
    meta: {
        title: 'Image',
        icon: 'ios-apps'
    },
    component: EngineLayout,
    children: [
      {
        path: '',
        name: 'image',
        meta: {
          hideInMenu: true,
        },
        component: () => import('@/components/ImagesView/ImagesView')
      },
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
        title: 'Setting',
        icon: 'ios-build'
    },
    component: EngineLayout,
    children: [
      {
        path: Route.SETTINGS_CONFIG_PATH,
        name: Route.SETTINGS_CONFIG_NAME,
        meta: {
          icon: 'md-construct',
          title: 'Config',
        },
        component: () => import('@/components/SettingConfigView')
      },
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
