<template>
    <img @click="refreshCaptchaKey" :src="captchaCodeLink" alt="" class="captcha-img">
</template>

<script>
export default {
  name: 'captchaKey',
  data () {
    return {
      captchaCodeLink: ''
    }
  },
  methods: {
    refreshCaptchaKey () {
      this.captchaCodeLink = this.$store.state.apiURL + 'captcha?rnd' + Math.random()
    }
  },
  created() {
    this.refreshCaptchaKey()
  }
}
</script>

<style scoped lang="sass">
.captcha-img
  height: 40px
  width: 120px
  border-radius: 5px
</style>
