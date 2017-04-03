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
        <a href="#"><span class="fa  fa-stack-overflow"></span> <span class="xn-text">放射源管理</span></a>
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
        <li><a><span class="glyphicon glyphicon-eye-open"></span> <span class="xn-text">公文管理</span></a></li>
      </router-link>

      <li class="xn-title">用户导航</li>
      <li class="xn-openable">
        <a href="#"><span class="fa fa-cogs"></span> <span class="xn-text">UI Kits</span></a>
        <ul>
          <li><a href="ui-widgets.html"><span class="fa fa-heart"></span> Widgets</a></li>
          <li><a href="ui-elements.html"><span class="fa fa-cogs"></span> Elements</a></li>
          <li><a href="ui-buttons.html"><span class="fa fa-square-o"></span> Buttons</a></li>
          <li><a href="ui-panels.html"><span class="fa fa-pencil-square-o"></span> Panels</a></li>
          <li><a href="ui-icons.html"><span class="fa fa-magic"></span> Icons</a><div class="informer informer-warning">+679</div></li>
          <li><a href="ui-typography.html"><span class="fa fa-pencil"></span> Typography</a></li>
          <li><a href="ui-portlet.html"><span class="fa fa-th"></span> Portlet</a></li>
          <li><a href="ui-sliders.html"><span class="fa fa-arrows-h"></span> Sliders</a></li>
          <li><a href="ui-alerts-popups.html"><span class="fa fa-warning"></span> Alerts & Popups</a></li>
          <li><a href="ui-lists.html"><span class="fa fa-list-ul"></span> Lists</a></li>
          <li><a href="ui-tour.html"><span class="fa fa-random"></span> Tour</a></li>
        </ul>
      </li>
      <li class="xn-openable">
        <a href="#"><span class="fa fa-pencil"></span> <span class="xn-text">Forms</span></a>
        <ul>
          <li>
            <a href="form-layouts-two-column.html"><span class="fa fa-tasks"></span> Form Layouts</a>
            <div class="informer informer-danger">New</div>
            <ul>
              <li><a href="form-layouts-one-column.html"><span class="fa fa-align-justify"></span> One Column</a></li>
              <li><a href="form-layouts-two-column.html"><span class="fa fa-th-large"></span> Two Column</a></li>
              <li><a href="form-layouts-tabbed.html"><span class="fa fa-table"></span> Tabbed</a></li>
              <li><a href="form-layouts-separated.html"><span class="fa fa-th-list"></span> Separated Rows</a></li>
            </ul>
          </li>
          <li><a href="form-elements.html"><span class="fa fa-file-text-o"></span> Elements</a></li>
          <li><a href="form-validation.html"><span class="fa fa-list-alt"></span> Validation</a></li>
          <li class="active"><a href="form-wizards.html"><span class="fa fa-arrow-right"></span> Wizards</a></li>
          <li><a href="form-editors.html"><span class="fa fa-text-width"></span> WYSIWYG Editors</a></li>
          <li><a href="form-file-handling.html"><span class="fa fa-floppy-o"></span> File Handling</a></li>
        </ul>
      </li>
      <li class="xn-openable">
        <a href="tables.html"><span class="fa fa-table"></span> <span class="xn-text">Tables</span></a>
        <ul>
          <li><a href="table-basic.html"><span class="fa fa-align-justify"></span> Basic</a></li>
          <li><a href="table-datatables.html"><span class="fa fa-sort-alpha-desc"></span> Data Tables</a></li>
          <li><a href="table-export.html"><span class="fa fa-download"></span> Export Tables</a></li>
        </ul>
      </li>

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
