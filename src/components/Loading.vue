<template>
  <div id="loading-container">
    <div class="wavy">
      <span style="--i:1;">W</span>
      <span style="--i:2;">a</span>
      <span style="--i:3;">i</span>
      <span style="--i:4;">t</span>
      <span style="--i:5;">.</span>
      <span style="--i:6;">.</span>
      <span style="--i:7;">.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="sass">
@import "/src/assets/style/public"
#loading-container
  font-family: 'Trebuchet MS', serif
  animation: bg-flash 1.5s ease-in-out infinite
  font-size: 15px
  position: fixed
  z-index: 20
  display: flex
  justify-content: center
  align-items: center
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  background-color: rgba(255,255,255,.5)
  transition: opacity .3s ease-in-out
  opacity: 0
  .wavy
    position: relative
    -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2))
    span
      $size-width: 50px
      $size-height: 70px
      width: $size-width
      height: $size-height
      margin: 0
      text-align: center
      line-height: $size-height
      background-color: $foreground-color
      position: relative
      display: inline-block
      color: #fff
      font-size: 2em
      text-transform: uppercase
      animation: animate 2.5s ease-in-out infinite
      animation-delay: calc(.2s * var(--i))
      user-select: none
      &::before
        content: ''
        width: $size-width
        top: $size-height
        position: absolute
        left: 0
        background-color: darken($foreground-color,5%)
        animation: animate2 2.5s ease-in-out infinite
        animation-delay: calc(.2s * var(--i))
@media screen and (max-width: 480px)
  #loading-container
    .wavy
      span
        $size-width: 30px
        $size-height: 50px
        font-size: 1.2rem
        width: $size-width
        height: $size-height
        line-height: $size-height
        &::before
          width: $size-width
          top: $size-height
@keyframes animate
  0%, 100%
    transform: translateY(0px)
  20%
    transform: translateY(-20px)

  40%
    transform: translateY(0px)

@keyframes animate2
  0%, 100%
    height: 0
    opacity: 0
  20%
    height: 20px
    opacity: 1
  40%
    height: 0
    opacity: 0

@keyframes bg-flash
  0%, 100%
    background-color: rgba(255,255,255,.6)
  50%
    background-color: rgba(255,255,255,.4)
</style>
