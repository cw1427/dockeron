import * as Route from '../js/constants/RouteConstants'
import Main from '@/components/HomePageView'
import EngineLayout from '@/components/EngineView/SingleEngineLayout'

export default [
  {
    path: "/dashboard",
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
    path: '/engine',
    meta: {
        title: 'engine',
        icon: 'ios-build',
        hideInMenu: true
    },
    component: EngineLayout,
    children: [
      {
        path: '',
        name: 'engine',
        meta: {
          icon: 'ios-cube',
          title: 'Containers',
        },
        component: () => import('@/components/ContainersView/ContainersView')
      },
    ]
  },
  {
    path: '/containers',
    name: 'containers',
    meta: {
        title: 'HomePage',
        icon: 'ios-home'
    },
    redirect: Route.CONTAINERS_VIEW_PATH,
    component: Main,
    children: [
      {
        path: Route.CONTAINERS_VIEW_PATH,
        name: Route.CONTAINERS_VIEW_NAME,
        component: () => import('@/components/ContainersView/ContainersView')
      },
      {
        path: Route.SINGLE_CONTAINER_VIEW_PATH,
        name: Route.SINGLE_CONTAINER_VIEW_NAME,
        meta: {
          icon: 'md-construct',
          title: 'Single',
          hide: true,
          hideInMenu: true,
        },
        component: () => import('@/components/ContainersView/SingleContainerView')
      },

    ]
  },
  {
    path: '/image',
    meta: {
        title: 'Image',
        icon: 'ios-apps'
    },
    component: Main,
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
    component: Main,
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
    redirect: '/dashboard'
  }
]
