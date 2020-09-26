<template>
  <div @click="backtop" class="circle" :class="isActive">
      <div class="wave">
        <div class="cell1" :style="'bottom:' + top * 100 + '%'"></div>
        <div class="cell2" :style="'bottom:' + top2 * 100 + '%'"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      top: 0,
      top2: 0,
      isActive: ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      this.top = 1 - scrollTop
      this.top2 = 1 - scrollTop + 0.15
      if (this.top2 > 1) this.top2 = 1
      if (document.documentElement.scrollTop > 300) { this.isActive = 'active' } else { this.isActive = false }
    },
    backtop() {
      const timer = setInterval(function() {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 10)
    }
  }
}
</script>

<style scoped lang="sass">
$churnColor: white
$frontWaveColor: #29B6F6
$backWaveColor: #0288D1
$churnSpeed: 3s
.circle
  position: fixed
  width: 53px
  height: 53px
  background: #29B6F6
  border-radius: 50%
  overflow: hidden
  bottom: -60px
  transition: bottom .3s ease-in-out
  right: 30px
  z-index: 2
  box-sizing: border-box
  border: solid 1px #29B6F6
  &.active
    bottom: 30px
.wave
  position: relative
  width: 100%
  height: 100%
  background: $frontWaveColor
  border-radius: 50%
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5)
  cursor: pointer
  & .cell1, & .cell2
    position: absolute
    width: 200%
    height: 200%
    left: -50%
  & .cell1
    border-radius: 35%
    background: $backWaveColor
    animation: flow $churnSpeed linear infinite
    bottom: 100%
  & .cell2
    border-radius: 40%
    background: $churnColor
    animation: flow $churnSpeed linear infinite
    bottom: 120%
    animation-delay: .2s
  .bubble
    position: absolute
    width: 50px
    height: 50px
    background: white
    border-radius: 50%
    animation: rise 5s infinite linear
@keyframes flow
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
@keyframes rise
  0%
    transform: translate(0, 0)
  20%
    transform: translate(10px, -20px)
  40%
    transform: translate(-10px, -40px)
  60%
    transform: translate(-10px, -60px)
  80%
    transform: translate(10px, -80px)
  100%
    transform: translate(-10px, -100px)
    opacity: 0
</style>
