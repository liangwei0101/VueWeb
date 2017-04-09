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

      <div class="row">
        <div class="col-md-6">

          <!-- START TIMELINE FILTER -->
          <div class="panel panel-default">
            <div class="panel-body">
              <h3>Timeline filter</h3>
              <form class="form-horizontal" role="form">
                <div class="form-group">

                  <div class="col-md-8">
                    <div class="input-group">
                      <span class="input-group-addon"><span class="fa fa-search"></span></span>
                      <input type="text" class="form-control" placeholder="Keywords"/>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-group">
                      <span class="input-group-addon add-on"><span class="fa fa-calendar"></span></span>
                      <input type="text" class="form-control datepicker" value="2014-10-06"/>
                    </div>
                  </div>

                </div>
                <div class="form-group">
                  <div class="col-md-8">
                    <div class="btn-group btn-group-justified">
                      <a href="#" class="btn btn-primary active">All</a>
                      <a href="#" class="btn btn-primary">Year</a>
                      <a href="#" class="btn btn-primary">Month</a>
                      <a href="#" class="btn btn-primary">Week</a>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="pull-right">
                      <button class="btn btn-success"><span class="fa fa-refresh"></span> UPDATE</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- END TIMELINE FILTER -->

        </div>
        <div class="col-md-6">

          <!-- START NEW RECORD -->
          <div class="panel panel-default">
            <div class="panel-body">
              <h3>What happened?</h3>
              <form class="form-horizontal" role="form">
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="input-group">
                      <span class="input-group-addon"><span class="fa fa-pencil"></span></span>
                      <input class="form-control" placeholder="Write something"/>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="btn-group pull-left">
                      <button class="btn btn-primary"><span class="fa fa-camera"></span></button>
                      <button class="btn btn-primary"><span class="fa fa-map-marker"></span></button>
                      <button class="btn btn-primary"><span class="fa fa-calendar"></span></button>
                    </div>
                    <div class="pull-right">
                      <button class="btn btn-danger"><span class="fa fa-share"></span> SEND</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- END NEW RECORD -->

        </div>
      </div>

      <div class="row">
        <div class="col-md-12">

          <!-- START TIMELINE -->
          <div class="timeline timeline-right">

            <!-- START TIMELINE ITEM -->
            <div class="timeline-item timeline-main">
              <div class="timeline-date">2014</div>
            </div>
            <!-- END TIMELINE ITEM -->

            <!-- START TIMELINE ITEM -->
            <div class="timeline-item timeline-item-right" v-for="item in items">
              <div class="timeline-item-info">{{item.createDate}}</div>
              <div class="timeline-item-icon"><span class="fa fa-globe"></span></div>
              <div class="timeline-item-content">
                <div class="timeline-heading">
                  <a>{{item.author}}</a> 发表于 <a>{{item.createTime}}</a>
                </div>
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
                    <img src="assets/images/users/user4.jpg"/>
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
              <div class="timeline-date"><a href="#"><span class="fa fa-ellipsis-h"></span></a></div>
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
  import { getCookie } from '../services/Cookie'
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
        Dic: {}
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
        var getUrl = 'http://localhost:3000/workText'
        var resource = this.$resource(getUrl)
        resource.get()
          .then((response) => {
            this.items = response.body
            this.items.reverse()
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
