<template>
  <div class="hello">

    <!-- START BREADCRUMB -->
    <ul class="breadcrumb push-down-0">
      <li><a href="#">用户</a></li>
      <li class="active"><a href="#">车辆信息管理</a></li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- START CONTENT FRAME -->
    <div class="content-frame">
      <!-- START CONTENT FRAME TOP -->
      <div class="content-frame-top">
        <div class="page-title">
          <h2><span class="fa fa-pencil"></span> 车辆信息管理</h2>
        </div>
      </div>
      <!-- END CONTENT FRAME TOP -->

      <!-- START RESPONSIVE TABLES -->
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">

            <!-- START DATATABLE EXPORT -->
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title col-md-3">
                  <input v-model="selectText" class="form-control" @keyup.enter="selectInfo" placeholder="请输入负责人姓名"/>
                </h3>
                <div class="btn-group " style="float: left">
                  <button class="btn btn-info" @click="selectInfo"><i class="glyphicon glyphicon-zoom-out"></i>查 询</button>
                </div>
                <div class="btn-group pull-right">
                  <button class="btn btn-success" @click="addDialogShow"><i class="fa fa-bars"></i> 新 增</button>
                </div>

              </div>
              <div class="panel-body">
                <table class="table table-bordered table-striped table-actions">
                  <thead>
                  <tr>
                    <th width="100">车牌号</th>
                    <th width="100">负责人</th>
                    <th width="100">电话</th>
                    <th width="100">车辆所在地</th>
                    <th width="100">使用状态</th>
                    <th width="100">车辆品牌</th>
                    <th width="100">更新时间</th>
                    <th width="100">备注</th>
                    <th class="text-center" width="100">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="Info in ShowInfo">
                    <td>{{Info.numberPlate}}</td>
                    <td>{{Info.principal}}</td>
                    <td>{{Info.tel}}</td>
                    <td>{{Info.location}}</td>
                    <td>{{Info.status}}</td>
                    <td>{{Info.brand}}</td>
                    <td>{{Info.time}}</td>
                    <td>{{Info.remark}}</td>
                    <td>
                      <ul class="panel-controls pull-left" style="padding-left:45px;">
                        <li><a class="panel-collapse" data-toggle="tooltip" data-placement="bottom" title="编辑" @click="updateWind(Info)"><span class="fa fa-pencil"></span></a></li>
                        <li><a class="panel-remove" data-toggle="tooltip" data-placement="bottom" title="删除" @click="TipWind(Info)"><span class="glyphicon glyphicon-trash"></span></a></li>
                      </ul>
                    </td>
                  </tr>
                  </tbody>
                </table>


                <label class="pull-left" style="padding-left: 0px; padding-top:7px;vertical-align: middle;">总条数为：{{this.pageOne.totalItems}}条</label>
                <div class="col-md-1" style="float: left">
                  <select class="form-control"  v-model="selected" @change="selectVal">
                    <option class="text-center" v-for="option in options" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <!--分页控件-->
                <pagination :current-page="pageOne.currentPage"
                            :total-pages="pageOne.totalPages"
                            :totalItems="pageOne.totalItems"
                            :itemsPerPage="pageOne.itemsPerPage"
                            @page-changed="pageOneChanged">
                </pagination>
                <!--分页控件-->
              </div>
              <!-- END DATATABLE EXPORT -->

            </div>
          </div>

        </div>
      </div>
      <!-- END RESPONSIVE TABLES -->

    </div>
    <!-- START CONTENT FRAME -->

    <!-- START addDilog PREVIEW -->
    <div class="dialog" :class="addIsAbleShowClass" role="dialog" style="z-index: 111">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="addDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">车辆信息新增</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateAddForm('addForm')" data-vv-scope="addForm">
                  <div class="form-group">
                    <label class="col-md-2 control-label">车牌号</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.车牌号')}">
                      <input type="text" name="车牌号" class="form-control" placeholder="车牌号" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.车牌号') }"
                             v-model="addContent.numberPlate"/>
                      <i v-show="errors.has('addForm.车牌号')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.车牌号')" class="help is-danger alarm">{{ errors.first('addForm.车牌号') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">负责人</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.负责人')}">
                      <input type="text" name="负责人" class="form-control" placeholder="负责人" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.负责人') }"
                             v-model="addContent.principal" />
                      <i v-show="errors.has('addForm.负责人')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.负责人')" class="help is-danger alarm">{{ errors.first('addForm.负责人') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">电话</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.电话')}">
                      <input type="text" name="电话" class="form-control" placeholder="电话"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.电话') }"
                             v-model="addContent.tel" />
                      <i v-show="errors.has('addForm.电话')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.电话')" class="help is-danger alarm">{{ errors.first('addForm.电话') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">车辆所在地</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.车辆所在地')}">
                      <input type="text" name="车辆所在地" class="form-control" placeholder="车辆所在地"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.车辆所在地') }"
                             v-model="addContent.location" />
                      <i v-show="errors.has('addForm.车辆所在地')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.车辆所在地')" class="help is-danger alarm">{{ errors.first('addForm.车辆所在地') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">使用状态</label>
                    <div class="col-md-10">
                      <select class="form-control" @change="TypeSelectChange" v-model="selectedType">
                        <option v-for="option in selectRadiationType" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">车辆品牌</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.车辆品牌')}">
                      <input type="text"  name="车辆品牌" placeholder="车辆品牌" class="form-control" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.车辆品牌') }"
                             v-model="addContent.brand" />
                      <i v-show="errors.has('addForm.车辆品牌')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.车辆品牌')" class="help is-danger alarm">{{ errors.first('addForm.车辆品牌') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">备注</label>
                    <div class="col-md-10">
                      <textarea class="form-control" rows="5" v-model="addContent.remark"></textarea>
                    </div>
                  </div>

                  <div class="">
                    <button class="pull-left col-md-offset-4 col-sm-offset-4 btn btn-info" type="button" @click="errors.clear('addForm')"><span class="fa fa-times-circle-o"></span> 复原</button>
                    <button type="submit" class="pull-left col-md-offset-1 col-sm-offset-1 btn btn-success"><span class="fa fa-fire"></span> 保存</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- END MODAL ICON PREVIEW -->

    <!-- START addDilog PREVIEW -->
    <div class="dialog" :class="updateIsAbleShowClass" role="dialog" style="z-index: 111">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="updateDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">车辆信息修改</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateUpateForm('updateForm')" data-vv-scope="updateForm">
                  <div class="form-group">
                    <label class="col-md-2 control-label">车牌号</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.车牌号')}">
                      <input type="text" name="车牌号" class="form-control" placeholder="车牌号" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.车牌号') }"
                             v-model="updateContent.numberPlate"/>
                      <i v-show="errors.has('updateForm.车牌号')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.车牌号')" class="help is-danger alarm">{{ errors.first('updateForm.车牌号') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">负责人</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.负责人')}">
                      <input type="text" name="负责人" class="form-control" placeholder="负责人" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.负责人') }"
                             v-model="updateContent.principal" />
                      <i v-show="errors.has('updateForm.负责人')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.负责人')" class="help is-danger alarm">{{ errors.first('updateForm.负责人') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">电话</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.电话')}">
                      <input type="text" name="电话" class="form-control" placeholder="电话"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.电话') }"
                             v-model="updateContent.tel" />
                      <i v-show="errors.has('updateForm.电话')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.电话')" class="help is-danger alarm">{{ errors.first('updateForm.电话') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">车辆所在地</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.车辆所在地')}">
                      <input type="text" name="车辆所在地" class="form-control" placeholder="车辆所在地"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.车辆所在地') }"
                             v-model="updateContent.location" />
                      <i v-show="errors.has('updateForm.车辆所在地')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.车辆所在地')" class="help is-danger alarm">{{ errors.first('updateForm.车辆所在地') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">使用状态</label>
                    <div class="col-md-10">
                      <select class="form-control" @change="TypeSelectChange" v-model="selectedType">
                        <option v-for="option in selectRadiationType" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">车辆品牌</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.车辆品牌')}">
                      <input type="text"  name="车辆品牌" placeholder="车辆品牌" class="form-control" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.车辆品牌') }"
                             v-model="updateContent.brand" />
                      <i v-show="errors.has('updateForm.车辆品牌')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.车辆品牌')" class="help is-danger alarm">{{ errors.first('updateForm.车辆品牌') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">备注</label>
                    <div class="col-md-10">
                      <textarea class="form-control" rows="5" v-model="updateContent.remark"></textarea>
                    </div>
                  </div>

                  <div class="">
                    <button class="pull-left col-md-offset-4 col-sm-offset-4 btn btn-info" type="button" @click="errors.clear('updateForm')"><span class="fa fa-times-circle-o"></span> 复原</button>
                    <button type="submit" class="pull-left col-md-offset-1 col-sm-offset-1 btn btn-success"><span class="fa fa-fire"></span> 保存</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- START addDilog PREVIEW -->

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
              <button class="btn btn-success btn-lg mb-control-yes"  @click="removeCarInfo">Yes</button>
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
  import Pagination from './Pagination.vue'
  import VueResource from 'vue-resource'
  import {getCookie, CookieUserType} from '../services/Cookie'
  import VeeValidate, { Validator } from 'vee-validate'
  import messages from '../assets/js/zh_CN'
  Validator.updateDictionary({
    zh_CN: {
      messages
    }
  })
  const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
  }
  Vue.use(VueResource)
  Vue.use(VeeValidate, config)

  export default {
    components: { Pagination },
    data () {
      return {
        addContent: {
          id: '',
          userid: '',
          numberPlate: '',
          principal: '',
          tel: '',
          location: '',
          status: '',
          brand: '',
          time: '',
          remark: ''
        },
        selectText: '',
        //  默认10条每页
        selected: '10',
        options: [
          { text: '10条/页', value: '10' },
          { text: '20条/页', value: '20' },
          { text: '50条/页', value: '50' },
          { text: '100条/页', value: '100' }
        ],
        selectedType: '0',
        selectRadiationType: [
          { text: '可用', value: '0' },
          { text: '不可用', value: '1' }],
        addIsAbleShowClass: {
          modal: true,
          fade: true
        },
        updateIsAbleShowClass: {
          modal: true,
          fade: true
        },
        pageOne: {
          currentPage: 1,
          totalPages: 10,
          totalItems: 0,
          itemsPerPage: 10
        },
        HideData: false,
        ShowInfo: [],
        AllInfo: [],
        hideContent: {},
        delClass: {
          open: false
        },
        Index: [],
        temp: '',
        tempTime: '',
        updateContent: {},
        Cookie: {
          userid: '',
          name: ''
        }
      }
    },
    mounted: function () {
      this.vueCookie()
      this.getCarInfo()
    },
    methods: {
      addDialogShow: function () {
        this.addIsAbleShowClass.modal = false
        this.addIsAbleShowClass.fade = false
      },
      addDialogClose () {
        this.addIsAbleShowClass.modal = true
        this.addIsAbleShowClass.fade = true
      },
      updateDialogClose () {
        this.updateIsAbleShowClass.modal = true
        this.updateIsAbleShowClass.fade = true
      },
      addCarInfo: function () {
        this.IdMake()
        this.timeMake()
        console.log(this.addContent)
        this.addContent.userid = this.Cookie.userid
        this.addContent.status = this.selectedType
        this.addContent.time = this.tempTime
        var addUrl = 'http://localhost:3000/car/save'
        var Params = this.addContent
        var resource = this.$resource(addUrl)
        resource.save(addUrl, Params)
          .then((response) => {
            this.$Message.success('保存用户信息成功！')
            this.addContent = []
            this.addDialogClose()
            this.getCarInfo()
          })
      },
      removeCarInfo () {
        this.closeTipWind()
        var delUrl = 'http://localhost:3000/car/remove'
        var Params = {id: this.temp}
        var resource = this.$resource(delUrl)
        resource.save(delUrl, Params)
          .then((response) => {
            this.$Message.success('记录删除成功！')
            this.getCarInfo()
          })
      },
      updateCarInfo () {
        this.timeMake()
        var updateUrl = 'http://localhost:3000/car/update' + '/' + this.updateContent.id
        this.updateContent.status = this.selectedType
        this.updateContent.time = this.tempTime
        var Params = this.updateContent
        var resource = this.$resource(updateUrl)
        resource.save(updateUrl, Params)
          .then((response) => {
            this.$Message.success('修改记录成功！')
            this.updateDialogClose()
            this.getCarInfo()
          })
      },
      getCarInfo () {
        var getUrl = 'http://localhost:3000/car/get'
        if (CookieUserType() === '2') {
          getUrl = 'http://localhost:3000/car/get' + '/' + this.Cookie.userid
        }
        var vm = this
        var resource = vm.$resource(getUrl)
        resource.get()
          .then((response) => {
            this.AllInfo = response.body
            console.log(this.AllInfo)
            this.setPagination(this.AllInfo)
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      selectVal () {
        this.pageOne.itemsPerPage = this.selected
        this.pageOne.totalPages = Math.ceil(this.AllInfo.length / this.selected)
        console.log('-设置条数-')
        this.ShowInfo = []
        for (var i = 0; i < this.selected && i < this.AllInfo.length; i++) {
          this.ShowInfo.push(this.AllInfo[i])
        }
      },
      pageOneChanged: function (pageNum) {
        this.pageOne.currentPage = pageNum
        this.ShowInfo = []
        for (var i = (pageNum - 1) * this.selected; i < pageNum * this.selected && i < this.AllInfo.length; i++) {
          if (this.AllInfo[i].RadiationType === '0') {
            this.AllInfo[i].status = '可用'
          } else if (this.AllInfo[i].RadiationType === '0') {
            this.AllInfo[i].status = '不可用'
          }
          this.ShowInfo.push(this.AllInfo[i])
        }
      },
      expansion: function (Info) {
        this.hideContent = Info
        if (this.HideData === false) {
          this.HideData = true
        } else {
          this.HideData = false
        }
      },
      vueCookie: function () {
        this.Dic = getCookie()
        this.Cookie.userid = this.Dic['userid']
      },
      IdMake: function () {
        var myDate = new Date()
        var temp = this.addContent.userid + '&'
        temp += myDate.getFullYear()
        temp += myDate.getMonth() + 1
        temp += myDate.getDate()
        temp += myDate.getHours()
        temp += myDate.getMinutes()
        temp += myDate.getSeconds()
        this.addContent.id = temp
      },
      setPagination (AllInfo) {
        this.ShowInfo = []
        this.pageOne.totalItems = AllInfo.length
        this.pageOne.totalPages = Math.ceil(this.AllInfo.length / this.selected)
        for (var i = 0; i < this.selected && i < this.AllInfo.length; i++) {
          if (this.AllInfo[i].status === '0') {
            this.AllInfo[i].status = '可用'
          } else if (this.AllInfo[i].status === '1') {
            this.AllInfo[i].status = '不可用'
          }
          this.ShowInfo.push(this.AllInfo[i])
        }
      },
      TypeSelectChange () {
        console.log(this.selectedType)
        this.addContent.status = this.selectedType
      },
      closeTipWind: function () {
        this.delClass.open = false
      },
      TipWind (Info) {
        this.delClass.open = true
        this.temp = Info.id
      },
      updateWind (Info) {
        this.updateIsAbleShowClass.modal = false
        this.updateIsAbleShowClass.fade = false
        if (Info.status === '可用') {
          this.selectedType = '0'
        } else {
          this.selectedType = '1'
        }
        this.updateContent = Info
      },
      validateAddForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.addCarInfo()
          }
        })
      },
      validateUpateForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.updateCarInfo()
          }
        })
      },
      selectInfo () {
        var selectUrl = 'http://localhost:3000/car/select' + '/'
        if (this.selectText === '') {
          selectUrl += this.Dic['userid']
        } else {
          selectUrl += this.selectText
        }
        var resource = this.$resource(selectUrl)
        resource.get()
          .then((response) => {
            this.AllInfo = []
            if (CookieUserType() === '2') {
              for (var i = 0; i < response.body.length; i++) {
                if (this.Cookie.userid === response.body[i].userid) {
                  this.AllInfo.push(response.body[i])
                }
              }
              this.setPagination(this.AllInfo)
            } else {
              console.log(response.body)
              this.AllInfo = response.body
              this.setPagination(this.AllInfo)
            }
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      timeMake () {
        var tempDate = new Date()
        this.tempTime = tempDate.toLocaleDateString()
        this.tempTime += ' ' + tempDate.getHours() + ':'
        this.tempTime += tempDate.getMinutes()
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
    color: rgba(255, 55, 24, 0.85)
  }
</style>
