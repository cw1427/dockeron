<template>
    <div class="main-container">
      <engine-navbar/>
      <Layout style="height: 100%">
          <Sider :width="172" class="sider" style="background:#FFFFFF" >
          <side-menu :active-name="$route.name" collapsed="false" @on-select="turnToPage" :menu-list="menuList">
          </side-menu>
          </Sider>
          <Layout id="main">
            <Content>
              <transition name="fade" mode="out-in">
                <!-- <router-view :key="key"></router-view> -->
                <router-view :key="$route.fullPath"></router-view>
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
  import {createDockerEngine} from '@/js/docker'
  import notify from '@/js/notify'

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
        docker:null
      }
    },
    methods: {
      loadPing () {
        const updateNetwork = ping => {
          this.ping = ping
        }

        this.docker.ping()
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
      }

    },
    created () {
      console.log(`----Container Layout created ${this.$route.params.name}`)
       if (_.isNil(this.$route.params.name)){
         //----coming from same app goes to use store
         this.$route.params.name = this.$store.state.preference.engine
       }else{
         this.$store.dispatch('preference/updateSelectedEngine', this.$route.params.name)
       }
       let docker = createDockerEngine(this.$route.params.name)
       this.$store.dispatch('preference/updateEngineInstance', docker)
       this.docker = docker
       // keep the docker engine instance in the store
       this.loadPing()
      // this.docker.getEvents().then(events => {
      //     events.setEncoding('utf8')
      //     events.on('data', data => {
      //       this.$store.dispatch(VUEX_ACTION_PUSH_EVENT, data)
      //     })
      // }).catch(notify)
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
