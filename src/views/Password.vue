<template>
<div id="account-container">
  <div id="account-content">
    <div v-if="status === ''" id="step1">
      <div id="account-title">{{code === null ? '忘记密码' : '更改密码'}}</div>
      <div id="forgot" v-if="code === null">
        <span class="input-title">账号</span>
        <input type="text" v-model="account">
        <button @click="forgot" class="next">下一步</button>
      </div>
      <div v-else id="change">
        <span class="input-title">新密码</span>
        <input v-model="password" type="password">
        <button @click="change" class="next">完成</button>
      </div>
    </div>
    <div v-else id="step2">
      <div v-if="status === 'ok'" class="logo ok">
        <font-awesome-icon  :icon="['fas', 'check']" />
      </div>
      <div v-if="status === 'error'" class="logo error">
        <font-awesome-icon  :icon="['fas', 'times']" />
      </div>
      <div id="description">
      <span id="description-title">
        {{ descriptionTitle }}
        <br/>
        <span><router-link tag="a" :to="'/email?account=' + account" v-if="email_verified === 0">邮箱不正确?</router-link></span>
        <button @click="reset" v-if="status === 'error'">返回</button>
        <router-link v-if="status === 'ok'" to="/login" tag="button">登录</router-link>
      </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'verification',
  data() {
    return {
      code: null,
      status: '',
      account: '',
      descriptionTitle: '',
      password: '',
      email_verified: ''
    }
  },
  methods: {
    async setup() {
      const code = this.$route.query.code
      const account = this.$route.query.account
      if (code !== undefined) this.code = code
      if (account !== undefined) this.account = account
    },
    reset() {
      this.code = null
      this.status = ''
      this.account = ''
      this.descriptionTitle = ''
      this.password = ''
      this.email_verified = ''
      this.setup()
    },
    async forgot() {
      const res = await this.$post('user/verification', {
        type: 'password',
        id: this.account
      })
      this.status = res.status
      this.descriptionTitle = res.msg
      this.email_verified = res.email_verified
      this.$noty.success(res.msg, {
        killer: true
      })
    },
    async change() {
      const id = this.$route.query.id
      const code = this.$route.query.code
      const res = await this.$get(`user/verification?type=password&id=${id}&code=${code}&password=${this.password}`)
      if (res.status !== 'warning') {
        this.status = res.status
        this.descriptionTitle = res.msg
      }
      if (res.status === 'warning') {
        this.$noty.success(res.msg, {
          killer: true
        })
      }
    }
  },
  created() {
    this.setup()
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/style/views/Account"
@import "src/assets/style/public"
$page-width: 90%
#account-content
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 20px 5vw
  height: 350px !important
  #description
    text-align: center
    span a
      font-size: .9rem
    button
      @include button
      padding: 10px 20px
  button.next
    @include button
    padding: 10px 20px
    float: right
  #step1, #step2
    width: 100%
  #step2
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
  input
    @include input
    box-sizing: border-box
    width: 100%
    margin-bottom: 5px
  #account-title
    width: $page-width
#forgot
  width: 100%
  .input-title
    font-size: .8rem
</style>
