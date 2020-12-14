<template>
  <div class="layout">
    <div class="layout-menu">
      <side-menu accordion :active-name="$route.name" collapsed="false" @on-select="turnToPage" :menu-list="menuList">
      </side-menu>
      <!--
      <Menu mode="horizontal" active-name="menu-containers" @on-select="onMenuSelect">
        <Menu-item name="menu-containers">
          <Icon type="cube"></Icon>Containers
        </Menu-item>
        <Menu-item name="menu-images">
          <Icon type="beer"></Icon>Images
        </Menu-item>
        <Menu-item name="menu-volumes">
          <Icon type="help-buoy"></Icon>Volumes
        </Menu-item>
        <Menu-item name="menu-networks">
          <Icon type="link"></Icon>Networks
        </Menu-item>
        <Menu-item name="menu-plugins">
          <Icon type="gear-b"></Icon>Plugins
        </Menu-item>
        <Menu-item name="menu-docker-hub">
          <Icon type="stats-bars"></Icon>Docker Hub
        </Menu-item>
        <Submenu name="menu-settings">
          <template slot="title">
            <Icon type="settings"></Icon>
            Settings
          </template>
          <Menu-item name="menu-settings-info">
            <Icon type="chatbubble-working"></Icon>
            Info
          </Menu-item>
          <Menu-item name="menu-settings-version">
            <Icon type="pricetag"></Icon>
            Version
          </Menu-item>
          <Menu-item name="menu-settings-ping">
            <Icon type="wifi"></Icon>
            Ping
          </Menu-item>
          <Menu-item name="menu-settings-config">
            <Icon type="edit"></Icon>
            Config
          </Menu-item>
        </Submenu>
      </Menu>
      -->
    </div>
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <div class="layout-copy">
      &copy; dockeron, 2020
    </div>
    <status-bar></status-bar>
  </div>
</template>

<script>
  import TreeView from './TreeView/TreeView'
  import StatusBar from './StatusBar'
  import SideMenu from './SideMenu'
  import docker from '../js/docker'
  import notify from '../js/notify'
  import * as Route from '../js/constants/RouteConstants'
  import {
    VUEX_ACTION_PUSH_EVENT,
    VUEX_ACTION_UPDATE_INFO,
    VUEX_ACTION_UPDATE_VERSION
  } from '../js/constants/VuexConstants'

  export default {
    name: 'home-page',
    components: {
      TreeView,
      StatusBar,
      SideMenu
    },
    data () {
      return {
        info: {},
        version: {},
        ping: '',
      }
    },
    methods: {

      loadPing () {
        const updateNetwork = ping => {
          this.ping = ping
        }

        docker.ping()
          .then(updateNetwork)
          .catch(notify)
      },
      handleClick (item) {
        this.turnToPage(item.name)
      },
      turnToPage (name) {
        this.$router.push({
          name: name
        })
      },

    },
    created () {

      this.loadPing()

      docker.getEvents()
        .then(events => {
          events.setEncoding('utf8')

          events.on('data', data => {
            this.$store.dispatch(VUEX_ACTION_PUSH_EVENT, data)
          })
        })
        .catch(notify)
    },
    computed: {
       menuList () {
          return this.$store.getters.menuList
      },
    }


  }
</script>

<style scoped>
  .layout {
    height: 100%;
    position: relative;
    overflow: auto;
    ::-webkit-scrollbar {display:none;}
  }

  .layout-menu {
    -webkit-app-region: drag;
  }

  .ivu-menu {
    margin-top: 5px;
    height: 55px;
  }

  .layout-content {
    min-height: 200px;
    overflow: auto;
    ::-webkit-scrollbar {display:none;}
    max-height: 100vh;
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  a {
    color: inherit;
  }

  @media (max-width: 850px) {
    .ivu-menu {
      display: inline-table;
    }
  }

</style>
