<template>
  <div class="hello">

    <!-- START BREADCRUMB -->
    <ul class="breadcrumb" style="text-align:left;">
      <li><a href="#">主页</a></li>
      <li><a href="#">管理员</a></li>
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
              <div class="btn-group pull-right">
                <button class="btn btn-success" @click="handleAdd"><i class="fa fa-bars"></i> 新 增</button>
              </div>

            </div>
            <!--<div class="panel-body">
              <table id="customers2" class="table datatable">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>用户编号</th>
                  <th>用户名称</th>
                  <th>用户邮箱</th>
                  <th>用户手机</th>
                  <th>是否可用</th>
                  <th>操作</th>
                </tr>
                </thead>
                &lt;!&ndash;<tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>&ndash;&gt;
     &lt;!&ndash;           <tr v-for="person in people">
                  <td>{{ $index }}</td>
                  <td>{{ person.name }}</td>
                  <td>{{ person.name }}</td>
                  <td>{{ person.age }}</td>
                  <td>{{ person.age }}</td>
                  <td>{{ person.sex }}</td>
                  <td>{{ person.sex }}</td>
                </tr>&ndash;&gt;
              </table>

            </div>-->
            <div class="panel-body">
              <table id="customers2" class="table-hover table-striped table datatable">
                <thead>
                <tr>
                  <th>用户编号</th>
                  <th>用户姓名</th>
                  <th>用户手机</th>
                  <th>用户邮箱</th>
                  <th>是否可用</th>
                  <th style="padding-left:45px;">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in usersShow">
                  <td style="text-align:left;vertical-align: middle;">{{user.userid}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.name}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.telephone}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.email}}</td>
                  <td style="text-align:left;vertical-align: middle;">{{user.isAble}}</td>
                  <td style="text-align:center;">
                    <ul class="panel-controls pull-left">
                      <li><a class="panel-collapse" data-toggle="tooltip" data-placement="top" title="编辑" @click="handleEdit(user)"><span class="fa fa-pencil"></span></a></li>
                      <li><a class="panel-refresh" data-toggle="tooltip" data-placement="top" title="冻结/解冻" @click="showUserFreezeTip(user)"><span class="glyphicon glyphicon-stop"></span></a></li>
                      <li><a class="panel-remove" data-toggle="tooltip" data-placement="top" title="删除" @click="showUserDelTip(user)"><span class="glyphicon glyphicon-trash"></span></a></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:left; vertical-align: middle;">Shad Decker</td>
                  <td style="text-align:left;vertical-align: middle;">Regional Director</td>
                  <td style="text-align:left;vertical-align: middle;">Edinburgh</td>
                  <td style="text-align:left;vertical-align: middle;">51</td>
                  <td style="text-align:left;vertical-align: middle;">2008/11/13</td>
                  <td style="text-align:left;vertical-align: middle;">
                    <ul class="panel-controls pull-left">
                      <li><a href="" class="panel-collapse" data-toggle="tooltip" data-placement="top" title="编辑" @click="handleEdit(3)"><span class="fa fa-pencil"></span></a></li>
                      <li><a href="#" class="panel-refresh" data-toggle="tooltip" data-placement="top" title="冻结/解冻" @click="showUserFreezeTip"><span class="glyphicon glyphicon-stop"></span></a></li>
                      <li><a href="#" class="panel-remove" data-toggle="tooltip" data-placement="top" title="删除" @click="showUserDelTip"><span class="fa fa-times"></span></a></li>
                    </ul>
                  </td>
                </tr>
                </tbody>
              </table>

              <label class="pull-left" style="padding-left: 0px; padding-top:7px;vertical-align: middle;">总条数为：{{this.pageOne.totalItems}}条</label>
              <div class="col-md-1" style="float: left">
                <select class="form-control select"  v-model="selected" @change="selectVal">
                  <option v-for="option in options" v-bind:value="option.value">
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
    <!--新增界面-->
    <el-dialog title="用户新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="编号" prop="userid" >
          <el-input v-model.userid="ruleForm2.userid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.name="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model.pass="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email"
                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
          <el-input v-model.email="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model.telephone="ruleForm2.telephone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" :loading="addLoading">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增界面-->

    <!--修改界面-->
    <el-dialog title="用户修改" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules2" ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="编号" prop="userid" >
          <el-input v-model.userid="editForm.userid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.name="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model.pass="editForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email"
                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
          <el-input v-model.email="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model.telephone="editForm.telephone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editSubmitForm('editForm')" :loading="editLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增界面-->

    <!--删除数据-->
    <!-- MESSAGE BOX-->
    <div class="message-box animated fadeIn" :class="delClass" data-sound="alert" id="mb-remove-row">
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
    <div class="message-box animated fadeIn" :class="freezeClass">
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
  Vue.use(VueResource)

  export default {
    components: { Pagination },
    data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validUerid = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户编号'))
        }
        callback()
      }
      var validName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名称'))
        }
        callback()
      }
      var validPhone = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入手机号码'))
        } else {
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
          if (!myreg.test(value)) {
            return callback(new Error('请输入有效的手机号码'))
          }
        }
        callback()
      }
      return {
        usersShow: [],
        users: [],
        delUser: '',
        selectText: '',
        freezeUserInfo: '',
        addFormVisible: false,
        addLoading: false,
        editFormVisible: false,
        editLoading: false,
        delClass: {
          open: false
        },
        freezeClass: {
          open: false
        },
        ruleForm2: {
          userid: '',
          name: '',
          pass: '',
          checkPass: '',
          age: '',
          email: '',
          telephone: ''
        },
        editForm: {
          userid: '',
          name: '',
          pass: '',
          checkPass: '',
          age: '',
          email: '',
          telephone: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          userid: [
            {validator: validUerid, trigger: 'blur'}
          ],
          name: [
            {validator: validName, trigger: 'blur'}
          ],
          telephone: [
            {validator: validPhone, trigger: 'blur'}
          ]
        },
        apiUrl: 'http://localhost:3000/api',
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
        ]
      }
    },
    mounted: function () {
      this.getUserInfo()
    },
    methods: {
      //  显示新增界面
      handleAdd: function () {
        this.addFormVisible = true
        this.ruleForm2 = {
          userid: '',
          name: '',
          pass: '',
          checkPass: '',
          age: '',
          email: '',
          telephone: ''
        }
      },
      //  显示编辑界面
      handleEdit: function (user) {
        this.editFormVisible = true
        this.editForm = {
          userid: user.userid,
          name: user.name,
          pass: user.password,
          email: user.email,
          telephone: user.telephone,
          isAble: user.isAble
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createUser()
            this.addFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      editSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editUser()
            this.editFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      createUser: function () {
        var Params = {userid: this.ruleForm2.userid,
          name: this.ruleForm2.name,
          pass: this.ruleForm2.pass,
          email: this.ruleForm2.email,
          telephone: this.ruleForm2.telephone,
          isAble: '是'
        }
        console.log(Params)
        var resource = this.$resource(this.apiUrl)
        resource.save(this.apiUrl, Params)
          .then((response) => {
            if (this.usersShow.length < Number(this.selected)) {
              this.usersShow.push(Params)
              console.log('111111111')
            } else {
              this.users.push(Params)
              console.log('22222222222')
            }
            this.sendEmail(Params.userid)
            this.$message({
              message: '保存用户信息成功！',
              type: 'success'
            })
            this.pageOne.totalItems++
          })
      },
      editUser: function () {
        var editUrl = this.apiUrl + '/' + this.editForm.userid
        var Params = {userid: this.editForm.userid,
          name: this.editForm.name,
          pass: this.editForm.pass,
          email: this.editForm.email,
          telephone: this.editForm.telephone,
          isAble: this.editForm.isAble
        }
        var resource = this.$resource(editUrl)
        resource.save(editUrl, Params)
          .then((response) => {
            this.$message({
              message: '保存用户信息成功！',
              type: 'success'
            })
            this.getUserInfo()
          })
      },
      getUserInfo: function () {
        var vm = this
        var resource = vm.$resource(this.apiUrl)
        resource.get()
          .then((response) => {
            console.log('我是返回的测试！')
            this.users = response.body
            this.setPagination(this.users)
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      showUserDelTip: function (user) {
        this.delClass.open = true
        this.delUser = user
        console.log(this.delUser.userid)
      },
      showUserFreezeTip: function (user) {
        this.freezeClass.open = true
        this.freezeUserInfo = user
        console.log(this.freezeUserInfo)
      },
      removeUser: function () {
        console.log('要删除的前面')
        var delUrl = 'http://localhost:3000/deleteUser'
        var resource = this.$resource(delUrl)
        resource.save({userid: this.delUser.userid})
          .then((response) => {
            console.log('要删除的中间')
            this.$message({
              message: '已删除此用户！',
              type: 'success'
            })
            this.hideUserTip()
            this.getUserInfo()
          })
      },
      freezeUser: function () {
        var freezeUrl = 'http://localhost:3000/freezeUser'
        var resource = this.$resource(freezeUrl)
        resource.save(freezeUrl, this.freezeUserInfo)
          .then((response) => {
            if (this.freezeUserInfo.isAble === '是') {
              this.$message({
                message: '冻结此用户成功！',
                type: 'success'})
            } else {
              this.$message({
                message: '解冻此用户成功！',
                type: 'success'
              })
            }
            this.hideUserTip()
            this.getUserInfo()
          })
      },
      hideUserTip: function () {
        this.delClass.open = false
        this.freezeClass.open = false
      },
      pageOneChanged: function (pageNum) {
        this.pageOne.currentPage = pageNum
        this.usersShow = []
        for (var i = (pageNum - 1) * this.selected; i < pageNum * this.selected && i < this.users.length; i++) {
          this.usersShow.push(this.users[i])
        }
      },
      selectVal () {
        this.pageOne.itemsPerPage = this.selected
        this.pageOne.totalPages = Math.ceil(this.users.length / this.selected)
        console.log('-设置条数-')
        this.usersShow = []
        for (var i = 0; i < this.selected && i < this.users.length; i++) {
          this.usersShow.push(this.users[i])
        }
      },
      setPagination (users) {
        this.usersShow = []
        this.pageOne.totalItems = users.length
        this.pageOne.totalPages = Math.ceil(this.users.length / this.selected)
        for (var i = 0; i < this.selected && i < this.users.length; i++) {
          this.usersShow.push(this.users[i])
        }
      },
      selectUser () {
        var selectUrl = this.apiUrl + '/' + this.selectText
        var vm = this
        var resource = vm.$resource(selectUrl)
        resource.get()
          .then((response) => {
            console.log('我是返回的测试！')
            console.log(response.body)
            this.users = response.body
            this.setPagination(this.users)
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
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
