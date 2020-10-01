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
  @import "src/assets/style/components/BlackMask"
</style>
