<template>
 <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
        <footer-bar></footer-bar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FooterBar from '@/components/FooterBar'
import AppMain from '@/components/AppMain'
const { version } = require('@/../../package.json')

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
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
