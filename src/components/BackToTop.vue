<template>
  <div @click="backtop" class="circle" :class="isActive">
      <div class="wave" title="返回顶部">
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
  @import "src/assets/style/components/BackToTop"
</style>
