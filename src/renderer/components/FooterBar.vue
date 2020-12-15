<template>
  <div class="status-bar">
    <span>Company &copy; 2020 Com,Inc. All Rights reserved. version:{{version}}</span>
  </div>
</template>

<script>
const { version } = require('@/../../package.json')
  export default {
    name: 'footer-bar',
    props: {

    },
    data () {
      return {
        version: `${version}`
      }
    },
    methods: {

    },
    created () {
    }
  }
</script>

<style scoped>
  .status-bar {
    text-align: center;
    border-style: solid;
    border-width: thin;
    border-color: #363636;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 0px 0px;
    height: 27px;
    /*max-height: 50px;*/
    /*max-width: 800px;*/
    background: rgba(255, 255, 255, 1);
    background-color: #363636;
    color: #657180;
    white-space: normal;
    /*overflow: auto;*/
    z-index: 1;
    /*resize: vertical;*/
    transition: height 1s;
  }

  /*.status-bar:hover {
    height: 20%;
  }*/

  .status-item {
    float: right;
    /*margin-right: 3px;*/
  }

  .refresh-button {
    position: absolute;
    right: 0px;
    /*top: 2px;*/
  }
</style>
