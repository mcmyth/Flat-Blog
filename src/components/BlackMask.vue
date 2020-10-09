<template>
  <div id="black-mask" :class="active"></div>
</template>

<script>
export default {
  name: 'BlackMask',
  props: [
    'active'
  ],
  watch: {
    active: (newVal, oldVal) => {
      // console.log(newVal)
    }
  }
}
</script>

<style scoped lang="sass">
$small-width: 410px
#black-mask
  background-color: rgba(0, 0, 0, 0.3)
  width: 100vw
  height: 100vh
  position: fixed
  top: 0
  z-index: 11
  opacity: 0
  pointer-events: none
  &.active
    pointer-events: unset
    opacity: 1
@media screen and (max-width: $small-width)
  .menubar-mask.open
    opacity: 1 !important
    pointer-events: unset !important

</style>
