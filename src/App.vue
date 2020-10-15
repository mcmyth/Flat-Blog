<template>
  <div id="app" v-cloak>
    <loading :style="isLoading === true ? 'opacity: 1' : 'opacity: 0;pointer-events:none;'"></loading>
    <navbar v-if="noNavbar.indexOf($route.path) === -1 && invalidRoute === false"></navbar>
    <back-to-top></back-to-top>
    <router-view v-if="!invalidRoute"/>
    <error404 v-else></error404>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Error404 from '@/components/Error404'
import BackToTop from '@/components/BackToTop'
import Loading from '@/components/Loading'
export default {
  name: 'App',
  data() {
    return {
      noNavbar: ['/login', '/verification', '/pwd', '/email'],
      isLoading: false
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
    BackToTop,
    Loading
  },
  mounted () {
    this.$store.commit('updateLoginState')
  },
  watch: {
    '$store.state.isLoading': {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
        this.isLoading = newValue
      }
    }
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
  background-color: #ececec;
}
</style>
