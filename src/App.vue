<template>
  <div id="app" v-cloak>
    <Navbar v-if="noNavbar.indexOf($route.path) === -1 && invalidRoute === false"></Navbar>
    <BackToTop></BackToTop>
    <Error404 v-if="invalidRoute"></Error404>
    <router-view v-else/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Error404 from '@/components/Error404'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'App',
  data() {
    return {
      noNavbar: ['/login']
    }
  },
  computed: {
    invalidRoute () {
      return !this.$route.matched || this.$route.matched.length === 0
    }
  },
  components: {
    Navbar,
    Error404,
    BackToTop
  },
  created () {
  }
}
</script>
<style>
[v-cloak]{
  display: none;
}
body,html{
  margin: 0;
  font-size: 15px;
  color: #535353;
  font-family: "微软雅黑";
  background-color: #ececec;
}
</style>
