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
            <a class="list-group-item"><span class="fa fa-flag"></span>公文列表</a>
            <a class="list-group-item" v-for="item in items" @click="showContent(item)"><span class="fa fa-file-o"></span>{{item.title + '---'+ item.createDateTime}}</a>
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
                  :editor-content="htmlForEditor">
                </vue-editor>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <button class="btn btn-danger" @click="isAbleDelContent"> <span class="fa fa-times"></span>删除</button>
                <div class="pull-right">
                  <button class="btn btn-success" @click="textIdMake"><span class="fa fa-envelope"></span> 保存</button>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
      <!-- END CONTENT FRAME BODY -->
    </div>

    <!--删除文档提示框-->
    <div class="message-box animated fadeIn" :class="delClass" >
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
        }
      }
    },
    components: {
      VueEditor
    },
    mounted: function () {
      this.getContents()
      this.getDate()
      this.getTime()
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
            if (this.items.length > 0) {
              var temp = this.items[0]
              this.title = temp.title
              this.createDate = temp.createDateTime
              this.selected = temp.IsPublic
              this.htmlForEditor = temp.htmlForEditor
              this.author = temp.author
              this.textID = temp.textID
            }
          })
      },
      saveContents: function (contentsToBeSaved) {
        var index = -1
        var Params = {IsPublic: this.selected,
          title: this.title,
          author: this.author,
          htmlForEditor: contentsToBeSaved,
          createDateTime: this.createDate,
          textID: this.textID
        }
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].textID === Params.textID) {
            index = i
          }
        }
        if (index === -1) {
          this.addContent(contentsToBeSaved)
        } else {
          this.updateContent(contentsToBeSaved)
        }
      },
      getDate: function () {
        var tempDate = new Date()
        this.createDate = tempDate.toLocaleDateString()
      },
      getTime: function () {
        var tempDate = new Date()
        this.createTime = tempDate.toLocaleTimeString()
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
      isAbleDelContent: function () {
        if (this.textID === '') {
          this.$message({
            showClose: true,
            message: '此为空文本，请先添加再按保存！',
            type: 'warning'
          })
        } else {
          this.delClass.open = true
        }
      },
      addContent: function (contentsToBeSaved) {
        this.textIdMake()
        var Params = {IsPublic: this.selected,
          title: this.title,
          author: this.author,
          htmlForEditor: contentsToBeSaved,
          createDateTime: this.createDate,
          textID: this.textID
        }
        var saveUrl = 'http://localhost:3000/workText'
        var resource = this.$resource(saveUrl)
        resource.save(saveUrl, Params)
          .then((response) => {
            this.items.push(Params)
            this.$message({
              message: '工作文档保存成功！',
              type: 'success'
            })
            this.getContents()
          })
      },
      updateContent: function () {
        this.$message({
          message: '工作文档更新成功！',
          type: 'success'
        })
      },
      removeContent: function () {
        this.closeTipWind()
        var delUrl = 'http://localhost:3000/deleteWorkText'
        var Params = {IsPublic: this.selected,
          title: this.title,
          author: this.author,
          textID: this.textID
        }
        var index = -1
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].textID === Params.textID) {
            index = i
          }
        }
        var resource = this.$resource(delUrl)
        resource.save(delUrl, Params)
          .then((response) => {
          //  删除左边栏的数据
            this.items.splice(index, 1)
            this.$message({
              message: '工作文档删除成功！',
              type: 'success'
            })
            this.addContent()
          })
      },
      clearContent: function () {
        this.title = ''
        this.selected = '0'
        this.author = ''
        this.htmlForEditor = ''
        this.textID = ''
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
