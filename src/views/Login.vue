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
            <input v-model="password"  type="password">
          </div>
          <div id="login-captcha">
            SECURITY CHECK<br/>
            <input @keypress.enter="login" v-model="captchaKey" type="text">
<!--            <img @click="refreshCaptchaKey" :src="captchaCodeLink" alt="" class="captcha-img">-->
            <captcha-key ref="LoginCaptchaKey" class="captcha-img"></captcha-key>
          </div>
          <div id="pw-group" >
<!--            <span><el-checkbox id="remember">REMEMBER ME</el-checkbox></span>-->
            <span><input type="checkbox" id="remember" ref="remember" name="remember"><label for="remember">REMEMBER ME</label></span>
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
            <input  v-model="username" id="reg-name" type="text">
            <label for="reg-name"><span>长度3-8且必须包含大写或小写字母,可包含数字或下划线</span></label>
          </div>
          <div id="register-password">
            PASSWORD<br/>
            <input v-model="password" id="reg-password" type="password">
            <label for="reg-password"><span>长度6-16且必须包含以下2种组合(0-9,A-Z,a-z,@#$%^&*?+_)</span></label>
          </div>
          <div id="register-email">
            EMAIL<br/>
            <input v-model="email" id="reg-email" type="text">
          </div>
          <div id="register-captcha">
            SECURITY CHECK<br/>
<!--             <img @click="refreshCaptchaKey" :src="captchaCodeLink" alt="" class="captcha-img">-->
            <input @keypress.enter="register" v-model="captchaKey" type="text">
            <captcha-key ref="RegisterCaptchaKey" class="captcha-img"></captcha-key>
          </div>
        </div>
        <button @click="register" id="register-button">REGISTER</button>
      </div>
      </div>
    </div>
</template>

<script>
import captchaKey from '@/components/captchaKey'
export default {
  name: 'Login',
  data() {
    return {
      isRegisterActive: '',
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
      this.captchaKey = ''
      this.username = ''
      this.password = ''
    },
    refreshCaptchaKey() {
      if (this.isRegisterActive === '') {
        this.$refs.LoginCaptchaKey.refreshCaptchaKey()
      } else {
        this.$refs.RegisterCaptchaKey.refreshCaptchaKey()
      }
    },
    async login() {
      const captchaKey = this.captchaKey
      const res = await this.$post('user/login', {
        username: this.username,
        password: this.password,
        captchaKey
      })
      this.refreshCaptchaKey()
      if (res.status === 'ok') {
        localStorage.setItem('accessToken', res.token)
        this.$store.commit('updateLoginState')
        this.$noty.success(res.msg, {
          killer: true
        })
        if (this.$refs.remember.checked) {
          localStorage.setItem('account', JSON.stringify({
            username: this.username,
            password: this.password
          }))
        } else {
          localStorage.removeItem('account')
        }
        this.$router.push('/')
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    },
    async register() {
      const res = await this.$post('user/register', {
        username: this.username,
        password: this.password,
        email: this.email,
        captchaKey: this.captchaKey
      })
      this.refreshCaptchaKey()
      if (res.status === 'ok') {
        this.$noty.success(res.msg, {
          killer: true
        })
        localStorage.setItem('accessToken', res.token)
        this.$store.commit('updateLoginState')
        this.$router.push('/')
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    }
  },
  mounted() {
    this.refreshCaptchaKey()
    const rememberUser = JSON.parse(window.localStorage.getItem('account'))
    if (rememberUser !== null) {
      this.$refs.remember.checked = true
      this.username = rememberUser.username
      this.password = rememberUser.password
    }
  },
  components: {
    captchaKey
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Login"
</style>
