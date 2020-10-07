<template>
  <div id="main">
    <div class="fof">
      <h1 id="error-code" v-text="error_code"></h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {
      error_code: ''
    }
  },
  methods: {
    typeText() {
      const text = '404 NOT FOUND'
      let i = 0
      const timer = setInterval(() => {
        if (i >= text.length) clearInterval(timer)
        const char = text.charAt(i)
        this.error_code = this.error_code + char
        i++
      }, 150)
    }
  },
  created () {
    this.typeText()
  }
}
</script>

<style scoped lang="sass">
#main
  display: table
  width: 100%
  height: 100vh
  text-align: center
.fof
  display: table-cell
  vertical-align: middle
  #error-code
    font-size: 55px
    display: inline-block
    padding-right: 12px
    animation: type .5s alternate infinite
    @media screen and (max-width: 500px)
      font-size: calc(13vw - 12px)
    &::after
      //content: ''
      width: 3px
      height: 50px
      background-color: #888
      position: relative
      display: inline-block
      margin: 0 10px
      transform: scaleY(1.3) translate(22px,4px)
      animation: type2 .5s alternate infinite
@keyframes type
  from
    box-shadow: inset -3px 0px 0px #888
  to
    box-shadow: inset -3px 0px 0px transparent
@keyframes type2
  from
    opacity: 1
  to
    opacity: 0

</style>
