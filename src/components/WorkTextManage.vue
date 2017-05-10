<template>
  <div class="hello">
    <!-- START BREADCRUMB -->
    <ul class="breadcrumb push-down-0">
      <li><a href="#">用户</a></li>
      <li class="active"><a href="#">公文管理</a></li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- START CONTENT FRAME -->
    <div class="content-frame">
      <!-- START CONTENT FRAME TOP -->
      <div class="content-frame-top">
        <div class="page-title">
          <h2><span class="fa fa-pencil"></span> 公文管理</h2>
        </div>

        <div class="pull-right">
          <button class="btn btn-info" @click="clearContent"><span class="fa fa-floppy-o"></span> 新增</button>
          <button class="btn btn-default content-frame-left-toggle"><span class="fa fa-bars"></span></button>
        </div>
      </div>
      <!-- END CONTENT FRAME TOP -->

      <!-- START CONTENT FRAME LEFT -->
      <div class="content-frame-left" style="height: 100%">
        <div class="block" >
          <div class="list-group border-bottom">
            <a class="list-group-item active"><span class="fa fa-flag"></span> 公文列表</a>
            <a class="list-group-item" v-for="item in items" @click="showContent(item)"><span class="fa fa-file-o"></span>{{item.title + '---'+ item.createDate}}</a>
          </div>
        </div>
        <div class="block">
          <div class="list-group list-group-simple">
          </div>
        </div>
      </div>
      <!-- END CONTENT FRAME LEFT -->

      <!-- START CONTENT FRAME BODY -->
      <div class="content-frame-body">
        <div class="block">
          <form role="form" class="form-horizontal">
            <div class="form-group">
              <label class="col-md-2 control-label">是否公开:</label>
              <div class="col-md-9">
                <select  class="form-control"    v-model="selected">
                  <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-2 control-label">标题:</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model.value=title placeholder="本文档的标题"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-2 control-label">作者:</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model.value=author placeholder="文档的作者"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-2 control-label">创建时间:</label>
              <div class="col-md-9">
                <input type="text" class="form-control datepicker" v-model.value=createDate disabled="disabled" />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <vue-editor
                  @save-content="handleSaveContent"
                  v-model="htmlForEditor">
                </vue-editor>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <button class="btn btn-danger" @click="isAbleDelContent"> <span class="fa fa-times"></span>删除</button>
                <div class="pull-right">
                  <button class="btn btn-success" @click="handleSaveContent"><span class="fa fa-check"></span> 保存</button>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
      <!-- END CONTENT FRAME BODY -->
    </div>

    <!--删除文档提示框-->
    <div class="message-box animated fadeIn del" :class="delClass" >
      <div class="mb-container">
        <div class="mb-middle">
          <div class="mb-title"><span class="fa fa-times"></span> 删除 <strong>文档</strong> ?</div>
          <div class="mb-content">
            <p>您确定要删除要此篇文档吗？</p>
            <p>如果您确定，请按Yes.</p>
          </div>
          <div class="mb-footer">
            <div class="pull-right">
              <button class="btn btn-success btn-lg mb-control-yes"  @click="removeContent">Yes</button>
              <button class="btn btn-default btn-lg mb-control-close" @click="closeTipWind">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--删除文档提示框-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import { VueEditor } from 'vue2-editor'
  import {getCookie, CookieUserType} from '../services/Cookie'
  Vue.use(VueResource)
  Vue.use(VueEditor)

  export default {
    data: function () {
      return {
        htmlForEditor: '',
        createDate: '',
        createTime: '',
        author: '',
        title: '',
        IsPublic: '',
        selected: '0',
        options: [
          { text: '公开', value: '0' },
          { text: '私密', value: '1' }
        ],
        items: [],
        id: '',
        delClass: {
          open: false
        },
        Cookie: {
          userid: '',
          name: ''
        }
      }
    },
    components: {
      VueEditor
    },
    mounted: function () {
      this.vueCookie()
      this.getContents()
      this.getDate()
    },
    methods: {
      handleSaveContent: function () {
        this.saveContents()
      },
      getContents () {
        var getUrl = 'http://localhost:3000/workText/get'
        if (CookieUserType() === '2') {
          getUrl = 'http://localhost:3000/workText/get' + '/' + this.Cookie.userid
        }
        var resource = this.$resource(getUrl)
        resource.get()
          .then((response) => {
            this.items = response.body
            if (this.items.length > 0) {
              var temp = this.items[0]
              this.title = temp.title
              this.createDate = temp.createDate
              this.createTime = temp.createTime
              this.selected = temp.IsPublic
              this.htmlForEditor = temp.htmlForEditor
              this.author = temp.author
              this.textID = temp.textID
            }
          })
      },
      saveContents () {
        var index = -1
        var Params = {id: this.id}
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].id === Params.id) {
            index = i
          }
        }
        if (index === -1) {
          this.addContent()
        } else {
          this.updateContent()
        }
      },
      getDate () {
        var tempDate = new Date()
        this.createDate = tempDate.toLocaleDateString()
      },
      getTime () {
        var tempDate = new Date()
        this.createTime = tempDate.getHours() + ':'
        this.createTime += tempDate.getMinutes()
      },
      showContent (item) {
        console.log(item)
        this.title = item.title
        this.createDate = item.createDate
        this.selected = item.IsPublic
        this.htmlForEditor = item.htmlForEditor
        this.author = item.author
        this.id = item.id
      },
      isAbleDelContent () {
        if (this.id === '') {
          this.$Message.warning('此为空文本，请先添加再按保存！')
        } else {
          this.delClass.open = true
        }
      },
      addContent () {
        this.textIdMake()
        this.getTime()
        var Params = {IsPublic: this.selected,
          title: this.title,
          author: this.author,
          htmlForEditor: this.htmlForEditor,
          createDate: this.createDate,
          id: this.id,
          userid: this.Dic['userid'],
          createTime: this.createTime
        }
        var saveUrl = 'http://localhost:3000/workText/save'
        var resource = this.$resource(saveUrl)
        resource.save(saveUrl, Params)
          .then((response) => {
            this.items.push(Params)
            this.$Message.success('文档新增成功！')
            this.getContents()
          })
      },
      updateContent () {
        var updateUrl = 'http://localhost:3000/workText/update' + '/' + this.id
        var Params = {IsPublic: this.selected,
          title: this.title,
          author: this.author,
          htmlForEditor: this.htmlForEditor,
          id: this.id
        }
        var resource = this.$resource(updateUrl)
        resource.save(updateUrl, Params)
          .then((response) => {
            this.$Message.success('文档更新成功！')
            this.getContents()
          })
      },
      removeContent () {
        this.closeTipWind()
        var delUrl = 'http://localhost:3000/workText/remove'
        var Params = {IsPublic: this.selected,
          title: this.title,
          author: this.author,
          id: this.id
        }
        var resource = this.$resource(delUrl)
        resource.save(delUrl, Params)
          .then((response) => {
            this.$Message.success('工作文档删除成功！')
            this.getContents()
          })
      },
      clearContent () {
        this.title = ''
        this.selected = '0'
        this.author = ''
        this.htmlForEditor = ''
        this.id = ''
        this.getDate()
      },
      closeTipWind () {
        this.delClass.open = false
      },
      textIdMake () {
        var myDate = new Date()
        var temp = this.Cookie.userid + '&'
        temp += myDate.getFullYear()
        temp += myDate.getMonth() + 1
        temp += myDate.getDate()
        temp += myDate.getHours()
        temp += myDate.getMinutes()
        temp += myDate.getSeconds()
        this.id = temp
      },
      vueCookie () {
        this.Dic = getCookie()
        this.Cookie.userid = this.Dic['userid']
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .del{
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .alarm{
    color: rgba(255, 55, 24, 0.85)
  }
</style>
