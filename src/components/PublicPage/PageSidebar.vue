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
      <li class="xn-openable">
        <a href="#"><span class="fa  fa-stack-overflow"></span> <span class="xn-text">放射源信息管理</span></a>
        <ul>
          <li><a href="pages-gallery.html"><span class="fa fa-image"></span> Gallery</a></li>
          <li><a href="pages-profile.html"><span class="fa fa-user"></span> Profile</a></li>
          <li><a href="pages-address-book.html"><span class="fa fa-users"></span> Address Book</a></li>
          <li class="xn-openable">
            <a href="#"><span class="fa fa-clock-o"></span> Timeline</a>
            <ul>
              <li><a href="pages-timeline.html"><span class="fa fa-align-center"></span> Default</a></li>
              <li><a href="pages-timeline-simple.html"><span class="fa fa-align-justify"></span> Full Width</a></li>
            </ul>
          </li>
          <li class="xn-openable">
            <a href="#"><span class="fa fa-envelope"></span> Mailbox</a>
            <ul>
              <li><a href="pages-mailbox-inbox.html"><span class="fa fa-inbox"></span> Inbox</a></li>
              <li><a href="pages-mailbox-message.html"><span class="fa fa-file-text"></span> Message</a></li>
              <li><a href="pages-mailbox-compose.html"><span class="fa fa-pencil"></span> Compose</a></li>
            </ul>
          </li>
          <li><a href="pages-messages.html"><span class="fa fa-comments"></span> Messages</a></li>
          <li><a href="pages-calendar.html"><span class="fa fa-calendar"></span> Calendar</a></li>
          <li><a href="pages-tasks.html"><span class="fa fa-edit"></span> Tasks</a></li>
          <li><a href="pages-content-table.html"><span class="fa fa-columns"></span> Content Table</a></li>
          <li><a href="pages-faq.html"><span class="fa fa-question-circle"></span> FAQ</a></li>
          <li><a href="pages-search.html"><span class="fa fa-search"></span> Search</a></li>
          <li class="xn-openable">
            <a href="#"><span class="fa fa-file"></span> Blog</a>

            <ul>
              <li><a href="pages-blog-list.html"><span class="fa fa-copy"></span> List of Posts</a></li>
              <li><a href="pages-blog-post.html"><span class="fa fa-file-o"></span>Single Post</a></li>
            </ul>
          </li>
          <li class="xn-openable">
            <a href="#"><span class="fa fa-sign-in"></span> Login</a>
            <ul>
              <li><a href="pages-login.html">App Login</a></li>
              <li><a href="pages-login-website.html">Website Login</a></li>
              <li><a href="pages-login-website-light.html"> Website Login Light</a></li>
            </ul>
          </li>
          <li class="xn-openable">
            <a href="#"><span class="fa fa-warning"></span> Error Pages</a>
            <ul>
              <li><a href="pages-error-404.html">Error 404 Sample 1</a></li>
              <li><a href="pages-error-404-2.html">Error 404 Sample 2</a></li>
              <li><a href="pages-error-500.html"> Error 500</a></li>
            </ul>
          </li>
        </ul>
      </li>
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
      <router-link to="/Login">
        <li><a><span class="fa fa-map-marker"></span> <span class="xn-text">用户登入</span></a></li>
      </router-link>
      <router-link to="/ShowWorkText">
        <li><a><span class="fa fa-map-marker"></span> <span class="xn-text">文章展示</span></a></li>
      </router-link>
      <router-link to="/map">
       <li><a><span class="fa fa-map-marker"></span> <span class="xn-text">放射源定位</span></a></li>
      </router-link>

      <router-link to="/SendMailer">
      <li><a><span class="fa fa-envelope"></span> <span class="xn-text"> 邮件样式设置</span></a></li>
      </router-link>

      <li class="xn-openable">
        <a href="#"><span class="fa fa-sitemap"></span> <span class="xn-text">Navigation Levels</span></a>
        <ul>
          <li class="xn-openable">
            <a href="#">Second Level</a>
            <ul>
              <li class="xn-openable">
                <a href="#">Third Level</a>
                <ul>
                  <li class="xn-openable">
                    <a href="#">Fourth Level</a>
                    <ul>
                      <li><a href="#">Fifth Level</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <!-- END X-NAVIGATION -->
  </div>
</template>

<script>

</script>

<style scoped>

</style>
