<template>
  <div id="app" class="app">
        <mo-title-bar
          v-if="isRenderer"
        />
        <router-view></router-view>
  </div>
</template>

<script>
  import is from 'electron-is'
  import TitleBar from '@/components/Native/TitleBar'
  export default {
    name: 'App',
    components: {
      [TitleBar.name]: TitleBar,
    },
    computed: {
      isRenderer () { return is.renderer() },
    },

  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  .app {
    height: 100%;
    overflow: hidden;
    ::-webkit-scrollbar {display:none;}
  }
  //main-container全局样式
.app-main{
  min-height: 100%;
  height: 768px;
}

.app-container {
  padding-left: 0px;
}

</style>
