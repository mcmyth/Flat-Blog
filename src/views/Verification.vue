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
      // http://127.0.0.1:3003/user/verification?type=email&code=EpDIm&id=42
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
#account-content
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .logo
    $size: 100px
    position: relative
    height: $size
    width: $size
    border-radius: 50%
    display: flex
    justify-content: center
    align-items: center
    color: #ffffff
    font-size: $size / 2
    animation: jump 1s ease-in-out
    &.ok
      background-color: #4caf50
    &.error
      background-color: #EE5353
  #description
    margin-top: 30px
    animation: fadeIn .4s ease-in-out
    #description-title
      font-size: 1.5rem
@keyframes jump
  0%
    transform: scale(1.5)
  25%
    transform: scale(1.1)
  50%
    transform: scale(1.2)
  100%
    transform: scale(1)
@keyframes fadeIn
  0%
    transform: translateY(20px)
    opacity: 0
  100%
    opacity: 1
    transform: translateY(0)
</style>
