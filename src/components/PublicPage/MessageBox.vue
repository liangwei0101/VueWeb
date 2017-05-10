<template>
  <!-- MESSAGE BOX-->
  <div class="message-box animated fadeIn dialog" data-sound="alert" id="mb-signout">
    <div class="mb-container">
      <div class="mb-middle">
        <div class="mb-title"><span class="fa fa-sign-out"></span> 退出 <strong>登入</strong> ?</div>
        <div class="mb-content">
          <p>您确定要退出吗?</p>
          <p>如果要继续工作，请按“否”。 按“是”注销当前用户。</p>
        </div>
        <div class="mb-footer">
          <div class="pull-right">
            <button class="btn btn-success btn-lg" @click="delCookie">是</button>
            <button class="btn btn-default btn-lg mb-control-close">否</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END MESSAGE BOX-->
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VueCookie from 'vue-cookie'
  Vue.use(VueResource)
  Vue.use(VueCookie)

  export default {
    methods: {
      delCookie () {
        this.$cookie.delete('userInfo')
        this.$router.push('/')
        location.reload(true)
      }
    }
  }
</script>

<style scoped>
  .dialog{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 11;
  }
</style>
