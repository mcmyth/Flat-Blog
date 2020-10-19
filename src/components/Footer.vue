<template>
<div>
  <div id="footer">
    <span id="copyright">Copyright © {{ getFullYear }} by MC Myth. All rights reserved.</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    getFullYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped lang="sass">
#footer
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  color: #8a8a8a
  padding: 20px 0
  background-color: white
  border-top: solid 1px #e2e2e2
  font-size: 15px
  font-family: Helvetica,sans-serif
  font-weight: bold
  position: relative
  bottom: 0
  width: 100%
  box-sizing: border-box
  span#copyright
    max-width: 90%
    text-align: center
</style>
