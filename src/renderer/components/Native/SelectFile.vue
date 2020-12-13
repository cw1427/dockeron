<template>
  <Button
    class="select-directory"
    @click.stop="onFolderClick"
  >
    <Icon type="ios-folder" size="15" />
  </Button>
</template>

<script>
  export default {
    name: 'mo-select-file',
    props: {
    },
    created() {
    },
    methods: {
      onFolderClick: function () {
        const self = this
        this.$electron.remote.dialog.showOpenDialog({
          properties: ['openFile', 'createFile']
        }).then(({ canceled, filePaths }) => {
          if (canceled || filePaths.length === 0) {
            return
          }

          const [path] = filePaths
          self.$emit('selected', path)
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
