<template>
  <div>
    <!-- START BREADCRUMB -->
    <ul class="breadcrumb" style="text-align:left;">
      <li><a href="#">主页</a></li>
      <li><a href="#">管理员</a></li>
      <li class="active">用户管理</li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- START CONTENT FRAME -->
    <div class="content-frame">
      <!-- START CONTENT FRAME TOP -->
      <div class="content-frame-top">
        <div class="page-title">
          <h2><span class="fa fa-pencil"></span> 公文管理</h2>
        </div>
      </div>
      <!-- END CONTENT FRAME TOP -->
    </div>

    <div>
      <p v-show="show">12121222121212122212122222222222222222222222</p>
      <button class="btn btn-info" @click="seta"><i class="glyphicon glyphicon-zoom-out"></i>查 询</button>
      <br>
      <br>
      <input type="text" name="编号" class="form-control" v-model="userid"/>
    </div>

  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload/upload-2.vue'

  export default {
    components: {
      'my-upload': myUpload
    },
    data () {
      return {
        show: true,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '',  // the datebase64 url of created image
        UserImg: 'static/img/users/user8.jpg',
        userid: ''
      }
    },
    mounted: function () {
    },
    methods: {
      seta () {
      }
    },
    vuex: {
      getters: {
        myData: function (state) {
          return state.myData
        }
      }
    }
  }

</script>

<style>

</style>
