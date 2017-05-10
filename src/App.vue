<template>
 <!-- <div id="app">
    <router-view></router-view>
  </div>-->
  <div class="page-container">
      <!-- 右侧菜单栏 -->
      <PageSidebar></PageSidebar>
      <!-- 右侧菜单栏 -->
    <!--上方导航和内容-->
    <div class="page-content">

      <navigation></navigation>

      <!-- PAGE CONTENT WRAPPER -->
      <div id="app"></div>
      <router-view></router-view>
      <!-- END PAGE CONTENT WRAPPER -->
      <MessageBox></MessageBox>
    </div>

  </div>
</template>

<script>
  import PageSidebar from './components/PublicPage/PageSidebar'
  import Navigation from './components/PublicPage/Navigation'
  import MessageBox from './components/PublicPage/MessageBox'
  import Vue from 'vue'
  import iView from 'iview'
  import 'iview/dist/styles/iview.css'    // 使用 CSS
  import store from './services/store' // import 刚创建的 store
  Vue.use(iView)

  export default {
    components: { PageSidebar, Navigation, MessageBox },
    name: 'app',
    store: store
}

</script>

<style>

</style>
