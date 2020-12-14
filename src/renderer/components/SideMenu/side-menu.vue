<template>
  <div class="side-menu-wrapper">
    <Menu mode="horizontal" ref="menu" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="`${item.children[0].name}`" :key="`menu-${item.children[0].name}`"><Icon :type="item.children[0].meta.icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="`${item.name}`" :key="`menu-${item.name}`"><Icon :type="item.meta.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import { getUnion } from '@/js/util'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem,
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    theme: {
      type: String,
      default: 'light'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: {
      type: Boolean,
      default: true
    },
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        // horizon menu no need to open the actived menu.
        //this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
