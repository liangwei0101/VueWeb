<template>
  <div>
    <div class="login-container dialog">

      <div class="login-box animated fadeInDown">
        <div class="login-logo"></div>
        <div class="login-body">
          <div class="login-title"><strong>欢迎</strong>, 请 登入</div>
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-md-12">
                <input type="text" class="form-control" placeholder="请输入账号"  v-model="userid" />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <input type="password" class="form-control" placeholder="密码" v-model="password" />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <a href="#" class="btn btn-link btn-block">忘记密码了?</a>
              </div>
              <div class="col-md-6">
                <button class="btn btn-info btn-block"  @click="submitForm">登入</button>
              </div>
            </div>
          </form>
        </div>
        <div class="login-footer">
          <div class="pull-left">
            &copy; 2017 梁伟
                    </div>
          <div class="pull-right">
            <a href="#">About</a> |
                        <a href="#">Privacy</a> |
                        <a href="#">Contact Us</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VueCookie from 'vue-cookie'
  import { mapState } from 'vuex'
  import {setFlag} from '../services/test'
  Vue.use(VueResource)
  Vue.use(VueCookie)

  export default {
    data () {
      return {
        userid: '',
        password: '',
        LoginUrl: 'http://localhost:3000/login',
        userInfo: {}
      }
    },
    // fetch(context) is called by the server-side
    // and nuxt before instantiating the component
    fetch ({ store }) {
      store.commit('set_userInfo')
    },
    computed: mapState([
      'Info'
    ]),
    methods: {
      submitForm () {
        this.clear()
        console.log(this.$store.state)
        var Params = {userid: this.userid,
          pass: this.password
        }
        var resource = this.$resource(this.LoginUrl)
        resource.save(this.apiUrl, Params)
          .then((response) => {
            console.log(response.body)
            if (response.body === '301') {
              this.$Notice.warning({
                title: '没有该用户,请输入正确的用户名!'
              })
            } else if (response.body === '302') {
              this.$Notice.error({
                title: '密码与相应账户不符!'
              })
            } else if (response.body === '303') {
              this.$Notice.error({
                title: '该账号已被冻结，请联系管理员!'
              })
            } else {
              this.$Notice.success({
                title: '您已成功登入!'
              })
              this.userInfo = response.body
              var Info = 'userid' + '=' + response.body.userid + '&'
              Info += 'name' + '=' + response.body.name + '&'
              Info += 'email' + '=' + response.body.email
              Vue.cookie.set('userInfo', Info, { expires: '1D' })
              this.setUI(this.userInfo)
              setFlag(response.body.test)
              this.$router.push('/PublicPage')
            }
          })
      },
      setUI (Obj) {
        this.$store.commit('set_userInfo', Obj)
        this.$store.commit('set_tets')
      },
      clear () {
        this.$store.commit('clear_state')
      }
    }
  }
</script>

<style>
  .dialog{
    padding-top: 120px;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: #1b1e24;
    z-index: 999;
  }
</style>
