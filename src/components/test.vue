<template>
  <div class="hello">
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
        addFormVisible: true,
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
