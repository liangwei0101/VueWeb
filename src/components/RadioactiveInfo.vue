<template>
  <div class="hello">

    <!-- START BREADCRUMB -->
    <ul class="breadcrumb push-down-0">
          <li><a href="#">用户</a></li>
          <li class="active"><a href="#">放射源信息管理</a></li>
        </ul>
    <!-- END BREADCRUMB -->

    <!-- START CONTENT FRAME -->
        <div class="content-frame">
          <!-- START CONTENT FRAME TOP -->
          <div class="content-frame-top">
            <div class="page-title">
              <h2><span class="fa fa-pencil"></span> 放射源信息管理</h2>
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
                      <input v-model="selectText" class="form-control" @keyup.enter="selectInfo" placeholder="请输入名称或者负责人姓名"/>
                    </h3>
                    <div class="btn-group " style="float: left">
                      <button class="btn btn-info" @click="selectInfo"><i class="glyphicon glyphicon-zoom-out"></i>查 询</button>
                    </div>
                    <div class="btn-group pull-right">
                      <button class="btn btn-success" @click="addDialogShow"><i class="fa fa-bars"></i> 新 增</button>
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
                    <table class="table table-bordered table-striped table-actions">
                      <thead>
                      <tr>
                        <th class="text-center" width="50">详情</th>
                        <th width="100">名称</th>
                        <th width="100">负责人</th>
                        <th width="100">放射源地点</th>
                        <th width="100">辐射类型</th>
                        <th width="100">能量响应</th>
                        <th width="100">剂量当量</th>
                        <th width="100">剂量当量率</th>
                        <th class="text-center" width="100">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="Info in ShowInfo">
                        <td class="text-center"><a @click="expansion(Info)"><span class="fa fa-chevron-down"></span></a></td>
                        <td>{{Info.name}}</td>
                        <td>{{Info.principal}}</td>
                        <td>{{Info.place}}</td>
                        <td>{{Info.RadiationType}}</td>
                        <td>{{Info.EnergyRes}}</td>
                        <td>{{Info.DoseEquivalent}}</td>
                        <td>{{Info.DoseEquivalentRate}}</td>
                        <td>
                          <ul class="panel-controls pull-left" style="padding-left:45px;">
                            <li><a class="panel-collapse" data-toggle="tooltip" data-placement="bottom" title="编辑" @click="updateWind(Info)"><span class="fa fa-pencil"></span></a></li>
                            <li><a class="panel-remove" data-toggle="tooltip" data-placement="bottom" title="删除" @click="TipWind(Info)"><span class="glyphicon glyphicon-trash"></span></a></li>
                          </ul>
                        </td>
                      </tr>
                      </tbody>
                    </table>

                    <!--展示或隐藏数据-->
                    <div class="panel panel-default" v-show="HideData">
                      <div class="panel-body">
                        <h3 class="push-down-0">数据详情展示</h3>
                      </div>
                      <div class="panel-body faq">

                        <div class="faq-item">
                          <div>
                            <p><strong>名称：</strong>{{hideContent.name}}</p><br>
                            <p><strong>负责人：</strong>{{hideContent.principal}}</p><br>
                            <p><strong>放射源地点：</strong>{{hideContent.place}}</p><br>
                            <p><strong>辐射类型：</strong>{{hideContent.RadiationType}}</p><br>
                            <p><strong>能量响应：</strong>{{hideContent.EnergyRes}}</p><br>
                            <p><strong>剂量当量：</strong>{{hideContent.DoseEquivalent}}</p><br>
                            <p><strong>剂量当量率：</strong>{{hideContent.DoseEquivalentRate}}</p><br>
                            <p><strong>备注：</strong>{{hideContent.remark}}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                    <!--展示或隐藏数据-->

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
            <h4 class="modal-title">放射源信息新增</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateAddForm('addForm')" data-vv-scope="addForm">
                  <div class="form-group">
                    <label class="col-md-2 control-label">名称</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.放射源名称')}">
                      <input type="text" name="放射源名称" class="form-control" placeholder="放射源的名称" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.放射源名称') }"
                             v-model="addContent.name"/>
                      <i v-show="errors.has('addForm.放射源名称')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.放射源名称')" class="help is-danger alarm">{{ errors.first('addForm.放射源名称') }}</span>
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
                    <label class="col-md-2 control-label">放射源地点</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.放射源地点')}">
                      <input type="text" name="放射源地点" class="form-control" placeholder="地点名称"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.放射源地点') }"
                             v-model="addContent.place" />
                      <i v-show="errors.has('addForm.放射源地点')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.放射源地点')" class="help is-danger alarm">{{ errors.first('addForm.放射源地点') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">辐射类型</label>
                    <div class="col-md-10">
                      <select class="form-control" @change="TypeSelectChange" v-model="selectedType">
                        <option v-for="option in selectRadiationType" v-bind:value="option.value">
                          {{ option.text }}
                      </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">能量响应</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.能量响应值')}">
                      <input type="text"  name="能量响应值" class="form-control" placeholder="如:40keV" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.能量响应值') }"
                             v-model="addContent.EnergyRes" />
                      <i v-show="errors.has('addForm.能量响应值')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.能量响应值')" class="help is-danger alarm">{{ errors.first('addForm.能量响应值') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                  <label class="col-md-2 control-label">剂量当量</label>
                  <div class="col-md-10" :class="{'has-error':errors.has('addForm.剂量当量值')}">
                    <input type="text" name="剂量当量值" class="form-control" placeholder="如:0.01uSv" v-validate="'required'"
                           :class="{'input': true, 'is-danger': errors.has('addForm.剂量当量值') }"
                           v-model="addContent.DoseEquivalent"/>
                    <i v-show="errors.has('addForm.剂量当量值')" class="fa fa-hand-o-right alarm"></i>
                    <span v-show="errors.has('addForm.剂量当量值')" class="help is-danger alarm">{{ errors.first('addForm.剂量当量值') }}</span>
                  </div>
                </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">剂量当量率</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('addForm.剂量当量率值')}">
                      <input type="text" name="剂量当量率值"  class="form-control" placeholder="如:0.01uSv/h" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('addForm.剂量当量率值') }"
                             v-model="addContent.DoseEquivalentRate"/>
                      <i v-show="errors.has('addForm.剂量当量率值')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('addForm.剂量当量率值')" class="help is-danger alarm">{{ errors.first('addForm.剂量当量率值') }}</span>
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
    <!-- END MODAL ICON PREVIEW -->

    <!-- START addDilog PREVIEW -->
    <div class="dialog" :class="updateIsAbleShowClass" role="dialog" style="z-index: 111">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="updateDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">放射源信息修改</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">

                <form class="form-horizontal" role="form" @submit.prevent="validateUpateForm('updateForm')" data-vv-scope="updateForm">
                  <div class="form-group">
                    <label class="col-md-2 control-label">名称</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.放射源名称')}">
                      <input type="text" name="放射源名称" class="form-control" placeholder="放射源的名称" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.放射源名称') }"
                             v-model="updateContent.name"/>
                      <i v-show="errors.has('updateForm.放射源名称')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.放射源名称')" class="help is-danger alarm">{{ errors.first('updateForm.放射源名称') }}</span>
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
                    <label class="col-md-2 control-label">放射源地点</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.放射源地点')}">
                      <input type="text" name="放射源地点" class="form-control" placeholder="地点名称"  v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.放射源地点') }"
                             v-model="updateContent.place" />
                      <i v-show="errors.has('updateForm.放射源地点')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.放射源地点')" class="help is-danger alarm">{{ errors.first('updateForm.放射源地点') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">辐射类型</label>
                    <div class="col-md-10">
                      <select class="form-control" @change="TypeSelectChange" v-model="selectedType">
                        <option v-for="option in selectRadiationType" v-bind:value="option.value">
                          {{ option.text }}
                      </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">能量响应</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.能量响应值')}">
                      <input type="text"  name="能量响应值" class="form-control" placeholder="如:40keV" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.能量响应值') }"
                             v-model="updateContent.EnergyRes" />
                      <i v-show="errors.has('updateForm.能量响应值')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.能量响应值')" class="help is-danger alarm">{{ errors.first('updateForm.能量响应值') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">剂量当量</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.剂量当量值')}">
                      <input type="text" name="剂量当量值" class="form-control" placeholder="如:0.01uSv" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.剂量当量值') }"
                             v-model="updateContent.DoseEquivalent"/>
                      <i v-show="errors.has('updateForm.剂量当量值')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.剂量当量值')" class="help is-danger alarm">{{ errors.first('updateForm.剂量当量值') }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">剂量当量率</label>
                    <div class="col-md-10" :class="{'has-error':errors.has('updateForm.剂量当量率值')}">
                      <input type="text" name="剂量当量率值"  class="form-control" placeholder="如:0.01uSv/h" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('updateForm.剂量当量率值') }"
                             v-model="updateContent.DoseEquivalentRate"/>
                      <i v-show="errors.has('updateForm.剂量当量率值')" class="fa fa-hand-o-right alarm"></i>
                      <span v-show="errors.has('updateForm.剂量当量率值')" class="help is-danger alarm">{{ errors.first('updateForm.剂量当量率值') }}</span>
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
    <!-- END MODAL ICON PREVIEW -->

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
              <button class="btn btn-success btn-lg mb-control-yes"  @click="removeRadioactiveInfo">Yes</button>
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
  import { getCookie } from '../services/Cookie'
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
          name: '',
          place: '',
          principal: '',
          RadiationType: '',
          EnergyRes: '',
          DoseEquivalent: '',
          DoseEquivalentRate: '',
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
          { text: 'γ射线', value: '0' },
          { text: 'β射线', value: '1' }],
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
        updateContent: {}
      }
    },
    mounted: function () {
      this.vueCookie()
      this.getRadioactiveInfo()
      this.addContent.RadiationType = this.selectedType
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
      addRadioactiveInfo: function () {
        this.IdMake()
        console.log(this.addContent)
        var addUrl = 'http://localhost:3000/radioactive'
        var Params = this.addContent
        var resource = this.$resource(addUrl)
        resource.save(addUrl, Params)
          .then((response) => {
            if (this.ShowInfo.length < Number(this.selected)) {
              if (Params.RadiationType === '0') {
                Params.RadiationType = 'γ射线'
              } else {
                Params.RadiationType = 'β射线'
              }
              this.ShowInfo.push(Params)
            } else {
              if (Params.RadiationType === '0') {
                Params.RadiationType = 'γ射线'
              } else {
                Params.RadiationType = 'β射线'
              }
              this.AllInfo.push(Params)
            }
            this.$message({
              message: '保存用户信息成功！',
              type: 'success'
            })
            this.addContent = []
            this.pageOne.totalItems++
            this.addDialogClose()
          })
      },
      removeRadioactiveInfo () {
        this.closeTipWind()
        var delUrl = 'http://localhost:3000/deleteRadioactive'
        var Params = {id: this.temp}
        var resource = this.$resource(delUrl)
        var tp = -1
        resource.save(delUrl, Params)
          .then((response) => {
            this.$message({
              message: '记录删除成功！',
              type: 'success'
            })
            for (var i = 0; i < this.ShowInfo.length; i++) {
              if (this.temp === this.ShowInfo[i]) {
                tp = i
              }
            }
            this.ShowInfo.splice(tp, 1)
            this.pageOne.totalItems--
          })
      },
      updateRadioactiveInfo () {
        var updateUrl = 'http://localhost:3000/radioactive' + '/' + this.updateContent.id
        this.updateContent.RadiationType = this.selectedType
        var Params = this.updateContent
        var resource = this.$resource(updateUrl)
        resource.save(updateUrl, Params)
          .then((response) => {
            this.$message({
              message: '修改记录成功！',
              type: 'success'
            })
            this.updateDialogClose()
            for (var i = 0; i < this.ShowInfo.length; i++) {
              if (Params.id === this.ShowInfo[i].id) {
                if (this.ShowInfo[i].RadiationType === '0') {
                  this.ShowInfo[i].RadiationType = 'γ射线'
                } else {
                  this.ShowInfo[i].RadiationType = 'β射线'
                }
              }
            }
          })
      },
      getRadioactiveInfo: function () {
        var getUrl = 'http://localhost:3000/radioactive' + '/' + this.addContent.userid
        var vm = this
        var resource = vm.$resource(getUrl)
        resource.get()
          .then((response) => {
            console.log('我是返回的测试！')
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
            this.AllInfo[i].RadiationType = 'γ射线'
          } else {
            this.AllInfo[i].RadiationType = 'β射线'
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
        this.addContent.userid = this.Dic['userid']
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
          if (this.AllInfo[i].RadiationType === '0') {
            this.AllInfo[i].RadiationType = 'γ射线'
          } else {
            this.AllInfo[i].RadiationType = 'β射线'
          }
          this.ShowInfo.push(this.AllInfo[i])
        }
      },
      TypeSelectChange () {
        console.log(this.selectedType)
        this.addContent.RadiationType = this.selectedType
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
        if (Info.RadiationType === 'γ射线') {
          this.selectedType = '0'
        } else {
          this.selectedType = '1'
        }
        this.updateContent = Info
      },
      validateAddForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.addRadioactiveInfo()
          }
        })
      },
      validateUpateForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.updateRadioactiveInfo()
          }
        })
      },
      selectInfo () {
        var selectUrl = 'http://localhost:3000/selectRadioactive' + '/'
        if (this.selectText === '') {
          selectUrl += this.Dic['userid']
        } else {
          selectUrl += this.selectText
        }
        var resource = this.$resource(selectUrl)
        resource.get()
          .then((response) => {
            console.log('我是返回的测试！')
            console.log(response.body)
            this.AllInfo = response.body
            this.setPagination(this.AllInfo)
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
