<template>
  <div>
    <Form ref="vueJsonForm" :model="value" :label-width="labelWidth">
      <json-node v-model="value" :prop="name"></json-node>
    </Form>
  </div>
</template>

<script>
  import JsonNode from './JsonNode'

  export default {
    components: {
      JsonNode
    },
    props:[
      'labelWidth',
      'name',
      'value'
    ],
    methods: {
      clear () {
        this.$emit('input', {})
      }
    }
  }
</script>

<style scoped>

</style>
