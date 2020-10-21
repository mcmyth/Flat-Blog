<template>
  <div id="app" v-cloak>
    <loading :style="isLoading === true ? 'opacity: 1' : 'opacity: 0;pointer-events:none;'"></loading>
    <navbar v-if="hideNavbar"></navbar>
    <back-to-top></back-to-top>
    <router-view v-if="!invalidRoute"/>
    <error404 v-else></error404>
    <Footer v-if="hideNavbar"></Footer>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Error404 from '@/components/Error404'
import BackToTop from '@/components/BackToTop'
import Loading from '@/components/Loading'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  data() {
    return {
      noNavbar: ['/login', '/verification', '/pwd', '/email', '/setup'],
      isLoading: false
    }
  },
  computed: {
    invalidRoute () {
      return !this.$route.matched || this.$route.matched.length === 0
    },
    hideNavbar () {
      return (this.noNavbar.indexOf(this.$route.path) === -1 && this.invalidRoute === false)
    }
  },
  components: {
    Navbar,
    Error404,
    BackToTop,
    Loading,
    Footer
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
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
}
#noty_layout__topRight {
  margin-top: 60px !important;
}
</style>
