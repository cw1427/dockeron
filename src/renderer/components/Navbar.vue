<template>
    <div class="navbar">
        <Row>
            <Col span="4">
            <div class="header-inner">
               <!-- <h1><a >Dockeron<span></span></a></h1> -->
               <img :src="minLogo" width="160" height="50"/>
            </div>
            </Col>
            <Col span="6">
            <span class="heading_span">My docker engines</span>
            </Col>
             <Col span="13">
             <div class="user-avator-dropdown">
                <Dropdown>
                <Icon :size="25" type="md-more"></Icon>
                <DropdownMenu slot="list">
                    <DropdownItem name="profile">profile</DropdownItem>
                    <DropdownItem name="logout">logout</DropdownItem>
                </DropdownMenu>
                </Dropdown>
             </div>
            </Col>

        </Row>
    </div>
</template>

<script>
  import minLogo from '@/assets/img/logo.jpg'
export default {
  components: {

  },
  data() {
    return {
        minLogo,
    }
  },
  computed: {

  },
  methods: {

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
  width: 100%;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -ms-border-radius: 6px;
  border-radius: 6px;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgb(235, 235, 235);

}

.user-avator-dropdown{
   float: right;
}

</style>
