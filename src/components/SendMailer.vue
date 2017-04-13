<template>
  <div class="hello">
    <!-- START BREADCRUMB -->
    <ul class="breadcrumb" style="text-align:left;">
      <li><a href="#">主页</a></li>
      <li><a href="#">管理员</a></li>
      <li class="active">邮件样式</li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- PAGE CONTENT WRAPPER -->
    <div class="page-content-wrap">

      <div class="row">
        <div class="col-md-12">

          <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><strong>邮件样式</strong> 设置</h3>
                <ul class="panel-controls">
                  <li><a href="#" class="panel-remove"><span class="fa fa-times"></span></a></li>
                </ul>
              </div>
              <div class="panel-body">
                <p style="text-align:left;">这个是管理员对邮件发送样式的设置，包括：1.管理员注册成功后，将发送注册成功后的提示邮件给相应邮箱的人。2.在用户设置的预警数值被超越后，将会发送相应的邮件提示该用户。</p>
              </div>

              <div class="panel-body">

                <div class="row">

                  <div class="col-md-6">

                    <div class="form-group">
                      <label class="col-md-3 control-label">主题</label>
                      <div class="col-md-9">
                        <div class="input-group" :class="{'has-error':errors.has('提示邮件主题')}">
                          <span class="input-group-addon"><span class="fa fa-pencil"></span></span>
                          <input type="text" name="提示邮件主题" class="form-control" v-validate="'required'"
                                 :class="{'input': true, 'is-danger': errors.has('提示邮件主题') }"
                                 v-model.value=emailStyle.regSubject />
                        </div>
                        <i v-show="errors.has('提示邮件主题')" class="fa fa-hand-o-right alarm"></i>
                        <span v-show="errors.has('提示邮件主题')" class="help is-danger alarm ">{{ errors.first('提示邮件主题') }}</span>
                        <span class="help-block">发送注册提示邮件的主题(username发送时户替换成真正的用户名)</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-3 control-label">正文</label>
                      <div class="col-md-9 col-xs-12">
                        <div :class="{'has-error':errors.has('提示邮件正文')}">
                        <textarea rows="7" type="text" name="提示邮件正文" class="form-control" v-validate="'required'"
                                  :class="{'input': true, 'is-danger': errors.has('提示邮件正文') }"
                                  v-model.value=emailStyle.regText ></textarea>
                        </div>
                        <i v-show="errors.has('提示邮件正文')" class="fa fa-hand-o-right alarm"></i>
                        <span v-show="errors.has('提示邮件正文')" class="help is-danger alarm">{{ errors.first('提示邮件正文') }}</span>
                        <span class="help-block">这个是发送的警报邮件的正文(username发送时户替换成真正的用户名)</span>
                      </div>
                    </div>

                  </div>

                  <div class="col-md-6">

                    <div class="form-group">
                      <label class="col-md-3 control-label">主题</label>
                      <div class="col-md-9">
                        <div class="input-group" :class="{'has-error':errors.has('警报邮件主题')}">
                          <span class="input-group-addon"><span class="fa fa-pencil"></span></span>
                          <input type="text" name="警报邮件主题" class="form-control" v-validate="'required'"
                                 :class="{'input': true, 'is-danger': errors.has('警报邮件主题') }"
                                 v-model.value=emailStyle.alarmSubject />
                        </div>
                        <i v-show="errors.has('警报邮件主题')" class="fa fa-hand-o-right alarm"></i>
                        <span v-show="errors.has('警报邮件主题')" class="help is-danger alarm">{{ errors.first('警报邮件主题') }}</span>
                        <span class="help-block">发送注册提示警报的主题(username发送时户替换成真正的用户名)</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-md-3 control-label">正文</label>
                      <div class="col-md-9 col-xs-12">
                        <div :class="{'has-error':errors.has('警报邮件正文')}">
                        <textarea rows="7" type="text" name="警报邮件正文" class="form-control" v-validate="'required'"
                                  :class="{'input': true, 'is-danger': errors.has('警报邮件正文') }"
                                  v-model.value=emailStyle.alarmText ></textarea>
                        </div>
                        <i v-show="errors.has('警报邮件正文')" class="fa fa-hand-o-right alarm"></i>
                        <span v-show="errors.has('警报邮件正文')" class="help is-danger alarm">{{ errors.first('警报邮件正文') }}</span>
                        <span class="help-block">这个是发送的警报邮件的正文(username发送时户替换成真正的用户名)</span>
                      </div>
                    </div>

                  </div>

                  <div class="form-group">
                    <label class="col-md-3 col-xs-12 control-label"> </label>
                    <div class="col-md-6 col-xs-12">
                      <div class="input-group">
                      </div>
                    </div>
                  </div>

                  <div class="form-group" >
                    <label class="col-md-3 col-xs-12 control-label">邮件发送账号:</label>
                    <div class="col-md-6 col-xs-12">
                      <div class="input-group" :class="{'has-error':errors.has('邮箱')}">
                        <span class="input-group-addon"><span class="fa fa-pencil"></span></span>
                        <input type="text" name="邮箱" class="form-control" v-validate="'required|email'"
                               :class="{'input': true, 'is-danger': errors.has('邮箱') }"
                               v-model.value=emailStyle.emailNumber />
                      </div>
                      <i v-show="errors.has('邮箱')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('邮箱')" class="help is-danger alarm">{{ errors.first('邮箱') }}</span>
                      <span class="help-block">发送邮件给用户的发件人邮箱</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-3 col-xs-12 control-label">邮箱授权码:</label>
                    <div class="col-md-6 col-xs-12">
                      <div class="input-group" :class="{'has-error':errors.has('授权码')}" >
                        <span class="input-group-addon"><span class="fa fa-pencil"></span></span>
                        <input type="text" name="授权码" class="form-control" v-validate="'required'"
                               :class="{'input': true, 'is-danger': errors.has('授权码') }"
                               v-model.value=emailStyle.emailPasswd />
                      </div>
                      <i v-show="errors.has('授权码')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('授权码')" class="help is-danger alarm">{{ errors.first('授权码') }}</span>
                      <span class="help-block">请自行到相应邮箱官网自行获取</span>
                    </div>
                  </div>

                </div>

              </div>
              <div class="panel-footer">
                <button class="btn btn-success btn-lg col-md-offset-6">提交</button>
              </div>

            </div>
          </form>

        </div>
      </div>

    </div>
    <!-- END PAGE CONTENT WRAPPER -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VeeValidate, { Validator } from 'vee-validate'
  import messages from '../assets/js/zh_CN'
  Validator.updateDictionary({
    zh_CN: {
      messages
    }
  })
  const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
  }
  Vue.use(VueResource)
  Vue.use(VeeValidate, config)

  export default {
    data () {
      return {
        emailStyle: {
          regSubject: '',
          regText: '',
          alarmSubject: '',
          alarmText: '',
          emailNumber: '',
          emailPasswd: ''
        },
        emailUrl: 'http://localhost:3000/emailStyle'
      }
    },
    mounted: function () {
      this.getMailStyle()
    },
    methods: {
      getMailStyle: function () {
        var resource = this.$resource(this.emailUrl)
        resource.get()
          .then((response) => {
            this.emailStyle = response.body
          })
      },
      saveMailStyle: function () {
        var Params = {regSubject: this.emailStyle.regSubject,
          regText: this.emailStyle.regText,
          alarmSubject: this.emailStyle.alarmSubject,
          alarmText: this.emailStyle.alarmText,
          emailNumber: this.emailStyle.emailNumber,
          emailPasswd: this.emailStyle.emailPasswd
        }
        var resource = this.$resource(this.emailUrl)
        resource.save(this.emailUrl, Params)
          .then((response) => {
            this.getMailStyle()
            this.$message({
              message: '邮件样式保存成功！',
              type: 'success'
            })
          })
      },
      validateBeforeSubmit (e) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.submitForm()
        }
      },
      submitForm () {
        alert('11212122')
        this.saveMailStyle()
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alarm{
  color: rgba(255, 55, 24, 0.85)
}
</style>
