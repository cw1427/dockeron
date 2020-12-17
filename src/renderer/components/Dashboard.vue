<template>
 <div class="main-container">
        <navbar></navbar>
        <transition name="fade" mode="out-in">
          <!-- <router-view :key="key"></router-view> -->
          <router-view></router-view>
        </transition>
        <footer-bar></footer-bar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FooterBar from '@/components/FooterBar'
const { version } = require('@/../../package.json')

export default {
  name: 'layout',
  components: {
    Navbar,
    FooterBar
  },
  data() {
    return {
      version: `${version}`
    }
  },
  computed: {


  },

}
</script>

<style rel="stylesheet/scss" lang="scss">
.main-container{
    height: 100%;
}
</style>
