<template>
  <Button
    class="select-directory"
    @click.stop="onFolderClick"
  >
    <Icon type="md-folder" size="10" />
  </Button>
</template>

<script>
  export default {
    name: 'mo-select-directory',
    props: {
    },
    created() {
        console.log('Select directory component')
    },
    methods: {
      onFolderClick: function () {
        const self = this
        this.$electron.remote.dialog.showOpenDialog({
          properties: ['openDirectory', 'createDirectory']
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
