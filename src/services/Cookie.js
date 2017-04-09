/**
 * Created by 梁伟 on 2017/4/7.
 */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueCookie)

export function getCookie () {
  var temp = Vue.cookie.get('userInfo')
  if (temp === '' || temp === undefined || temp === null) {
    return
  } else {
    var arr = temp.split('&')
    var dic = new Array(arr.length)
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf('=')
      var dicKey = arr[i].substring(0, index)
      var value = arr[i].substr(index + 1)
      dic[dicKey] = value
    }
    return dic
  }
}
