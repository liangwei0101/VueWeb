<template>
  <div class="hello">
    <button class="btn btn-success" @click="addDialogShow"><i class="fa fa-bars"></i> 新 增</button>
    <!-- START MODAL ICON PREVIEW -->
    <div :class="isAbleShowClass" id="iconPreview" role="dialog" tabindex="-1"  aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
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
        isAbleShowClass: {
          modal: true,
          fade: true
        }
      }
    },
    mounted: function () {
      this.vueCookie()
    },
    methods: {
      addDialogShow: function () {
        this.isAbleShowClass.modal = false
        this.isAbleShowClass.fade = false
      },
      addDialogClose: function () {
        this.isAbleShowClass.modal = true
        this.isAbleShowClass.fade = true
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

</style>
