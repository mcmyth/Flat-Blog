<template>
<div id="account-container">
  <div id="account-content">
    <div v-if="status === ''" id="step1">
      <div id="account-title">更改邮箱</div>
      <div>
        <span class="input-title">账号</span>
        <input type="text" v-model="account">
        <span class="input-title">新邮箱</span>
        <input type="text" v-model="email">
        <button @click="changeEmail" class="next">下一步</button>
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
        <button @click="reset" v-if="status === 'error'">返回</button>
        <router-link v-if="status === 'ok'" :to="'/pwd?account=' + account" tag="button">更改密码</router-link>
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
      status: '',
      account: '',
      email: '',
      descriptionTitle: ''
    }
  },
  methods: {
    async setup() {
      const account = this.$route.query.account
      if (account !== undefined) this.account = account
    },
    reset() {
      this.status = ''
      this.account = ''
      this.email = ''
      this.descriptionTitle = ''
      this.setup()
    },
    async changeEmail() {
      const res = await this.$post('user/verification', {
        type: 'email',
        id: this.account,
        email: this.email
      })
      this.status = res.status
      this.descriptionTitle = res.msg
      this.$noty.success(res.msg, {
        killer: true
      })
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
  height: 380px !important
  #description
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
  #step1 span.input-title
    font-size: .8rem
    display: inline-block
    margin-top: 10px
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
