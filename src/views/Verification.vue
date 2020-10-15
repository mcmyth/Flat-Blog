<template>
<div id="account-container">
  <div id="account-content" v-show="status !== ''">
    <div v-if="status === 'ok'" class="logo ok">
      <font-awesome-icon  :icon="['fas', 'check']" />
    </div>
    <div v-if="status === 'error'" class="logo error">
      <font-awesome-icon  :icon="['fas', 'times']" />
    </div>
    <div id="description">
      <span id="description-title">
        {{ descriptionTitle }}
        <router-link tag="button" to="/">返回主页</router-link>
      </span>
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
      descriptionTitle: ''
    }
  },
  methods: {
    async setup() {
      const type = this.$route.query.type
      const id = this.$route.query.id
      const code = this.$route.query.code
      const res = await this.$get(`user/verification?type=${type}&id=${id}&code=${code}`)
      this.descriptionTitle = res.msg
      this.status = res.status
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
#account-content
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  #description-title
    button
      @include button
      padding: 10px 20px
</style>
