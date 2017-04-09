<template>
  <div>
  <!-- START BREADCRUMB -->
  <ul class="breadcrumb">
    <li><a>主页</a></li>
    <li><a>用户管理</a></li>
    <li class="active">用户登入</li>
  </ul>
  <!-- END BREADCRUMB -->

  <!-- PAGE TITLE -->
  <div class="page-title">
    <h2><span class="fa fa-arrow-circle-o-left"></span> Form Elements</h2>
  </div>
  <!-- END PAGE TITLE -->

    <!-- PAGE CONTENT WRAPPER -->
    <div class="page-content-wrap">

      <div class="row">
        <div class="col-md-6">

          <!-- START DEFAULT FORM ELEMENTS -->
          <div class="block">
            <h4>模拟登入界面数据</h4>
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label class="col-md-2 control-label">账号</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" placeholder="请输入账号" v-model="userid" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-2 control-label">密码</label>
                <div class="col-md-10">
                  <input type="password" class="form-control" placeholder="密码" v-model="password" />
                </div>
              </div>
              <div class="form-group">
                <button type="submit" @click="submitForm" class="btn btn-danger col-md-offset-6">Sign in</button>
              </div>
            </form>
          </div>
          <!-- END DEFAULT FORM ELEMENTS -->

        </div>

      </div>

    </div>
    <!-- END PAGE CONTENT WRAPPER -->

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VueCookie from 'vue-cookie'
  Vue.use(VueResource)
  Vue.use(VueCookie)

  export default {
    data () {
      return {
        userid: '',
        password: '',
        LoginUrl: 'http://localhost:3000/login'
      }
    },
    methods: {
      submitForm () {
        var Params = {userid: this.userid,
          pass: this.password
        }
        console.log(Params)
        var resource = this.$resource(this.LoginUrl)
        resource.save(this.apiUrl, Params)
          .then((response) => {
            if (response.body === '301') {
              this.$notify.info({
                title: '错误',
                message: '没有该用户,请输入正确的用户名！'
              })
            } else if (response.body === '302') {
              this.$notify.error({
                title: '警告',
                message: '密码与相应账户不符！'
              })
            } else {
              this.$notify({
                title: '成功',
                message: '您已成功登入！',
                type: 'success'
              })
              var Info = 'userid' + '=' + response.body.userid + '&'
              Info += 'name' + '=' + response.body.name + '&'
              Info += 'email' + '=' + response.body.email
              Vue.cookie.set('userInfo', Info, { expires: '1D' })
            }
          })
      }
    }
  }
</script>

<style>

</style>
