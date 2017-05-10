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
      <p>侧是是是 </p>
      <p>{{this.$store.state.Info.imgUrl}}</p>
    </div>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload/upload-2.vue'
  import { mapState } from 'vuex'
  import Panel from '../../node_modules/iview/src/components/collapse/panel'

  export default {
    components: {
      Panel,
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
        addIsAbleShowClass: {
          modal: false,
          fade: false
        }
      }
    },
    fetch ({ store }) {
      store.commit('increment')
    },
    computed: mapState([
      'counter'
    ]),
    mounted: function () {
    },
    methods: {
      test () {
        console.log(this.$store.state.Info)
      },
      toggleShow () {
        this.show = !this.show
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess (imgDataUrl, field) {
        console.log('-------- crop success --------')
        this.imgDataUrl = imgDataUrl
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess (jsonData, field) {
        console.log('-------- upload success --------')
        console.log(jsonData)
        console.log('field: ' + field)
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail (status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
      }
    }
  }

</script>

<style>

</style>
