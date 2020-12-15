<template>
  <div style="background-color: #f9fbfe;height:100%">
   <Row style="height:5%">
   </Row>
   <Row>
       <Col span='23' offset="1">
            <Button type="primary" icon="refresh" @click="addShow()">Add docker engine</Button>

            <br>
            <div v-if="hasEngines">
                <Card v-for="container in addedEngines" :key="container.Id" class="container-card">

                </Card>
            </div>
            <div v-else>
            <pre>Try to add one docker engine</pre>
            </div>
        </Col>
    </Row>

 <Modal v-model="showAdd"
          title="Add a new Docker engine"
          :mask-closable="false"
          :draggable="false" :width="800">
            <Form ref="form" :model="form" :label-width="200" :rules="formRules">
                    <FormItem label="Engine name" prop="name">
                        <Input v-model="form.name" placeholder="Enter engine name..."></Input>
                    </FormItem>
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
            </Form>
          <div slot="footer">
              <Button type="primary" @click="handleSubmit">Submit</Button>
              <Button @click="showAdd=false">Cancel</Button>
          </div>
  </Modal>

  </div>
</template>

<script>

  import docker from '@/js/docker'
  import SelectFile from '@/components/Native/SelectFile'
  import _ from 'lodash'

  export default {
    name: 'engines',
    components: {
        [SelectFile.name]: SelectFile,
    },
    data () {
      return {
        engines: {},
        hasEngines:false,
        showAdd:false,
        form: {
          name: null,
          host: this.$store.state.preference.config.host,
          port: this.$store.state.preference.config.port,
          ca: this.$store.state.preference.config.ca,
          cert: this.$store.state.preference.config.cert,
          key: this.$store.state.preference.config.key
        },
        formRules: {
          name:[{required: true, message: 'Please input a unique engine name', trigger: 'blur'}],
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
    watch: {

    },
    methods: {

      loadEngines () {
      },

      handleSubmit(){
        this.$refs['form'].validate((valid) => {
            if (valid) {
              // check localstorage engines config to add this new one
              let engineHash = this.$store.state.preference.engines
              if (_.isNil(engineHash)){
                  engineHash = {}
              }
              if (_.has(engineHash,this.form.name)){
                this.$Message.error('Duplicate engine name')
              }else{
                  engineHash[this.form.name] = this.form
              }

              this.$store.dispatch('preference/saveEngines', engineHash)
              this.$Message.success('Success')
            } else {
                this.$Message.error('Validation Failed!')
            }
            this.addShow = false
        })
      },

      handleReset(){
          this.form.host= this.$store.state.preference.config.host,
          this.form.port= this.$store.state.preference.config.port,
          this.form.ca=this.$store.state.preference.config.ca,
          this.form.cert= this.$store.state.preference.config.cert,
          this.form.key= this.$store.state.preference.config.key
          this.$refs['form'].resetFields();
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

      addShow(){
        this.handleReset()
        this.showAdd = true
      },

    },
    created () {
      this.$store.watch(state => state.preference.engines, newEngines => {
        this.engines = newEngines
      })
      this.loadEngines()
    },
    watch: {
        hasEngines () {
            return  (!_.isNil(this.engines)) && this.engines.size>0
        },
        addedEngine() {
            return this.engines.values()
        }
    }
  }
</script>

<style scoped>
  .container-card {
    width: 300px;
    display: inline-block;
    margin: 5px 5px;
  }

  .container-card-title {
    height: 26px;
  }

  .container-state-tag {
    position: absolute;
    right: 3px;
  }

  .control-panel {
    display: inline-block;
  }
</style>
