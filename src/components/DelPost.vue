<template>
  <div id="confirm-dialog" :class="active">
    <div id="confirm-dialog-body">
      <div id="confirm-dialog-title">
        <slot name="title"></slot>
      </div>
      <div id="confirm-dialog-content">
        <slot name="content"></slot>
      </div>
      <div id="confirm-dialog-button">
        <button>Yes</button>
        <button @click="setStatus">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  components: {
  },
  props: [
    'active',
    'confirmNo'
  ],
  methods: {
    setStatus() {
      this.$emit('status', 'disable')
    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/style/public"
#confirm-dialog
  pointer-events: none
  &.active
    pointer-events: unset
  &.active #confirm-dialog-body
    transform: translate(-50%, -50%)
  #confirm-dialog-button
    display: flex
    margin: 0 auto 20px auto
    width: 90%
    max-width: 400px
    button
      @include button
      width: 45%
      display: inline-block
    button:nth-child(1)
      $base_color: #E33B4C
      background-color: $base_color
      &:hover
        background-color: lighten($base_color, 5%)
      &:active
        background-color: darken($base_color, 10%) !important

#confirm-dialog-body
  position: fixed
  width: 90vw
  max-width: 700px
  background-color: white
  top: 50%
  left: 50%
  transform: translate(-50%, -100vh)
  z-index: 12
  box-sizing: border-box
  border-radius: 20px
  transition: transform .5s ease-in-out
  #confirm-dialog-title
    padding: 20px 15px
    text-align: center
    border-bottom: solid #EDEDED 1px
    font-size: 1.5rem
  #confirm-dialog-content
    font-size: 1.2rem
    text-align: center
    padding: 25px 15px
    line-height: 2rem
</style>
