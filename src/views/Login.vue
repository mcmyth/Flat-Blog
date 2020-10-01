<template>
  <div id="login-container">
    <div id="account-box" :class="isRegisterActive">
      <div id="login-tips">Register Here...</div>
      <div @click="changeRegisterActive" id="show-register-box"  :title="isRegisterActive === '' ? 'Register' : 'Login' ">
        <font-awesome-icon v-if="this.isRegisterActive === ''" class="menu-icon login" :icon="['fas', 'user-circle']" />
        <font-awesome-icon v-if="this.isRegisterActive === 'register-active'" class="menu-icon register" :icon="['fas', 'times']" />
      </div>
      <!--Login UI-->
      <div id="login-box">
        <div id="login-title">ACCOUNT LOGIN</div>
        <div id="login-form">
          <div id="login-username">
            USERNAME<br/>
            <input v-model="username" type="text">
          </div>
          <div id="login-password">
            PASSWORD<br/>
            <input v-model="password"  type="text">
          </div>
          <div id="login-captcha">
            SECURITY CHECK<br/>
            <input v-model="captchaKey" type="text"> <img @click="refreshCaptchaKey" :src="captchaCodeLink" alt="" class="captcha-img">
          </div>
          <div id="pw-group" >
<!--            <span><el-checkbox id="remember">REMEMBER ME</el-checkbox></span>-->
            <span><input type="checkbox" id="remember" name="remember"><label for="remember">REMEMBER ME</label></span>
            <span>FORGOT?</span>
          </div>
          <button id="login-button" @click="login">LOGIN</button>
        </div>
      </div>
      <!--Register UI-->
      <div :class="isRegisterActive" id="register-box">
        <div id="register-title">REGISTER ACCOUNT</div>
        <div id="register-form">
          <div id="register-username">
            USERNAME<br/>
            <input v-model="username" type="text">
          </div>
          <div id="register-password">
            PASSWORD<br/>
            <input v-model="password" type="text">
          </div>
          <div id="register-email">
            EMAIL<br/>
            <input v-model="email" type="text">
          </div>
          <div id="register-captcha">
            SECURITY CHECK<br/>
            <input v-model="captchaKey" type="text"> <img @click="refreshCaptchaKey" :src="captchaCodeLink" alt="" class="captcha-img">
          </div>
        </div>
        <button @click="register" id="register-button">REGISTER</button>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isRegisterActive: '',
      captchaCodeLink: '',
      captchaKey: '',
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    changeRegisterActive() {
      this.isRegisterActive = this.isRegisterActive === '' ? 'register-active' : ''
      this.refreshCaptchaKey()
    },
    refreshCaptchaKey () {
      this.captchaCodeLink = this.$store.state.apiURL + 'captcha?rnd' + Math.random()
    },
    login() {
      const captchaKey = this.captchaKey
      this.$post('user/login', {
        username: this.username,
        password: this.password,
        captchaKey
      }).then(res => {
        this.refreshCaptchaKey()
        if (res.status === 'ok') {
          this.$cookie.set('token', res.token, 1)
          this.$store.commit('updateLoginState')
        }
        alert(res.msg)
        this.$router.back()
      })
    },
    register() {
      this.$post('user/register', {
        username: this.username,
        password: this.password,
        email: this.email,
        captchaKey: this.captchaKey
      }).then(res => {
        this.refreshCaptchaKey()
        alert(res.msg)
        this.$router.push('/')
      })
    }
  },
  mounted() {
    this.refreshCaptchaKey()
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Login"
</style>
