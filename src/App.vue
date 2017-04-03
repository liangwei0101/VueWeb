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
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)

  export default {
    components: { PageSidebar, Navigation, MessageBox },
    name: 'app'
}
</script>

<style>

</style>
