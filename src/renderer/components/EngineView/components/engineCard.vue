<template>
    <Card style="" :to="toRoute">
        <p slot="title">
            <Row type="flex" align="middle" :gutter="10">
                    <Row>
                        <Col><b class="user-card-infor-name">{{engine.name}}</b></Col>
                    </Row>
            </Row>
        </p>
        <a href="#" slot="extra" @click.prevent="gotoProfile">
            <Icon type="person"></Icon>
            Modify
        </a>

        <div class="profile-user-info profile-user-info-striped">
            <div class="profile-info-row ">
                <div class="profile-info-name">Address</div>
                <div class="profile-info-value ">{{engine.host}}:{{engine.port}}</div>
            </div>
             <div class="profile-info-row ">
                <div class="profile-info-name">CA path</div>
                <div class="profile-info-value ">
                    {{engine.ca}}
                </div>
            </div>
            <div class="profile-info-row ">
                <div class="profile-info-name">Cert path</div>
                <div class="profile-info-value ">{{engine.cert}}</div>
            </div>
            <div class="profile-info-row ">
                <div class="profile-info-name">Key path</div>
                <div class="profile-info-value ">{{engine.key}}</div>
            </div>
        </div>
    </Card>

</template>

<script>
import './engineCard.less'
export default {
  name: 'EngineCard',
  props:['engine'],
  data () {
    return {

    }
  },
  methods: {
      gotoProfile() {
        this.$router.push('profile')
    },
  },
  computed: {
      toRoute(){
         return `/engine/${this.engine.name}`
      }
  }
}
</script>

<style>

</style>
