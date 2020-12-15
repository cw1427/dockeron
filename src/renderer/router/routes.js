import * as Route from '../js/constants/RouteConstants'
import Main from '@/components/HomePageView'

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
        path: Route.DEFAULT_VIEW_PATH,
        name: Route.DEFAULT_VIEW_NAME,
        meta: {
          icon: 'ios-cube',
          title: 'Containers',
        },
        component: () => import('@/components/ContainersView/ContainersView')
      },
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
    name: 'image',
    meta: {
        title: 'Image',
        icon: 'ios-apps'
    },
    redirect: {'name':Route.IMAGES_VIEW_NAME},
    component: Main,
    children: [
      {
        path: Route.IMAGES_VIEW_PATH,
        name: Route.IMAGES_VIEW_NAME,
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
