<template>
    <div class="main-container">
      <engine-navbar/>
      <Layout style="height: 100%" class="main">
          <Sider :width="210" class="sider" style="background:#FFFFFF" >
          <side-menu accordion :active-name="$route.name" collapsed="false" @on-select="turnToPage" :menu-list="menuList">
          </side-menu>
          </Sider>
          <Layout id="main">
            <Content>
            <transition name="fade" mode="out-in">
              <!-- <router-view :key="key"></router-view> -->
              <router-view></router-view>
            </transition>
            <status-bar></status-bar>
            </Content>
          </Layout>
          <footer-bar></footer-bar>
      </Layout>
    </div>
</template>

<script>

  import SelectFile from '@/components/Native/SelectFile'
  import StatusBar from '@/components/StatusBar'
  import SideMenu from '@/components/SideMenu'
  import FooterBar from '@/components/FooterBar'
  import EngineNavbar from './EngineNavbar'
  import _ from 'lodash'

  export default {
    name: 'engines',
    components: {
        StatusBar,
        FooterBar,
        EngineNavbar,
        SideMenu
    },
    data () {
      return {

      }
    },
    methods: {

    },
    created () {
    },
    computed: {
       menuList () {
          return this.$store.getters.menuList
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.main-container{
    height: 100%;
}

.sider {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgb(235, 235, 235);

}
</style>
