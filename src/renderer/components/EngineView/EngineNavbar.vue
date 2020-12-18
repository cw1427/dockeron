<template>
    <div class="navbar">
          <div class="header-inner">
           <img :src="minLogo" width="160" height="50"/>
          </div>
        <Row>
            <Col span="3">
            <div class="header-inner">
                <Select v-model="projectSelect" style="width:100px">
                    <Option value="All" key="All">All</Option>
                </Select>
            </div>
            </Col>
            <Col span="4">
                <bread-crumb :list="breadCrumbList"></bread-crumb>
            </Col>
             <Col span="13">
             <div class="user-avator-dropdown">
                <Dropdown>
                <Icon :size="25" type="md-more"></Icon>
                <DropdownMenu slot="list">
                    <DropdownItem name="profile">Config</DropdownItem>
                    <DropdownItem name="logout">About</DropdownItem>
                </DropdownMenu>
                </Dropdown>
             </div>
            </Col>

        </Row>
    </div>
</template>

<script>
  import minLogo from '@/assets/img/logo.jpg'
  import BreadCrumb from './components/BreadCrumb'
  import { mapMutations } from 'vuex'
export default {
  components: {
     BreadCrumb
  },
  data() {
    return {
        minLogo,
        projectSelect:[]
    }
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.preference.breadCrumbList
    }
  },
   mounted () {
      this.UPDATE_BREAD_CRUMB(this.$route.matched)
  },
  methods: {
      ...mapMutations('preference',[
        'UPDATE_BREAD_CRUMB',
      ]),
  },
  watch: {
      '$route' (newRoute) {
        this.UPDATE_BREAD_CRUMB(newRoute.matched)
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  padding-top: 30px;
  line-height: 50px;
    border-radius: 0px !important;
    border: solid 1px #ebebeb;
    border-top-color: rgb(235, 235, 235);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(235, 235, 235);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(235, 235, 235);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(235, 235, 235);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
}



.heading_span {
    font-size: 18px;
    font-weight: bold;
    color: #00123a;
    margin-left: 30px;
    margin-top: 14px;
}

.header-inner {
  height: 50px;
  float: left;

  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -ms-border-radius: 6px;
  border-radius: 6px;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgb(235, 235, 235);
  text-align: center;
  padding-right: 5px;
  padding-left: 5px;

}

.user-avator-dropdown{
   float: right;
}

</style>
