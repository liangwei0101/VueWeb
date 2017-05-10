<template>
  <div>

    <div class="login-container dialog" v-show="loginShow">

      <div class="login-box animated fadeInDown">
        <div class="login-logo"></div>
        <div class="login-body">
          <div class="login-title"><strong>欢迎</strong>, 请 登入</div>

          <div class="form-horizontal">
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
                <button class="btn btn-info btn-block"  @click="login">登入</button>
              </div>
            </div>
          </div>

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

    <div class='page-sidebar'>
    <!-- START X-NAVIGATION -->
    <ul class='x-navigation'>
      <li class='xn-logo'>
        <a>Joli Admin</a>
        <a class='x-navigation-control'></a>
      </li>
      <li class='xn-profile'>
        <a class='profile-mini'>
          <img v-bind:src='UserImg' alt='John Doe'/>
        </a>
        <div class='profile'>
          <div class='profile-image'>
            <img v-bind:src='UserImg' alt='John Doe'/>
          </div>
          <div class='profile-data'>
            <div class='profile-data-name'>{{userName}}</div>
            <div class='profile-data-title'>欢迎 登入</div>
          </div>
          <div class='profile-controls'>
            <a class='profile-control-left'><span class='fa fa-info'></span></a>
            <a class='profile-control-right'><span class='fa fa-envelope'></span></a>
          </div>
        </div>
      </li>
      <li class='xn-title' v-show="menuAdminShow">管理员</li>

      <li v-show="menuAdminShow">
        <a><span class='fa fa-desktop'></span> <span class='xn-text'>主页</span></a>
      </li>

      <router-link to='/UserManage'>
        <li v-show="menuAdminShow"><a><span class='fa fa-cog'></span> <span class='xn-text'> 用户管理</span></a></li>
      </router-link>

      <router-link to='/RadioactiveInfo'>
        <li v-show="menuAdminShow"><a><span class='fa fa-stack-overflow'></span> <span class='xn-text'> 放射源信息管理</span></a></li>
      </router-link>

      <router-link to='/TransportTask'>
        <li v-show="menuAdminShow"><a><span class='fa fa-tasks'></span> <span class='xn-text'> 运输任务管理</span></a></li>
      </router-link>

      <router-link to='/Video'>
        <li v-show="menuAdminShow"><a><span class='fa fa-video-camera'></span> <span class='xn-text'> 在线监测</span></a></li>
      </router-link>

      <router-link to='/SendMailer'>
        <li v-show="menuAdminShow"><a><span class='fa fa-envelope'></span> <span class='xn-text'> 邮件样式设置</span></a></li>
      </router-link>

      <router-link to='/WorkTextManage'>
        <li v-show="menuAdminShow"><a><span class='fa fa-folder-o'></span> <span class='xn-text'>公文管理</span></a></li>
      </router-link>

      <router-link to='/ShowWorkText'>
        <li v-show="menuAdminShow"><a><span class='fa fa-eye'></span> <span class='xn-text'>文章展示</span></a></li>
      </router-link>

      <router-link to='/CarManage'>
        <li v-show="menuAdminShow"><a><span class='fa fa-truck'></span> <span class='xn-text'>车辆信息管理</span></a></li>
      </router-link>

      <router-link to='/map'>
        <li v-show="menuAdminShow"><a><span class='fa fa-map-marker'></span> <span class='xn-text'>放射源定位</span></a></li>
      </router-link>

      <router-link to='/roleManage'>
        <li v-show="menuAdminShow"><a><span class='fa fa-users'></span> <span class='xn-text'>角色管理</span></a></li>
      </router-link>

      <router-link to='/test'>
        <li v-show="menuAdminShow"><a><span class='fa fa-envelope'></span> <span class='xn-text'> 测试</span></a></li>
      </router-link>

      <li class='xn-title' v-show="menuUserShow">用户导航</li>

      <router-link to='/UserManage'>
        <li v-show="menuUserShow"><a><span class='fa fa-cog'></span> <span class='xn-text'> 用户管理</span></a></li>
      </router-link>

      <router-link to='/Video'>
        <li v-show="menuUserShow"><a><span class='fa fa-video-camera'></span> <span class='xn-text'> 在线监测</span></a></li>
      </router-link>

      <router-link to='/ShowWorkText'>
        <li v-show="menuUserShow"><a><span class='fa fa-eye'></span> <span class='xn-text'>文章展示</span></a></li>
      </router-link>

      <router-link to='/WorkTextManage'>
        <li v-show="menuUserShow"><a><span class='fa fa-folder-o'></span> <span class='xn-text'>公文管理</span></a></li>
      </router-link>

      <router-link to='/RadioactiveInfo'>
        <li v-show="menuUserShow"><a><span class='fa fa-stack-overflow'></span> <span class='xn-text'> 放射源信息管理</span></a></li>
      </router-link>

      <router-link to='/CarManage'>
        <li v-show="menuUserShow"><a><span class='fa fa-folder-o'></span> <span class='xn-text'>车辆信息管理</span></a></li>
      </router-link>

      <router-link to='/TransportTask'>
        <li v-show="menuUserShow"><a><span class='fa fa-truck'></span> <span class='xn-text'> 运输任务管理</span></a></li>
      </router-link>

      <router-link to='/map'>
       <li v-show="menuUserShow"><a><span class='fa fa-map-marker'></span> <span class='xn-text'>放射源定位</span></a></li>
      </router-link>

      <router-link to='/test'>
        <li v-show="menuUserShow"><a><span class='fa fa-envelope'></span> <span class='xn-text'> 测试</span></a></li>
      </router-link>

    </ul>
    <!-- END X-NAVIGATION -->
  </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCookie from 'vue-cookie'
  import {loginShow} from '../../services/test'
  import {CookieName, CookieImgUrl} from '../../services/Cookie'
  Vue.use(VueCookie)

  export default {
    data () {
      return {
        userid: '',
        password: '',
        userInfo: null,
        UserImg: '../../../static/img/users/no-image.jpg',
        loginShow: loginShow,
        menuAdminShow: null,
        menuUserShow: null,
        userName: '',
        Cookie: {
          userid: '',
          name: ''
        }
      }
    },
    mounted: function () {
      var cookieTemp = this.$cookie.get('userInfo')
      if (cookieTemp) {
        this.loginShow = false
        var temp = this.CookieUserType()
        this.setMenu(Number(temp))
        this.setUIContent(CookieName(), CookieImgUrl())
      } else {
        this.loginShow = true
      }
    },
    methods: {
      login () {
        var LoginUrl = 'http://localhost:3000/login'
        var Params = {userid: this.userid,
          pass: this.password}
        var resource = this.$resource(LoginUrl)
        resource.save(LoginUrl, Params)
          .then((response) => {
            if (response.body === '301') {
              this.$Notice.warning({
                title: '没有该用户,请输入正确的用户名!'
              })
            } else if (response.body === '302') {
              this.$Notice.error({
                title: '密码与相应账户不符!'
              })
            } else if (response.body === '303') {
              this.$Notice.info({
                title: '该账号已冻结，请联系管理员!'
              })
            } else {
              this.$Notice.success({
                title: '您已成功登入!'
              })
              this.loginShow = false
              this.userInfo = response.body.userInfo
              this.setMenu(Number(this.userInfo.userType))
              this.setUIContent(this.userInfo.name, this.userInfo.imgUrl)
              var Info = 'userid' + '=' + response.body.userInfo.userid + '&'
              Info += 'name' + '=' + response.body.userInfo.name + '&'
              Info += 'email' + '=' + response.body.userInfo.email + '&'
              Info += 'imgUrl' + '=' + response.body.userInfo.imgUrl + '&'
              Info += 'userType' + '=' + response.body.userInfo.userType
              Vue.cookie.set('userInfo', Info, { expires: '1D' })
              this.$router.push('/test')
            }
          })
      },
      setMenu (userType) {
        if (userType === 1) {
          this.menuAdminShow = true
          this.menuUserShow = false
        } else if (userType === 2) {
          this.menuAdminShow = false
          this.menuUserShow = true
        } else if (userType === 0) {
          this.menuAdminShow = true
          this.menuUserShow = true
        }
      },
      setUIContent (name, imgUrl) {
        this.UserImg = 'http://localhost:3000/uploads/images/' + imgUrl
        this.userName = name
      },
      CookieUserType () {
        var cookieTemp = this.$cookie.get('userInfo')
        var temp = cookieTemp.split('&')
        var Str = temp[temp.length - 1]
        var tempUerType = Str.split('=')
        var UerType = tempUerType[tempUerType.length - 1]
        return UerType
      }
    }
  }
</script>

<style scoped>
  .dialog{
    width: 100%;
    height: 100%;
    background: #1b1e24;
    z-index: 33;
  }
</style>
