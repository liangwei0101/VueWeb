<template>
  <div class="page-sidebar">
    <!-- START X-NAVIGATION -->
    <ul class="x-navigation">
      <li class="xn-logo">
        <a href="index.html">Joli Admin</a>
        <a href="#" class="x-navigation-control"></a>
      </li>
      <li class="xn-profile">
        <a href="#" class="profile-mini">
          <img src="assets/images/users/avatar.jpg" alt="John Doe"/>
        </a>
        <div class="profile">
          <div class="profile-image">
            <img src="static/img/users/avatar.jpg" alt="John Doe"/>
          </div>
          <div class="profile-data">
            <div class="profile-data-name">John Doe</div>
            <div class="profile-data-title">Web Developer/Designer</div>
          </div>
          <div class="profile-controls">
            <a href="pages-profile.html" class="profile-control-left"><span class="fa fa-info"></span></a>
            <a href="pages-messages.html" class="profile-control-right"><span class="fa fa-envelope"></span></a>
          </div>
        </div>
      </li>
      <li class="xn-title">管理员</li>
      <li>
        <a href="index.html"><span class="fa fa-desktop"></span> <span class="xn-text">主页</span></a>
      </li>
      <router-link to="/RadioactiveInfo">
        <li><a><span class="fa fa-stack-overflow"></span> <span class="xn-text"> 放射源信息管理</span></a></li>
      </router-link>
      <router-link to="/UserManage">
        <li><a><span class="fa fa-cog"></span> <span class="xn-text"> 用户管理</span></a></li>
      </router-link>
      <router-link to="/SendMailer">
        <li><a><span class="fa fa-envelope"></span> <span class="xn-text"> 邮件样式设置</span></a></li>
      </router-link>

      <router-link to="/WorkTextManage">
        <li><a><span class="fa fa-folder-o"></span> <span class="xn-text">公文管理</span></a></li>
      </router-link>

      <li class="xn-title">用户导航</li>

      <router-link to="/ShowWorkText">
        <li><a><span class="fa fa-eye"></span> <span class="xn-text">文章展示</span></a></li>
      </router-link>

      <router-link to="/RadioactiveInfo">
        <li><a><span class="fa fa-stack-overflow"></span> <span class="xn-text"> 放射源信息管理</span></a></li>
      </router-link>

      <router-link to="/TransportTask">
        <li><a><span class="fa fa-truck"></span> <span class="xn-text"> 运输任务管理</span></a></li>
      </router-link>

      <router-link to="/map">
       <li><a><span class="fa fa-map-marker"></span> <span class="xn-text">放射源定位</span></a></li>
      </router-link>

      <router-link to="/SendMailer">
      <li><a><span class="fa fa-envelope"></span> <span class="xn-text"> 邮件样式设置</span></a></li>
      </router-link>

      <router-link to="/test">
        <li><a><span class="fa fa-envelope"></span> <span class="xn-text"> 测试</span></a></li>
      </router-link>
    </ul>
    <!-- END X-NAVIGATION -->
  </div>
</template>

<script>

</script>

<style scoped>

</style>
