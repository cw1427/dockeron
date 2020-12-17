<template>
  <div class="custom-bread-crumb1">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
        <Icon style="margin-right: 4px;" :type="item.icon || ''"/>
        {{ showTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import { showTitle } from '@/js/util'
import './breadCrumb.less'
export default {
  name: 'BreadCrumb',
  components: {

  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
  }
}
</script>
