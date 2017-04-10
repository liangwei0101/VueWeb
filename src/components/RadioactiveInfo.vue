<template>
  <div class="hello">

    <!-- START BREADCRUMB -->
    <ul class="breadcrumb push-down-0">
          <li><a href="#">用户</a></li>
          <li class="active"><a href="#">放射源信息管理</a></li>
        </ul>
    <!-- END BREADCRUMB -->

    <!-- START MODAL ICON PREVIEW -->
    <div class="dialog" :class="isAbleShowClass" role="dialog" style="z-index: 111">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dialogHeader" >
            <button type="button" class="close" data-dismiss="modal" @click="addDialogClose"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">我是标题</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="icon-preview"></div>
              </div>
              <div class="col-md-12">
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label class="col-md-2 control-label">Text</label>
                    <div class="col-md-10">
                      <input type="text" class="form-control" value="Some text value..."/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Password</label>
                    <div class="col-md-10">
                      <input type="password" class="form-control" value="password"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Readonly</label>
                    <div class="col-md-10">
                      <input type="text" class="form-control" readonly value="Readonly value"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Disabled</label>
                    <div class="col-md-10">
                      <input type="text" class="form-control" readonly value="Disabled value"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Placeholder</label>
                    <div class="col-md-10">
                      <input type="text" class="form-control" placeholder="Fill this field please"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Text area</label>
                    <div class="col-md-10">
                      <textarea class="form-control" rows="5"></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addDialogClose">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END MODAL ICON PREVIEW -->

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
                      <input v-model="selectText" class="form-control" placeholder="请输入用户编号或者用户姓名查找"/>
                    </h3>
                    <div class="btn-group " style="float: left">
                      <button class="btn btn-info"><i class="glyphicon glyphicon-zoom-out"></i>查 询</button>
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
                        <th width="50">放射源编号</th>
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
                      <tr id="trow_1">
                        <td>1</td>
                        <td><strong>John Doe</strong></td>
                        <td><span class="label label-success">New</span></td>
                        <td>$430.20</td>
                        <td>24/09/2014</td>
                        <td>$430.20</td>
                        <td>$430.20</td>
                        <td>$430.20</td>
                        <td>
                          <button class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil"></span></button>
                        </td>
                      </tr>
                      <tr id="trow_2">
                        <td>2</td>
                        <td><strong>Dmitry Ivaniuk</strong></td>
                        <td><span class="label label-warning">Pending</span></td>
                        <td>$1,351.00</td>
                        <td>$1,351.00</td>
                        <td>$1,351.00</td>
                        <td>23/09/2014</td>
                        <td>$430.20</td>
                        <td>
                          <button class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil"></span></button>
                        </td>
                      </tr>
                      <tr id="trow_3">
                        <td>3</td>
                        <td><strong>Nadia Ali</strong></td>
                        <td><span class="label label-info">In Queue</span></td>
                        <td>$2,621.00</td>
                        <td>$2,621.00</td>
                        <td>$2,621.00</td>
                        <td>22/09/2014</td>
                        <td>$430.20</td>
                        <td>
                          <button class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil"></span></button>
                        </td>
                      </tr>
                      </tbody>
                    </table>

                    <label class="pull-left" style="padding-left: 0px; padding-top:7px;vertical-align: middle;">总条数为：{{this.pageOne.totalItems}}条</label>
                    <div class="col-md-1" style="float: left">
                      <select class="form-control select"  v-model="selected" @change="selectVal">
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

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  export default {
    data () {
      return {
        selectText: '',
        isAbleShowClass: {
          modal: true,
          fade: true
        },
        pageOne: {
          currentPage: 1,
          totalPages: 10,
          totalItems: 0,
          itemsPerPage: 10
        }
      }
    },
    mounted: function () {
      this.addDialogShow()
    },
    methods: {
      addDialogShow: function () {
        this.isAbleShowClass.modal = false
        this.isAbleShowClass.fade = false
      },
      addDialogClose: function () {
        this.isAbleShowClass.modal = true
        this.isAbleShowClass.fade = true
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog{
    padding-top: 140px;

    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .dialogHeader{

  }
</style>
