<template>
  <div>
      <Card >
                <p slot="title">
                    <Icon type="ios-build"></Icon>
                    <Span>Config page</Span>
                </p>
                <Form ref="form" :model="form" :label-width="200" :rules="formRules">
                    <FormItem label="Host name" prop="host">
                        <Input v-model="form.host" placeholder="Enter docker engine host..."></Input>
                    </FormItem>
                    <FormItem label="Port" prop="port">
                        <Input v-model.number="form.port" placeholder="Enter docker engine port..."></Input>
                    </FormItem>
                     <FormItem label="CA path" prop="ca">
                       <Input v-model="form.ca" placeholder="Select CA cert file...">
                        <mo-select-file
                            slot="append"
                            @selected="onDirectorySelected('ca',...arguments)"
                        />
                       </Input>
                    </FormItem>
                     <FormItem label="Client cert path" prop="cert">
                        <Input v-model="form.cert" placeholder="Select Key cert file...">
                          <mo-select-file
                              slot="append"
                              @selected="onDirectorySelected('cert',...arguments)"
                          />
                        </Input>
                    </FormItem>
                     <FormItem label="Client key path" prop="key">
                          <Input v-model="form.key" placeholder="Select Key cert file...">
                          <mo-select-file
                              slot="append"
                              @selected="onDirectorySelected('key',...arguments)"
                          />
                          </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit">Save</Button>
                        <Button style="margin-left: 8px" @click="handleReset">Reset</Button>
                    </FormItem>
                </Form>
      </Card>
  </div>
</template>

<script>
  import SelectFile from '@/components/Native/SelectFile'
  export default {
    name: 'setting-conf',
    components: {
        [SelectFile.name]: SelectFile,
    },
    props: {

    },
    data () {
      return {
        form: {
          host: this.$store.state.preference.config.host,
          port: this.$store.state.preference.config.port,
          ca: this.$store.state.preference.config.ca,
          cert: this.$store.state.preference.config.cert,
          key: this.$store.state.preference.config.key
        },
        formRules: {
          host:[{required: true, message: 'Please input host', trigger: 'blur'}],
          port:[{
            type: 'integer', message:'Wrong port', trigger: 'blur'
          }],
          ca:[{required: true, message: 'Please select one factory', trigger: 'blur'}],
          cert:[{required: true, message: 'Please select one factory', trigger: 'blur'}],
          key:[{required: true, message: 'Please select one factory', trigger: 'blur'}],
        },
      }
    },
    methods: {

      handleSubmit(){
        this.$refs['form'].validate((valid) => {
            if (valid) {
              // keep the config into the store and flush to localstorage
              this.$store.dispatch('preference/save',{...this.form})
              this.$Message.success('Success')
            } else {
                this.$Message.error('Validation Failed!')
            }
        })
      },

      handleReset(){
          this.form.host= this.$store.state.preference.config.host,
          this.form.port= this.$store.state.preference.config.port,
          this.form.ca=this.$store.state.preference.config.ca,
          this.form.cert= this.$store.state.preference.config.cert,
          this.form.key= this.$store.state.preference.config.key
      },

      onDirectorySelected (type, dir) {
        switch (type) {
          case 'ca':
            this.form.ca = dir
            break
          case 'cert':
            this.form.cert = dir
            break
          case 'key':
            this.form.key = dir
            break
        }
      },


    },
    created () {
    }
  }
</script>

<style scoped>
  .status-bar {
    border-style: solid;
    border-width: thin;
    border-color: #d7dde4;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 0px 0px;
    height: 27px;
    /*max-height: 50px;*/
    /*max-width: 800px;*/
    background: rgba(255, 255, 255, 1);
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
