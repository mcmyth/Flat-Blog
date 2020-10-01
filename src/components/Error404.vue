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
  @import "src/assets/style/components/Error404"
</style>
