<template>
  <div class="hello">
    <!-- START BREADCRUMB -->
    <ul class="breadcrumb">
      <li><a>主页</a></li>
      <li><a>公文</a></li>
      <li class="active">公文展示</li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- PAGE CONTENT WRAPPER -->
    <div class="page-content-wrap">

      <!-- START CONTENT FRAME TOP -->
      <div class="content-frame-top">
        <div class="page-title">
          <h2><span class="fa fa-file-text-o"></span> 文章查看</h2>
        </div>
      </div>
      <!-- END CONTENT FRAME TOP -->

      <div class="row">
        <div class="col-md-">

          <!-- START TIMELINE FILTER -->
          <div class="panel panel-default">
            <div class="panel-body">
              <h3 class="panel-title col-md-5">
                <input v-model="selectText" class="form-control" @keyup.enter="selectInfo" placeholder="请输入发表者姓名查询"/>
              </h3>
              <div class="btn-group " style="float: left">
                <button class="btn btn-info" @click="selectInfo"><i class="glyphicon glyphicon-zoom-out"></i>查 询</button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="row">
        <div class="col-md-12">

          <!-- START TIMELINE -->
          <div class="timeline timeline-right">

            <!-- START TIMELINE ITEM -->
            <div class="timeline-item timeline-main">
              <div class="timeline-date">Begin</div>
            </div>
            <!-- END TIMELINE ITEM -->

            <!-- START TIMELINE ITEM -->
            <div class="timeline-item timeline-item-right" v-for="item in items">
              <div class="timeline-item-info">{{item.createDate}}</div>
              <div class="timeline-item-icon"><span class="fa fa-globe"></span></div>
              <div class="timeline-item-content">
                <div class="timeline-heading">
                  <img v-bind:src='item.imgUrl' />
                  <a>{{item.author}}</a> 发表于 <a>{{item.createTime}}</a>
                </div>
                <strong>&nbsp;&nbsp;&nbsp;标题：{{item.title}}</strong>
                <div class="timeline-body">
                  <p v-html="item.htmlForEditor">{{item.htmlForEditor}}</p>

                  <ul class="list-tags">
                    <li><a href="#"><span class="fa fa-tag"></span> tempor</a></li>
                    <li><a href="#"><span class="fa fa-tag"></span> eros</a></li>
                    <li><a href="#"><span class="fa fa-tag"></span> suspendisse</a></li>
                    <li><a href="#"><span class="fa fa-tag"></span> dolor</a></li>
                  </ul>
                </div>
                <div class="timeline-body comments">
                  <div class="comment-item">
                    <img v-bind:src='item.imgUrl' />
                    <p class="comment-head">
                      <a href="#">Brad Pitt</a> <span class="text-muted">@bradpitt</span>
                    </p>
                    <p>Awesome, man, that is awesome...</p>
                    <small class="text-muted">10h ago</small>
                  </div>
                  <div class="comment-write">
                    <textarea class="form-control" placeholder="Write a comment" rows="1"></textarea>
                  </div>
                </div>
                <div class="timeline-footer">
                  <a href="#">Read more</a>
                  <div class="pull-right">
                    <a href="#"><span class="fa fa-comment"></span> 35</a>
                    <a href="#"><span class="fa fa-share"></span></a>
                  </div>
                </div>
              </div>
            </div>
            <!-- END TIMELINE ITEM -->

            <!-- START TIMELINE ITEM -->
            <div class="timeline-item timeline-main">
              <div class="timeline-date">End</div>
            </div>
            <!-- END TIMELINE ITEM -->
          </div>
          <!-- END TIMELINE -->

        </div>
      </div>

    </div>
    <!-- END PAGE CONTENT WRAPPER -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import {getCookie, CookieUserType} from '../services/Cookie'
  Vue.use(VueResource)

  export default {
    data: function () {
      return {
        htmlForEditor: '',
        createDate: '',
        createTime: '',
        author: '',
        title: '',
        IsPublic: '',
        createDateTime: '',
        selected: '0',
        options: [
          { text: '公开', value: '0' },
          { text: '私密', value: '1' }
        ],
        items: [],
        textID: '',
        delClass: {
          open: false
        },
        Dic: {},
        selectText: ''
      }
    },
    mounted: function () {
      this.vueCookie()
      this.getContents()
    },
    methods: {
      handleSaveContent: function (contentsToBeSaved) {
        this.saveContents(contentsToBeSaved)
      },
      getContents: function () {
        var getUrl = 'http://localhost:3000/workText/get'
        var resource = this.$resource(getUrl)
        resource.get()
          .then((response) => {
            console.log(CookieUserType())
            if (CookieUserType() === '2') {
              for (var i = 0; i < response.body.length; i++) {
                if (response.body[i].IsPublic === '0') {
                  this.items.push(response.body[i])
                  this.items.reverse()
                }
              }
            } else {
              this.items = response.body
              this.items.reverse()
            }
          })
      },
      selectInfo: function () {
        this.items = []
        var selectUrl = 'http://localhost:3000/workText/select' + '/'
        if (this.selectText === '') {
          selectUrl += this.Dic['userid']
        } else {
          selectUrl += this.selectText
        }
        var resource = this.$resource(selectUrl)
        resource.get()
          .then((response) => {
            this.items = response.body
            this.items.reverse()

            this.items = []
            if (CookieUserType() === '2') {
              for (var i = 0; i < response.body.length; i++) {
                if (this.Cookie.userid === response.body[i].userid) {
                  this.items.push(response.body[i])
                }
              }
              this.items.reverse()
            } else {
              console.log(response.body)
              this.items = response.body
              this.items.reverse()
            }
          })
      },
      showContent: function (item) {
        console.log(item)
        this.title = item.title
        this.createDate = item.createDateTime
        this.selected = item.IsPublic
        this.htmlForEditor = item.htmlForEditor
        this.author = item.author
        this.textID = item.textID
      },
      closeTipWind: function () {
        this.delClass.open = false
      },
      textIdMake: function () {
        var myDate = new Date()
        var temp = ''
        temp += myDate.getFullYear()
        temp += myDate.getMonth() + 1
        temp += myDate.getDate()
        temp += myDate.getHours()
        temp += myDate.getMinutes()
        temp += myDate.getSeconds()
        this.textID = temp
      },
      vueCookie: function () {
        this.Dic = getCookie()
        console.log('-------------------------')
        console.log(this.Dic['userid'])
        console.log('-------------------------')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    background: #f5f5f5 url('../../static/img/bg.png') left top repeat;
  }
</style>
