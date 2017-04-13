<template>
  <div class="hello">
  <!-- START BREADCRUMB -->
  <ul class="breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">Forms Stuff</a></li>
    <li class="active">Form Wizards</li>
  </ul>
  <!-- END BREADCRUMB -->

  <!-- PAGE TITLE -->
  <div class="page-title">
    <h2><span class="fa fa-arrow-circle-o-left"></span> Form Wizards</h2>
  </div>
  <!-- END PAGE TITLE -->

  <!-- PAGE CONTENT WRAPPER -->
  <div class="page-content-wrap">

    <div class="row">
      <div class="col-md-12">

        <!-- START DEFAULT WIZARD -->
        <div class="block">
          <h4>Default Wizard</h4>
          <div class="wizard">

            <ul>
              <li>
                <a href="#step-1">
                  <span class="stepNumber">1</span>
                  <span class="stepDesc">Step 1<br /><small>Step 1 description</small></span>
                </a>
              </li>
              <li>
                <a href="#step-2">
                  <span class="stepNumber">2</span>
                  <span class="stepDesc">Step 2<br /><small>Step 2 description</small></span>
                </a>
              </li>
              <li>
                <a href="#step-3">
                  <span class="stepNumber">3</span>
                  <span class="stepDesc">Step 3<br /><small>Step 3 description</small></span>
                </a>
              </li>
              <li>
                <a href="#step-4">
                  <span class="stepNumber">4</span>
                  <span class="stepDesc">Step 4<br /><small>Step 4 description</small></span>
                </a>
              </li>
            </ul>
            <div id="step-1">
              <h4>Step 1 Content</h4>
              <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
            </div>
            <div id="step-2">
              <h4>Step 2 Content</h4>
              <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
            </div>
            <div id="step-3">
              <h4>Step 3 Content</h4>
              <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
            </div>
            <div id="step-4">
              <h4>Step 4 Content</h4>
              <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
            </div>

          </div>
        </div>
        <!-- END DEFAULT WIZARD -->

        <!-- START WIZARD WITH SUBMIT BUTTON -->
        <div class="block">
          <h4>Wizard With Submit</h4>
          <form action="javascript:alert('Submited!');" role="form" class="form-horizontal">
            <div class="wizard show-submit">
              <ul>
                <li>
                  <a href="#step-5">
                    <span class="stepNumber">1</span>
                    <span class="stepDesc">User<br /><small>Personal data</small></span>
                  </a>
                </li>
                <li>
                  <a href="#step-6">
                    <span class="stepNumber">2</span>
                    <span class="stepDesc">Contact<br /><small>Information</small></span>
                  </a>
                </li>
              </ul>
              <div id="step-5">

                <div class="form-group">
                  <label class="col-md-2 control-label">Name</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" placeholder="Your name"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">About</label>
                  <div class="col-md-10">
                    <textarea class="form-control" rows="5" placeholder="Something about you"></textarea>
                  </div>
                </div>

              </div>
              <div id="step-6">

                <div class="form-group">
                  <label class="col-md-2 control-label">Phone</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" placeholder="Your phone number"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">E-mail</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" placeholder="Your email"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">Adress</label>
                  <div class="col-md-5">
                    <input type="text" class="form-control" placeholder="City"/>
                  </div>
                  <div class="col-md-5">
                    <input type="text" class="form-control" placeholder="Street"/>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
        <!-- END WIZARD WITH SUBMIT BUTTON -->

        <!-- START WIZARD WITH VALIDATION -->
        <div class="block">
          <h4>Wizard with form validation</h4>
          <form action="javascript:alert('Validated!');" role="form" class="form-horizontal" id="wizard-validation">
            <div class="wizard show-submit wizard-validation">
              <ul>
                <li>
                  <a href="#step-7">
                    <span class="stepNumber">1</span>
                    <span class="stepDesc">Login<br /><small>Information</small></span>
                  </a>
                </li>
                <li>
                  <a href="#step-8">
                    <span class="stepNumber">2</span>
                    <span class="stepDesc">User<br /><small>Personal data</small></span>
                  </a>
                </li>
              </ul>

              <div id="step-7">

                <div class="form-group">
                  <label class="col-md-2 control-label">Login</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" name="login" placeholder="Login"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">Password</label>
                  <div class="col-md-10">
                    <input type="password" class="form-control" name="password" placeholder="Password" id="password"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">Re-Password</label>
                  <div class="col-md-10">
                    <input type="password" class="form-control" name="repassword" placeholder="Re-Password"/>
                  </div>
                </div>

              </div>

              <div id="step-8">

                <div class="form-group">
                  <label class="col-md-2 control-label">Name</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" name="name" placeholder="Name"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">E-mail</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" name="email" placeholder="Your email"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">Adress</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" name="adress" placeholder="Your adress"/>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
        <!-- END WIZARD WITH VALIDATION -->

      </div>

    </div>

  </div>
  <!-- PAGE CONTENT WRAPPER -->
  </div>
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
