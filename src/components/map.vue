<template>
  <doc-preview>
    <baidu-map slot="map" class="map" :scroll-wheel-zoom="true" :zoom="zoom" :events="events">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"/>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"/>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"/>
      <bm-city-list anchor="BMAP_ANCHOR_BOTTOM_LEFT"/>
      <bm-view style="position: absolute; top: 55px; bottom: 0px; left: 5px; right: 5px"></bm-view>
      <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :label="{content: 'Marker Label', opts: {offset: {width: 20, height: -10}}}"></bm-marker>
    </baidu-map>
  </doc-preview>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'wXo9kNVgHgsVndwBXcHmlOh3sYdu3la9'
})

export default {
  data () {
    return {
      center: {lng: 0, lat: 0},
      events: {
        'locationSuccess': () => {
          alert('我是定位成功')
        },
        'locationError': () => {
          alert('我是定位失败')
        },
        'click': (e) => {
          alert('map clicked')
        }
      }
    }
  },
  mounted () {
    this.lng = 116.404
    this.lat = 39.915
  },
  methods: {
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
    }
  }
}
</script>

<style>

</style>
