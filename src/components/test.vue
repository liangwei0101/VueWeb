<template>

    <form @submit.prevent="validateForm('form-1')" data-vv-scope="form-1">
      <legend>Form 1</legend>


          <input name="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('form-1.email') }" type="text" placeholder="Email">
          <div>
          <i v-show="errors.has('form-1.email')" class="fa fa-warning"></i>
          <span v-show="errors.has('form-1.email')" class="help is-danger">{{ errors.first('form-1.email') }}</span>
          </div>

      <div class="column is-12">
        <p class="control">
          <button class="button is-primary" type="submit" name="button">Sign up</button>
          <button class="button is-danger" type="button" name="button" @click="errors.clear('form-1')">Clear</button>
        </p>
      </div>
    </form>
</template>

<script>
  import Vue from 'vue'
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
    data: function () {
      return {
        addIsAbleShowClass: {
          modal: false,
          fade: false
        },
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
        console.log('------------------------')
      },
      validateForm (scope) {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            // eslint-disable-next-line
            alert('Form Submitted!');
          }
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
