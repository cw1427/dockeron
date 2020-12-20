<template>
    <a @click="handleEngineTo">
    <Card style="">
        <p slot="title">
            <Row type="flex" align="middle" :gutter="10">
                    <Row>
                        <Col><b class="user-card-infor-name">{{engine.name}}</b></Col>
                    </Row>
            </Row>
        </p>
        <div slot="extra" @click.stop="">
            <Poptip :transfer="true" :confirm="true" title="Confirm delete?" content="Please confirm"  @on-ok="handleDelete(engine.name)">
                <a >
                    <Icon type="ios-trash"></Icon>
                    Delete
                </a>
            </Poptip>
        </div>

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
    </a>

</template>

<script>
import './engineCard.less'
import _ from 'lodash'
export default {
  name: 'EngineCard',
  props:['engine'],
  data () {
    return {

    }
  },
  methods: {
    handleDelete(name) {
        // remove the engines list config
        let engineHash = _.cloneDeep(this.$store.state.preference.engines)
        if (_.isNil(engineHash)){
            return true
        }
        if (_.has(engineHash,name)){
            engineHash = _.omit(engineHash,[name])
        }else{
            this.$Message.error('Wrong engine name')
            return false
        }
        this.$store.dispatch('preference/saveEngines', engineHash)
        this.$Message.success('Success')
    },
    handleEngineTo(){
        this.$router.push(this.toRoute)
    }

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
