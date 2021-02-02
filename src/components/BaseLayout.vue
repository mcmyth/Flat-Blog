<template>
  <div class="base-layout">
    <Navbar/>
    <back-to-top/>
    <slot/>
    <Footer></Footer>
  </div>
</template>

<script>

import BackToTop from '@/components/BackToTop'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  name: 'BaseLayout',
  components: {
    Navbar,
    Footer,
    BackToTop
  }
}
</script>

<style scoped>

</style>
