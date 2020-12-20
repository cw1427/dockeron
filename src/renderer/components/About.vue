<template>
  <div class="">
  <Row>
    <Col :span="24" style="height:50px"></Col>
  </Row>
  <Row>
    <Col :span="16" :offset="4">
        <Card >
          <div slot="title">
            <span>Eleva v{{version}}</span>
          </div>
          <div slot="extra">
            <a @click="checkUpdate">Check for update</a>
          </div>
          <label>Release note:</label>
          <ul>
            <li>v0.3.0 add docker engines list feature</li>
          </ul>

        </Card>
    </Col>
  </Row>
  </div>
</template>

<script>
import is from 'electron-is'
import { mapGetters } from 'vuex'
const { version } = require('@/../../package.json')

export default {
  name: 'conf',
  components: {

  },
  data() {
    return {
      version: `${version}`
    }
  },
  computed: {
    isRenderer () { return is.renderer() },
    isMas () { return is.mas() },
  },
  methods:{
    handleCancel (formName) {

     },

    checkUpdate(){
       this.$Message.success('Start checking...')
       this.$electron.ipcRenderer.send('command', 'application:check-for-updates')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
