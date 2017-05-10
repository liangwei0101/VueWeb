<template>
  <div class="hello">
    <!-- START BREADCRUMB -->
    <ul class="breadcrumb">
      <li><a>主页</a></li>
      <li class="active">运输任务管理</li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- PAGE TITLE -->
    <div class="page-title">
      <h2><span class="fa fa-arrow-circle-o-left"></span> 运输管理</h2>
    </div>
    <!-- END PAGE TITLE -->

    <!-- PAGE CONTENT WRAPPER -->
    <div class="page-content-wrap">
      <div class="row">
        <div class="col-md-12">

          <div class="row">
            <div class="col-md-12">
              <!-- START RANGE SLIDER -->
              <div class="panel panel-default">
              <div class="panel-heading">
              <h3 class="panel-title">任务过程</h3>
            </div>
            <div class="panel-body" >
              <ul class="steps ">
                <li id="begin"><strong>开始</strong></li>
                <li v-for="(item,index) in tempObject.onTheWayPlace">
                  <strong>{{item}}</strong>
                </li>
                <li class="errorStep" v-show="errorShow"><strong>错误</strong></li>
                <li id="end" class="active" v-show="endShow"><strong>结束</strong></li>
              </ul>
            </div>
          </div>
              <!-- END RANGE SLIDER -->
            </div>
          </div>

          <!-- 任务列表 -->
          <div class="page-content-wrap">

            <div class="row">
              <div class="col-md-12">
                <!-- LIST GROUP WITH BADGES -->
                <div class="panel panel-default ">
                  <div class="panel-heading">
                    <h3 class="panel-title">运输任务列表</h3>
                    <button class="btn btn-success pull-right" @click="addDialogShow"><i class="fa fa-bars"></i> 新 增</button>
                  </div>
                  <!-- CONTACTS WITH STATUS -->
                    <div class="panel-body list-group list-group-contacts">
                      <a class="list-group-item " v-for="item in ShowInfo" @click="clickList(item)">
                        <i class="fa fa-truck pull-right" :class="{errorStatus: item.errorStatus,
                                                                       okStatus: item.okStatus,
                                                                       waitStatus: item.waitStatus,
                                                                       endStatus: item.endStatus}">
                        </i>
                        <span class="contacts-title">{{item.TaskName}}</span>
                        <p>创建于{{item.createDate}}-{{item.createTime}}</p>
                      </a>
                    </div>
                  <!-- CONTACTS WITH STATUS -->
                </div>
                  <!-- END CONTACTS WITH STATUS -->
              </div>
            </div>

          </div>
          <!-- 任务列表 -->

          <!-- 任务详情 -->
          <div class="page-content-wrap">
            <div class="row">
              <div class="col-md-12">
                <!-- LIST GROUP WITH BADGES -->
                <!-- START PANEL WITH CONTROL CLASSES -->
                <div class="panel panel-warning">
                  <div class="panel-heading">
                    <h3 class="panel-title">任务详情</h3>
                    <ul class="panel-controls">
                      <li><a @click="updateDialogShow" data-toggle="tooltip" data-placement="bottom" title="修改"><span class="fa fa-pencil"></span></a></li>
                      <li><a @click="removeTipWind" data-toggle="tooltip" data-placement="bottom" title="删除"><span class="fa fa-trash-o"></span></a></li>
                      <li><a class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                      <li><a class="panel-collapse" data-toggle="tooltip" data-placement="bottom" title="折叠"><span class="fa fa-angle-down"></span></a></li>
                      <li><a class="panel-remove" data-toggle="tooltip" data-placement="bottom" title="关闭"><span class="fa fa-times"></span></a></li>
                    </ul>
                  </div>
                  <div class="panel-body">
                    <h5>
                      <strong class="col-md-6">运输任务名称:<font class="text-info">{{tempObject.TaskName}}</font></strong>
                      <strong class="col-md-6">负责人:<font class="text-info"> {{tempObject.principal}}</font></strong>
                    </h5><br><br>
                    <h5>
                      <strong class="col-md-6">联系电话:<font class="text-info"> {{tempObject.tel}}</font></strong>
                      <strong class="col-md-6">车牌号:<font class="text-info"> {{tempObject.numberPlate}}</font></strong>

                    </h5> <br><br>
                    <h5>
                      <strong class="col-md-6">出发地:<font class="text-info">{{tempObject.StartPlace}}</font></strong>
                      <strong class="col-md-6">目的地:<font class="text-info">{{tempObject.EndPlace}}</font></strong>
                    </h5> <br><br>
                    <h5>
                      <strong class="col-md-6">状态:<font class="text-info">{{tempObject.status}}</font></strong>
                      <strong class="col-md-6">在途: <font class="text-info">{{tempObject.onTheWayPlace}}</font></strong>
                    </h5> <br><br>
                    <h5>
                      <strong  class="col-md-12">备注:<font class="text-info"> {{tempObject.remark}}</font></strong>
                    </h5>
                  </div>
                </div>
                <!-- END PANEL WITH CONTROL CLASSES -->
                <!-- END LIST GROUP WITH BADGES -->

              </div>
            </div>

          </div>
          <!-- 任务详情  -->

        </div>
      </div>
    </div>
    <!-- END PAGE CONTENT WRAPPER -->

    <!-- 新增 -->
    <div class="dialog" :class="addIsAbleShowClass" role="dialog" style="z-index: 111">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="addDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">运输任务新增</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateAddForm('addForm')" data-vv-scope="addForm">
                  <div class="form-group">
                    <label class="col-md-2 control-label">运输任务名称</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.运输任务名称')}">
                      <input type="text" name="运输任务名称" class="form-control" placeholder="运输任务名称" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.运输任务名称') }"
                             v-model="addContent.TaskName"/>
                      <i v-show="errors.has('addForm.运输任务名称')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.运输任务名称')" class="help is-danger alarm">{{ errors.first('addForm.运输任务名称') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">负责人</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.负责人')}">
                      <input type="text" name="负责人" class="form-control" placeholder="负责人姓名" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.负责人') }"
                             v-model="addContent.principal" />
                      <i v-show="errors.has('addForm.负责人')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.负责人')" class="help is-danger alarm">{{ errors.first('addForm.负责人') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">联系电话</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.联系电话')}">
                      <input type="text" name="联系电话" class="form-control" placeholder="联系电话"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.联系电话') }"
                             v-model="addContent.tel" />
                      <i v-show="errors.has('addForm.联系电话')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.联系电话')" class="help is-danger alarm">{{ errors.first('addForm.联系电话') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">出发地</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.出发地')}">
                      <input type="text"  name="出发地" class="form-control" placeholder="出发地" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.出发地') }"
                             v-model="addContent.StartPlace" />
                      <i v-show="errors.has('addForm.出发地')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.出发地')" class="help is-danger alarm">{{ errors.first('addForm.出发地') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">在途地点</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.在途地点')}">
                      <input type="text"  name="在途地点" class="form-control" placeholder="如:赣州-南昌-广州-深圳 ，以'-'连接"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.在途地点') }"
                             v-model="OnPlace" />
                      <i v-show="errors.has('addForm.在途地点')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.在途地点')" class="help is-danger alarm">{{ errors.first('addForm.在途地点') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">目的地</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.目的地')}">
                      <input type="text"  name="目的地" class="form-control" placeholder="目的地" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.目的地') }"
                             v-model="addContent.EndPlace" />
                      <i v-show="errors.has('addForm.目的地')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.目的地')" class="help is-danger alarm">{{ errors.first('addForm.目的地') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">车牌号</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.车牌号')}">
                      <input type="text" name="车牌号"  class="form-control" placeholder="车牌号" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.车牌号') }"
                             v-model="addContent.numberPlate"/>
                      <i v-show="errors.has('addForm.车牌号')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.车牌号')" class="help is-danger alarm">{{ errors.first('addForm.车牌号') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">状态</label>
                    <div class="col-md-10">
                      <select class="form-control" @change="SelectChange" v-model="selectedType">
                        <option v-for="option in selectStatus" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">备注</label>
                    <div class="col-md-10">
                      <textarea class="form-control" rows="5" v-model="addContent.remark"></textarea>
                    </div>
                  </div>

                  <div class="">
                    <button class="pull-left col-md-offset-4 col-sm-offset-4 btn btn-info" type="button" @click="errors.clear('addForm')"><span class="fa fa-fire"></span> 复原</button>
                    <button type="submit" class="pull-left col-md-offset-1 col-sm-offset-1 btn btn-success"><span class="fa fa-fire"></span> 保存</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 新增-->

    <!-- 修改 -->
    <div class="dialog" :class="updateIsAbleShowClass" role="dialog" style="z-index: 111">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="updateDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">运输任务修改</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateUpateForm('updateForm')" data-vv-scope="updateForm">
                  <div class="form-group">
                    <label class="col-md-2 control-label">运输任务名称</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.运输任务名称')}">
                      <input type="text" name="运输任务名称" class="form-control" placeholder="运输任务名称" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.运输任务名称') }"
                             v-model="updateContent.TaskName"/>
                      <i v-show="errors.has('updateForm.运输任务名称')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.运输任务名称')" class="help is-danger alarm">{{ errors.first('updateForm.运输任务名称') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">负责人</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.负责人')}">
                      <input type="text" name="负责人" class="form-control" placeholder="负责人姓名" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.负责人') }"
                             v-model="updateContent.principal" />
                      <i v-show="errors.has('updateForm.负责人')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.负责人')" class="help is-danger alarm">{{ errors.first('updateForm.负责人') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">联系电话</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.联系电话')}">
                      <input type="text" name="联系电话" class="form-control" placeholder="联系电话"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.联系电话') }"
                             v-model="updateContent.tel" />
                      <i v-show="errors.has('updateForm.联系电话')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.联系电话')" class="help is-danger alarm">{{ errors.first('updateForm.联系电话') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">出发地</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.出发地')}">
                      <input type="text"  name="出发地" class="form-control" placeholder="出发地" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.出发地') }"
                             v-model="updateContent.StartPlace" />
                      <i v-show="errors.has('updateForm.出发地')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.出发地')" class="help is-danger alarm">{{ errors.first('updateForm.出发地') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">在途地点</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.在途地点')}">
                      <input type="text"  name="在途地点" class="form-control" placeholder="在途地点"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.在途地点') }"
                             v-model="OnPlace" />
                      <i v-show="errors.has('updateForm.在途地点')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.在途地点')" class="help is-danger alarm">{{ errors.first('updateForm.在途地点') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">目的地</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.目的地')}">
                      <input type="text"  name="目的地" class="form-control" placeholder="目的地" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.目的地') }"
                             v-model="updateContent.EndPlace" />
                      <i v-show="errors.has('updateForm.目的地')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.目的地')" class="help is-danger alarm">{{ errors.first('updateForm.目的地') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">车牌号</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.车牌号')}">
                      <input type="text" name="车牌号"  class="form-control" placeholder="车牌号" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.车牌号') }"
                             v-model="updateContent.numberPlate"/>
                      <i v-show="errors.has('updateForm.车牌号')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.车牌号')" class="help is-danger alarm">{{ errors.first('updateForm.车牌号') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">状态</label>
                    <div class="col-md-10">
                      <select class="form-control" @change="SelectChange" v-model="selectedType">
                        <option v-for="option in selectStatus" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">备注</label>
                    <div class="col-md-10">
                      <textarea class="form-control" rows="5" v-model="updateContent.remark"></textarea>
                    </div>
                  </div>

                  <div>
                    <button type="submit" class="pull-left col-md-offset-6 col-sm-offset-6 btn btn-success"><span class="fa fa-fire"></span> 保存</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 修改-->

    <!--删除文档提示框-->
    <div class="message-box message-box-warning animated fadeIn del" :class="delClass" >
      <div class="mb-container">
        <div class="mb-middle">
          <div class="mb-title"><span class="fa fa-times"></span> 删除 <strong>数据</strong> ?</div>
          <div class="mb-content">
            <p>您确定要删除要此数据吗？</p>
            <p>如果您确定，请按Yes.</p>
          </div>
          <div class="mb-footer">
            <div class="pull-right">
              <button class="btn btn-success btn-lg mb-control-yes"  @click="removeTaskInfo">Yes</button>
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
  import {getCookie, CookieUserType} from '../services/Cookie'
  Vue.use(VueResource)

  export default {
    data: function () {
      return {
        addIsAbleShowClass: {
          modal: true,
          fade: true
        },
        updateIsAbleShowClass: {
          modal: true,
          fade: true
        },
        addContent: {
          id: '',
          userid: '',
          numberPlate: '',
          TaskName: '',
          StartPlace: '',
          EndPlace: '',
          principal: '',
          tel: '',
          onTheWayPlace: [],
          status: '',
          remark: '',
          createDate: '',
          createTime: '',
          ShowStatusClass: {
            errorStatus: 'errorStatus',
            okStatus: 'okStatus',
            waitStatus: 'waitStatus',
            endStatus: 'waitStatus'
          }
        },
        updateContent: {},
        ShowInfo: [],
        AllInfo: [],
        tempObject: {},
        selectedType: '0',
        selectStatus: [
          { text: '待开始', value: '0' },
          { text: '进行中', value: '1' },
          { text: '结束', value: '2' },
          { text: '错误', value: '-1' }],
        delClass: {
          open: false
        },
        test: ['深圳', '东莞东', '惠州', '河源', '龙川', '赣州'],
        Cookie: {
          userid: '',
          name: ''
        },
        content: [],
        endShow: false,
        errorShow: false,
        OnPlace: ''
      }
    },
    mounted: function () {
      this.vueCookie()
      this.getTaskInfo()
    },
    methods: {
      addDialogShow () {
        this.addIsAbleShowClass.modal = false
        this.addIsAbleShowClass.fade = false
      },
      addDialogClose () {
        this.addIsAbleShowClass.modal = true
        this.addIsAbleShowClass.fade = true
      },
      updateDialogShow () {
        this.updateIsAbleShowClass.modal = false
        this.updateIsAbleShowClass.fade = false
        this.updateContent = this.tempObject
        this.joinPlace()
        if (this.tempObject.status === '进行中') {
          this.selectedType = '1'
        } else if (this.tempObject.status === '结束') {
          this.selectedType = '2'
        } else if (this.tempObject.status === '待开始') {
          this.selectedType = '0'
        } else if (this.tempObject.status === '错误') {
          this.selectedType = '-1'
        }
      },
      updateDialogClose () {
        this.updateIsAbleShowClass.modal = true
        this.updateIsAbleShowClass.fade = true
      },
      removeTipWind () {
        this.delClass.open = true
      },
      closeTipWind () {
        this.delClass.open = false
      },
      vueCookie () {
        this.Dic = getCookie()
        this.Cookie.userid = this.Dic['userid']
      },
      IdMake () {
        var myDate = new Date()
        var temp = this.Cookie.userid + '&'
        temp += myDate.getFullYear()
        temp += myDate.getMonth() + 1
        temp += myDate.getDate()
        temp += myDate.getHours()
        temp += myDate.getMinutes()
        temp += myDate.getSeconds()
        this.addContent.id = temp
      },
      addTaskInfo () {
        this.IdMake()
        this.getDate()
        this.getTime()
        this.splitPlace()
        this.addContent.userid = this.Cookie.userid
        this.addContent.status = this.selectedType
        this.selectedType = '0'
        this.OnPlace = ''
        var addUrl = 'http://localhost:3000/transportTask/save'
        var Params = this.addContent
        var resource = this.$resource(addUrl)
        resource.save(addUrl, Params)
          .then((response) => {
            this.$Message.success('增加用户信息成功！')
            this.addContent = {}
            this.addDialogClose()
            this.getTaskInfo()
          })
      },
      removeTaskInfo () {
        this.closeTipWind()
        var delUrl = 'http://localhost:3000/transportTask/remove'
        var Params = {id: this.tempObject.id}
        var resource = this.$resource(delUrl)
        resource.save(delUrl, Params)
          .then((response) => {
            this.$Message.success('删除该数据成功！')
            this.getTaskInfo()
          })
      },
      getTaskInfo () {
        var getUrl = 'http://localhost:3000/transportTask/get'
        if (CookieUserType() === '2') {
          getUrl = 'http://localhost:3000/transportTask/get' + '/' + this.Cookie.userid
        }
        var resource = this.$resource(getUrl)
        resource.get()
          .then((response) => {
            this.ShowInfo = response.body
            this.setCarStatus()
            if (this.ShowInfo.length > 0) {
              this.tempObject = this.ShowInfo[0]
              this.clickList(this.ShowInfo[0])
            }
          })
      },
      updateTaskInfo () {
        var updateUrl = 'http://localhost:3000/transportTask/update' + '/' + this.updateContent.id
        var Params = this.updateContent
        this.updateContent.status = this.selectedType
        var resource = this.$resource(updateUrl)
        resource.save(updateUrl, Params)
          .then((response) => {
            this.$Message.success('修改用户信息成功！')
            this.updateDialogClose()
            this.getTaskInfo()
          })
      },
      validateAddForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.addTaskInfo()
          }
        })
      },
      validateUpateForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.updateTaskInfo()
          }
        })
      },
      clickList (item) {
        this.setValue(item)
      },
      SelectChange () {
        this.addContent.status = this.selectedType
      },
      getDate: function () {
        var tempDate = new Date()
        this.addContent.createDate = tempDate.toLocaleDateString()
      },
      getTime: function () {
        var tempDate = new Date()
        this.addContent.createTime = tempDate.getHours() + ':'
        this.addContent.createTime += tempDate.getMinutes()
      },
      setCarStatus () {
        //  设置图标颜色状态
        for (var i = 0; i < this.ShowInfo.length; i++) {
          if (this.ShowInfo[i].status === '0') {
            this.ShowInfo[i].waitStatus = true
          } else if (this.ShowInfo[i].status === '1') {
            this.ShowInfo[i].okStatus = true
          } else if (this.ShowInfo[i].status === '2') {
            this.ShowInfo[i].endStatus = true
          } else {
            this.ShowInfo[i].errorStatus = true
          }
        }
      },
      translate (value) {
        if (value === '0') {
          this.tempObject.status = '待开始'
        } else if (value === '1') {
          this.tempObject.status = '进行中'
        } else if (value === '2') {
          this.tempObject.status = '结束'
        } else if (value === '-1') {
          this.tempObject.status = '错误'
        }
      },
      setValue (item) {
        this.tempObject = item
        this.translate(item.status)
        if (this.tempObject.status === '进行中') {
          this.endShow = false
          this.errorShow = false
        } else if (this.tempObject.status === '结束') {
          this.endShow = true
          this.errorShow = false
        } else if (this.tempObject.status === '错误') {
          this.endShow = false
          this.errorShow = true
        } else if (this.tempObject.status === '待开始') {
          this.endShow = false
          this.errorShow = false
        }
      },
      splitPlace () {
        if (this.OnPlace.indexOf('-')) {
          this.addContent.onTheWayPlace = this.OnPlace.split('-')
        } else {
          this.addContent.onTheWayPlace = this.OnPlace
        }
      },
      joinPlace () {
        if (this.tempObject.onTheWayPlace.length > 1) {
          this.OnPlace = ''
          this.OnPlace = this.tempObject.onTheWayPlace.join('-')
        } else {
          this.OnPlace = ''
          this.OnPlace = this.tempObject.onTheWayPlace[0]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog{
    padding-top: 55px;
    overflow-y:scroll;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .del{
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .alarm{
    color: rgba(255, 55, 24, 0.85);
  }
  .errorStatus{
    color: rgba(255, 55, 24, 0.85);
    margin-top: 15px;
  }
  .errorStep{
    color: rgba(255, 55, 24, 0.85);
  }

  .okStatus{
    color: #18A890;
    margin-top: 15px;
  }
  .okStep{
    color: #18A890;
  }
  .endStep{
    color: #0376c0;
  }
  .waitStatus{
    color: #e0e0e0;
    margin-top: 15px;
  }
  .waitStep{
    background-color: #e0e0e0;
  }
  .endStatus{
    color: #0376c0;
    margin-top: 15px;
  }
  .endStep{
    background-color: #0376c0;
  }

  .steps {
    position: relative;
    margin-bottom: 30px;
    counter-reset: step;  /*创建步骤数字计数器*/
    z-index: 1;
  }
  /*步骤描述*/
  .steps li {
    list-style-type: none;
    font-size: 12px;
    text-align: center;
    width: 11%;
    position: relative;
    float: left;
  }

  /*步骤数字*/
  .steps li:before {
    display: block;
    content: counter(step); /*设定计数器内容*/
    counter-increment: step;  /*计数器值递增*/
    width: 32px;
    height: 32px;
    background-color: #18A890;
    line-height: 32px;
    border-radius: 32px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin: 0 auto 8px auto;
  }

  /*连接线*/
  .steps li ~ li:after {
    content: '';
    width: 100%;
    height: 3px;
    background-color: #019875;
    position: absolute;
    left: -50%;
    top: 15px;
    z-index: -1; /*放置在数字层后面*/
  }

  /*将当前/完成步骤之前连接线变绿*/
  .steps li.active:after {
    background-color: #019875;
  }

  /*将当前/完成步骤之后的数字及连接线变灰*/
  .steps li.active ~ li:before,
  .steps li.active ~ li:after {
    background-color: #e0e0e0;
  }
</style>
