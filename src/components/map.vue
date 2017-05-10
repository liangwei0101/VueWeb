<template>
  <div>
    <!-- START BREADCRUMB -->
    <ul class="breadcrumb">
      <li><a>用户</a></li>
      <li class="active">放射源定位</li>
    </ul>
    <!-- END BREADCRUMB -->

    <!-- PAGE TITLE -->
    <div class="page-title">
      <h2><span class="fa fa-arrow-circle-o-left"></span> 放射源定位</h2>
    </div>
    <!-- END PAGE TITLE -->
  <!-- 任务列表 -->
  <div class="page-content-wrap">

    <div class="row">
      <div class="col-md-12">
        <!-- LIST GROUP WITH BADGES -->
        <div class="panel panel-default ">
          <div class="panel-heading">
            <h3 class="panel-title">放射源列表</h3>
          </div>
          <!-- CONTACTS WITH STATUS -->
          <div class="panel-body list-group list-group-contacts">
            <a class="list-group-item " v-for="item in AllInfo" @click="clickList(item)">
              <span class="contacts-title">{{item.name}}-{{item.place}}</span>
              <p>负责人：{{item.principal}}</p>
            </a>
          </div>
          <!-- CONTACTS WITH STATUS -->
        </div>
        <!-- END CONTACTS WITH STATUS -->
      </div>
      <div class="col-md-12">
        <!-- LIST GROUP WITH BADGES -->
        <div class="panel panel-default ">
          <div class="panel-heading">
            <h3 class="panel-title">放射源地图定位</h3>
          </div>
          <div class="panel-body">
            <baidu-map class="bm-view" :scroll-wheel-zoom="true" :center="position" :zoom="15"  @ready="handler">
              <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"/>
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
              <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"/>
       <!--       <bm-marker :position="{lng: 114.93590908, lat: 25.84529554}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 200, height: 157}}" @click="infoWindowOpen">
                <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window>
              </bm-marker>-->
              <bm-marker @click="infoWindowOpen" :position="position" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 200, height: 157}}">
                <bm-info-window  :position="position" :show="show" @close="infoWindowClose">
                  <strong>放射源名称：{{Show.name}}</strong>
                  <p>负责人：{{Show.principal}}</p>
                </bm-info-window>
              </bm-marker>
          <!--    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"/>-->
              <bm-view style="position: absolute; top: 5px; bottom: 5px; left: 5px; right: 5px"></bm-view>
            </baidu-map>
          </div>
        </div>
        <!-- END CONTACTS WITH STATUS -->
      </div>
    </div>

  </div>
  <!-- 任务列表 -->
 <!--   <doc-preview>
      <baidu-map slot="map" class="map" :scroll-wheel-zoom="true" :center="{lng: 114.93590908, lat: 25.84529554}" :zoom="15" :events="events">
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"/>
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"/>
        <bm-view style="position: absolute; top: 55px; bottom: 0px; left: 5px; right: 5px"></bm-view>
        <bm-marker :position="{lng: 114.93590908, lat: 25.84529554}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :label="{content: '我是放射源一号', opts: {offset: {width: 20, height: -10}}}"></bm-marker>
      </baidu-map>
    </doc-preview>-->

  </div>
</template>

<!--<script src="/static/js/easydialog.min.js" ></script>-->
<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import {getCookie, CookieUserType} from '../services/Cookie'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'wXo9kNVgHgsVndwBXcHmlOh3sYdu3la9'
})

export default {
  data () {
    return {
      AllInfo: [],
      Cookie: {
        userid: '',
        name: ''
      },
      center: {lng: 0, lat: 0},
      show: false,
      position: {lng: 116.404, lat: 39.915},
      Show: {name: '', principal: ''}
    }
  },
  mounted () {
    this.vueCookie()
    this.getRadioactiveInfo()
  },
  methods: {
    getRadioactiveInfo () {
      var getUrl = 'http://localhost:3000/radioactive/get'
      if (CookieUserType() === '2') {
        getUrl = 'http://localhost:3000/radioactive/get' + '/' + this.Cookie.userid
      }
      var resource = this.$resource(getUrl)
      resource.get()
        .then((response) => {
          this.AllInfo = response.body
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    vueCookie () {
      this.Dic = getCookie()
      this.Cookie.userid = this.Dic['userid']
    },
    test () {
      var map = new BaiduMap.Map('allmap')
      var point = new BaiduMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 12)
      var BMAP_STATUS_SUCCESS = '0'
      var geolocation = new BaiduMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          var mk = new BaiduMap.Marker(r.point)
          map.addOverlay(mk)
          map.panTo(r.point)
          alert('您的位置：' + r.point.lng + ',' + r.point.lat)
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
    },
    ts () {
      var map = new BaiduMap.Map('container')
      map.centerAndZoom(new BaiduMap.Point(116.404, 39.915), 11)
      map.addEventListener('click', function () {
        alert('您点击了地图。')
      })
    },
    handler () {
      this.lng = 116.404
      this.lat = 39.915
    },
    clickList (item) {
      this.Show.name = item.name
      this.Show.principal = item.principal
      this.position.lng = item.lng
      this.position.lat = item.lat
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    }
  }
}
</script>

<style>
  .bm-view {
    width: 100%;
    height: 600px;
  }
</style>
