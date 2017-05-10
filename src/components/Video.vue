<template>
  <div>
    <!-- PAGE CONTENT WRAPPER -->
    <div class="page-content-wrap">

      <div class="row">

        <div class="col-md-6">
          <!-- START MESSAGE BOX -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">视频直播</h3>
            </div>
            <div class="panel-body">
              <div id="playercontainer"></div>
            </div>
          </div>
          <!-- END MESSAGE BOX -->

        </div>

        <div class="col-md-6">

          <!-- START NOTY PLUGIN -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">视频播放</h3>
            </div>
            <div class="panel-body">
              <video-player :options="videoOptions"></video-player>
            </div>
          </div>
          <!-- END NOTY PLUGIN -->

        </div>

        <div class="col-md-6">

          <!-- START NOTY PLUGIN -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">摄像头调用</h3>
              <button class="btn btn-success pull-right" @click="cameraView"><i class="fa fa-laptop"></i> 开启</button>
            </div>
            <div class="panel-body">
              <video width="690" id="video"  autoplay></video>
            </div>
          </div>
          <!-- END NOTY PLUGIN -->

        </div>

      </div>

    </div>
    <!-- PAGE CONTENT WRAPPER -->
  </div>
</template>


<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import cyberplayer from '../../static/player/cyberplayer'
  import VueVideoPlayer from 'vue-video-player'
  Vue.use(VueResource)
  Vue.use(VueVideoPlayer)

  export default {
    data: function () {
      return {
        videoOptions: {
          // component options
          start: 0,
          playsinline: false,
          // videojs options
          muted: false,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: 'http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_H'
          }],
          poster: '/static/images/author.jpg'
        }
      }
    },
    mounted: function () {
      this.playerInit()
    },
    methods: {
      playerInit () {
        cyberplayer('playercontainer').setup({
          width: 690,
          height: 360,
          stretching: 'uniform',
          file: 'rtmp://play.bcelive.com/live/lss-hdry0hi4h5vmkihu',
          autostart: true,
          repeat: false,
          volume: 100,
          controls: true,
          isLive: true,
          rtmp: {
            reconnecttime: 10,
            bufferlength: 1
          },
          ak: '2cbd26382a244e49b6b35779ec40fe38'
        })
      },
      cameraView () {
        // Grab elements, create settings, etc.
        var video = document.getElementById('video')
        // Get access to the camera!
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.src = window.URL.createObjectURL(stream)
            video.play()
          })
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
