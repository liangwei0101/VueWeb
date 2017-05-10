<template>
  <div class="hello">

    <!-- START BREADCRUMB -->
    <ul class="breadcrumb" style="text-align:left;">
      <li><a href="#">用户</a></li>
      <li class="active">用户管理</li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- PAGE TITLE -->
    <div class="page-title">

    </div>
    <!-- END PAGE TITLE -->

    <!-- PAGE CONTENT WRAPPER -->
    <div class="page-content-wrap">

      <div class="row">
        <div class="col-md-12">

          <!-- START DATATABLE EXPORT -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title col-md-3">
                <input v-model="selectText" class="form-control" @keyup.enter="selectUser" placeholder="请输入用户编号或者用户姓名查找"/>
              </h3>
              <div class="btn-group " style="float: left">
                <button class="btn btn-info" @click="selectUser"><i class="glyphicon glyphicon-zoom-out"></i>查 询</button>
              </div>
              <div class="btn-group pull-right" v-show="addButtonShow">
                <button class="btn btn-success" @click="addDialogShow"><i class="fa fa-bars"></i> 新 增</button>
              </div>

            </div>
            <div class="panel-body">
              <table class="table-hover table-striped table">
                <thead>
                <tr>
                  <th width="13%">用户编号</th>
                  <th width="13%">用户姓名</th>
                  <th width="13%">用户手机</th>
                  <th width="13%">用户邮箱</th>
                  <th width="13%">是否可用</th>
                  <th style="padding-left:45px;">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in ShowInfo">
                  <td style="text-align:left;vertical-align: middle;">{{user.userid}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.name}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.telephone}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.email}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.isAble}}</td>
                  <td style="text-align:center;">
                    <ul class="panel-controls pull-left">
                      <li v-show="updateIconShow"><a class="panel-collapse" data-toggle="tooltip" data-placement="top" title="编辑" @click="updateDialogShow(user)"><span class="fa fa-pencil"></span></a></li>
                      <li v-show="passwdIconShow"><a class="panel-collapse" data-toggle="tooltip" data-placement="top" title="密码修改" @click="passwdDialogShow(user)"><span class="fa fa-user"></span></a></li>
                      <li v-show="imageIconShow"><a class="panel-collapse" data-toggle="tooltip" data-placement="top" title="头像设置" @click="uploadImgShow(user)"><span class="fa fa-cloud-upload"></span></a></li>
                      <li v-show="freezeIconShow"><a class="panel-refresh" data-toggle="tooltip" data-placement="top" title="冻结/解冻" @click="showUserFreezeTip(user)"><span class="glyphicon glyphicon-stop"></span></a></li>
                      <li v-show="deleteIconShow"><a class="panel-remove" data-toggle="tooltip" data-placement="top" title="删除" @click="showUserDelTip(user)"><span class="glyphicon glyphicon-trash"></span></a></li>
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
    <!-- END PAGE CONTENT WRAPPER -->

    <!-- START addDilog PREVIEW -->
    <div class="dialog" :class="addIsAbleShowClass">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="addDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">用户新增</h4>
          </div>

          <div class="modal-body">
            <div class="row">

              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateAddForm('addForm')" data-vv-scope="addForm">

                  <div class="form-group">
                    <label class="col-md-2 control-label">编号</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.编号')}">
                      <input type="text" name="编号" class="form-control" placeholder="编号" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.编号') }"
                             v-model="addContent.userid"/>
                      <i v-show="errors.has('addForm.编号')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.编号')" class="help is-danger alarm">{{ errors.first('addForm.编号') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">姓名</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.姓名')}">
                      <input type="text" name="姓名" class="form-control" placeholder="姓名" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.姓名') }"
                             v-model="addContent.name" />
                      <i v-show="errors.has('addForm.姓名')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.姓名')" class="help is-danger alarm">{{ errors.first('addForm.姓名') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">密码</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.密码')}">
                      <input type="password" name="密码" class="form-control" placeholder="密码"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.密码') }"
                             v-model="addContent.pass" />
                      <i v-show="errors.has('addForm.密码')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.密码')" class="help is-danger alarm">{{ errors.first('addForm.密码') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">邮箱</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.邮箱')}">
                      <input type="text" name="邮箱" class="form-control" placeholder="邮箱"  v-validate="'required|email'"
                             :class="{'input': true, 'is-danger': errors.has('邮箱') }"
                             v-model="addContent.email" />
                      <i v-show="errors.has('addForm.邮箱')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.邮箱')" class="help is-danger alarm">{{ errors.first('addForm.邮箱') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">用户类型</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="userTypeSelected">
                        <option v-for="option in userTypeSource" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">电话</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.电话')}">
                      <input type="text"  name="电话" placeholder="电话" class="form-control" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.电话') }"
                             v-model="addContent.telephone" />
                      <i v-show="errors.has('addForm.电话')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.电话')" class="help is-danger alarm">{{ errors.first('addForm.电话') }}</span>
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

    <!-- START 修改密码 PREVIEW -->
    <div class="passwd" :class="updatePassClass" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="passwdDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">用户密码修改</h4>
          </div>

          <div class="modal-body">
            <div class="row">

              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validatePasswdForm('updatePasswd')" data-vv-scope="updatePasswd">

                  <div class="form-group">
                    <label class="col-md-2 control-label">新密码</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updatePasswd.新密码')}">
                      <input type="password" name="新密码" class="form-control" placeholder="新密码"  v-validate="'required|confirmed:确认密码'"
                             :class="{'input': true, 'is-danger': errors.has('updatePasswd.新密码') }"
                             v-model="updatePasswd.password" />
                      <i v-show="errors.has('updatePasswd.新密码')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updatePasswd.新密码')" class="help is-danger alarm">{{ errors.first('updatePasswd.新密码') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">确认密码</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updatePasswd.确认密码')}">
                      <input type="password" name="确认密码" class="form-control" placeholder="确认密码"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updatePasswd.确认密码') }"
                             v-model="updatePasswd.confirmPassword" />
                      <i v-show="errors.has('updatePasswd.确认密码')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updatePasswd.确认密码')" class="help is-danger alarm">{{ errors.first('updatePasswd.确认密码') }}</span>
                    </div>
                  </div>

                  <div class="">
                    <button class="pull-left col-md-offset-4 col-sm-offset-4 btn btn-info" type="button" @click="errors.clear('updatePasswd')"><span class="fa fa-times-circle-o"></span> 复原</button>
                    <button type="submit" class="pull-left col-md-offset-1 col-sm-offset-1 btn btn-success"><span class="fa fa-fire"></span> 保存</button>
                  </div>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- END 修改密码 PREVIEW -->

    <!-- START 修改 PREVIEW -->
    <div class="dialog" :class="updateIsAbleShowClass">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="updateDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">用户修改</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateUpateForm('updateForm')" data-vv-scope="updateForm">

                  <div class="form-group">
                    <label class="col-md-2 control-label">编号</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.编号')}">
                      <input type="text" name="编号" class="form-control" placeholder="编号" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.编号') }"
                             v-model="updateContent.userid"/>
                      <i v-show="errors.has('updateForm.编号')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.编号')" class="help is-danger alarm">{{ errors.first('updateForm.编号') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">姓名</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.姓名')}">
                      <input type="text" name="姓名" class="form-control" placeholder="姓名" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.姓名') }"
                             v-model="updateContent.name" />
                      <i v-show="errors.has('updateForm.姓名')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.姓名')" class="help is-danger alarm">{{ errors.first('updateForm.姓名') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">邮箱</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.邮箱')}">
                      <input type="text" name="邮箱" class="form-control" placeholder="邮箱"  v-validate="'required|email'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.邮箱') }"
                             v-model="updateContent.email" />
                      <i v-show="errors.has('updateForm.邮箱')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.邮箱')" class="help is-danger alarm">{{ errors.first('updateForm.邮箱') }}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-2 control-label">电话</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.电话')}">
                      <input type="text"  name="电话" placeholder="电话" class="form-control" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.电话') }"
                             v-model="updateContent.telephone" />
                      <i v-show="errors.has('updateForm.电话')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.电话')" class="help is-danger alarm">{{ errors.first('updateForm.电话') }}</span>
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
    <!-- START 修改 PREVIEW -->

    <!-- START 设置头像 PREVIEW -->

    <my-upload field="imageId"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="upLoadShow"
               :width="300"
               :height="300"
               url="http://localhost:3000/userUpload"
               :params="params"
               :headers="headers"
               img-format="jpg"></my-upload>

    <!-- START 设置头像 PREVIEW -->

    <!--删除数据-->
    <!-- MESSAGE BOX-->
    <div class="message-box animated fadeIn del" :class="delClass" data-sound="alert" id="mb-remove-row">
      <div class="mb-container">
        <div class="mb-middle">
          <div class="mb-title"><span class="fa fa-times"></span> 删除 <strong>数据</strong> ?</div>
          <div class="mb-content">
            <p>您确定要删除此行吗？</p>
            <p>如果您确定，请按Yes.</p>
          </div>
          <div class="mb-footer">
            <div class="pull-right">
              <button class="btn btn-success btn-lg mb-control-yes" @click="removeUser">Yes</button>
              <button class="btn btn-default btn-lg mb-control-close" @click="hideUserTip">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END MESSAGE BOX-->
    <!--删除数据-->

    <!--冻结/解冻相关用户-->
    <!-- MESSAGE BOX-->
    <div class="message-box animated fadeIn del" :class="freezeClass">
      <div class="mb-container">
        <div class="mb-middle">
          <div class="mb-title"><span class="fa fa-times"></span> 冻结/解冻 <strong>用户</strong> ?</div>
          <div class="mb-content">
            <p>您确定冻结/解冻要此用户吗？</p>
            <p>如果您确定，请按Yes.</p>
          </div>
          <div class="mb-footer">
            <div class="pull-right">
              <button class="btn btn-success btn-lg mb-control-yes"  @click="freezeUser">Yes</button>
              <button class="btn btn-default btn-lg mb-control-close" @click="hideUserTip">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END MESSAGE BOX-->
    <!--冻结/解冻相关用户-->
  </div>
</template>

<script>
  import Pagination from './Pagination.vue'
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VueCookie from 'vue-cookie'
  import myUpload from 'vue-image-crop-upload/upload-2.vue'
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
  Vue.use(VueCookie)
  Vue.use(VeeValidate, config)

  export default {
    components: { Pagination,
      'my-upload': myUpload },
    data () {
      return {
        ShowInfo: [],
        AllInfo: [],
        delUser: '',
        selectText: '',
        freezeUserInfo: '',
        delClass: {
          open: false
        },
        freezeClass: {
          open: false
        },
        addIsAbleShowClass: {
          modal: true,
          fade: true
        },
        updateIsAbleShowClass: {
          modal: true,
          fade: true
        },
        updatePassClass: {
          modal: true,
          fade: true
        },
        addContent: {
          userid: '',
          name: '',
          pass: '',
          email: '',
          isAble: '',
          telephone: '',
          userType: ''
        },
        updateContent: {},
        //  分页控件相关属性
        pageOne: {
          currentPage: 1,
          totalPages: 10,
          totalItems: 0,
          itemsPerPage: 10
        },
        //  默认10条每页
        selected: '10',
        options: [
          { text: '10条/页', value: '10' },
          { text: '20条/页', value: '20' },
          { text: '50条/页', value: '50' },
          { text: '100条/页', value: '100' }
        ],
        selectedStatus: '0',
        selectStatusType: [
          { text: '是', value: '0' },
          { text: '否', value: '1' }],
        userTypeSelected: '2',
        updateUserTypeSelected: '',
        userTypeSource: [
          { text: '1(管理员)', value: '1' },
          { text: '2(普通用户)', value: '2' }],
        tempSelect: '',
        updatePasswd: {
          userid: '',
          password: '',
          confirmPassword: ''
        },
        imageId: '',
        upLoadShow: false,
        Cookie: {
          userid: '',
          name: ''
        },
        updateIconShow: true,
        passwdIconShow: true,
        imageIconShow: true,
        freezeIconShow: true,
        deleteIconShow: true,
        addButtonShow: true
      }
    },
    mounted: function () {
      this.vueCookie()
      this.getUserInfo()
      this.setUI()
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
      updateDialogShow (Info) {
        console.log(Info)
        this.updateIsAbleShowClass.modal = false
        this.updateIsAbleShowClass.fade = false
        this.updateContent = Info
        this.updateUserTypeSelected = Info.userType
      },
      updateDialogClose () {
        this.updateIsAbleShowClass.modal = true
        this.updateIsAbleShowClass.fade = true
      },
      passwdDialogShow (Info) {
        this.updatePassClass.modal = false
        this.updatePassClass.fade = false
        this.updatePasswd.userid = Info.userid
      },
      passwdDialogClose () {
        this.updatePassClass.modal = true
        this.updatePassClass.fade = true
      },
      validateAddForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.addUser()
          }
        })
      },
      validateUpateForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.editUser()
          }
        })
      },
      validatePasswdForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.changePasswd()
          }
        })
      },
      addUser () {
        var addUrl = 'http://localhost:3000/userInfo/save'
        this.addContent.userType = this.userTypeSelected
        var Params = this.addContent
        console.log(Params)
        var resource = this.$resource(addUrl)
        resource.save(addUrl, Params)
          .then((response) => {
            if (response.body === '304') {
              this.$Message.warning('此用户id已存在！')
            } else {
              this.sendEmail(Params.userid)
              this.$Message.success('保存用户信息成功！')
              this.addContent = []
              this.addDialogClose()
              this.getUserInfo()
            }
          })
      },
      removeUser () {
        var delUrl = 'http://localhost:3000/userInfo/remove'
        var resource = this.$resource(delUrl)
        resource.save({userid: this.delUser.userid})
          .then((response) => {
            this.$Message.success('删除此用户成功！')
            this.hideUserTip()
            this.getUserInfo()
          })
      },
      editUser () {
        var updateUrl = 'http://localhost:3000/userInfo/update' + '/' + this.updateContent.userid
        this.updateContent.isAble = this.tempSelect
        var Params = this.updateContent
        var resource = this.$resource(updateUrl)
        resource.save(updateUrl, Params)
          .then((response) => {
            this.$Message.success('修改用户信息成功！')
            this.updateDialogClose()
            this.getUserInfo()
          })
      },
      getUserInfo () {
        var getUrl = 'http://localhost:3000/userInfo/get'
        if (CookieUserType() === '2') {
          getUrl = 'http://localhost:3000/userInfo/get' + '/' + this.Cookie.userid
        }
        var resource = this.$resource(getUrl)
        resource.get()
          .then((response) => {
            this.AllInfo = response.body
            this.setPagination(this.AllInfo)
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      freezeUser () {
        if (this.freezeUserInfo.isAble === '是') {
          this.freezeUserInfo.isAble = '0'
        } else {
          this.freezeUserInfo.isAble = '1'
        }
        var freezeUrl = 'http://localhost:3000/userInfo/freeze'
        var resource = this.$resource(freezeUrl)
        resource.save(freezeUrl, this.freezeUserInfo)
          .then((response) => {
            if (this.freezeUserInfo.isAble === '0') {
              this.$Message.success('冻结此用户成功！')
            } else {
              this.$Message.success('解冻此用户成功！')
            }
            this.hideUserTip()
            this.getUserInfo()
          })
      },
      changePasswd () {
        var passUrl = 'http://localhost:3000/userInfo/passwd'
        var Params = this.updatePasswd
        var resource = this.$resource(passUrl)
        resource.save(passUrl, Params)
          .then((response) => {
            this.$Message.success('密码修改成功！')
            this.passwdDialogClose()
            this.updatePasswd = []
          })
      },
      showUserDelTip (user) {
        this.delClass.open = true
        this.delUser = user
        console.log(this.delUser.userid)
      },
      showUserFreezeTip (user) {
        this.freezeClass.open = true
        this.freezeUserInfo = user
        console.log(this.freezeUserInfo)
      },
      hideUserTip () {
        this.delClass.open = false
        this.freezeClass.open = false
      },
      pageOneChanged (pageNum) {
        this.pageOne.currentPage = pageNum
        this.ShowInfo = []
        for (var i = (pageNum - 1) * this.selected; i < pageNum * this.selected && i < this.AllInfo.length; i++) {
          if (this.AllInfo[i].isAble === '0') {
            this.AllInfo[i].isAble = '是'
          } else if (this.AllInfo[i].isAble === '1') {
            this.AllInfo[i].isAble = '否'
          }
          this.ShowInfo.push(this.AllInfo[i])
        }
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
      setPagination (AllInfo) {
        this.ShowInfo = []
        this.pageOne.totalItems = AllInfo.length
        this.pageOne.totalPages = Math.ceil(this.AllInfo.length / this.selected)
        for (var i = 0; i < this.selected && i < this.AllInfo.length; i++) {
          this.ShowInfo.push(this.AllInfo[i])
          if (this.ShowInfo[i].isAble === '0') {
            this.ShowInfo[i].isAble = '是'
          } else {
            this.ShowInfo[i].isAble = '否'
          }
        }
      },
      selectUser () {
        var selectUrl = 'http://localhost:3000/userInfo/select' + '/' + this.selectText
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
      sendEmail (userid) {
        var vm = this
        var emailUrl = 'http://localhost:3000/regMail/' + userid
        var resource = vm.$resource(emailUrl)
        resource.get()
          .then((response) => {
            console.log(response.body)
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      StatusSelectChange () {
        this.tempSelect = this.selectedType
      },
      uploadImgShow (Info) {
        this.upLoadShow = true
        this.IdMake()
      },
      cropSuccess (imgDataUrl, field) {
        this.imgDataUrl = imgDataUrl
      },
      cropUploadSuccess (jsonData, field) {
        this.$Message.success('再次登入后生效！')
      },
      cropUploadFail (status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
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
        this.imageId = temp
      },
      vueCookie () {
        this.Dic = getCookie()
        this.Cookie.userid = this.Dic['userid']
      },
      setUI () {
        var type = CookieUserType()
        var CookieTempUserType = Number(type)
        if (CookieTempUserType === 1) {
          this.updateIconShow = true
          this.passwdIconShow = true
          this.imageIconShow = false
          this.freezeIconShow = true
          this.deleteIconShow = true
          this.addButtonShow = true
        } else if (CookieTempUserType === 2) {
          this.updateIconShow = true
          this.passwdIconShow = true
          this.imageIconShow = true
          this.freezeIconShow = false
          this.deleteIconShow = false
          this.addButtonShow = false
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 11;
  }
  .passwd{
    padding-top: 145px;
    overflow-y:scroll;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 11;
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
