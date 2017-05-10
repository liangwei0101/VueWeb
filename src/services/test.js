/**
 * Created by 梁伟 on 2017/4/29.
 */

var flge = 0
var loginShow = true
function setFlag (value) {
  flge++
}
function setLoginShow (value) {
  loginShow = value
}
export {flge, setFlag, loginShow, setLoginShow}
