<template>
  <div id="app" v-cloak>
    <loading :style="isLoading === true ? 'opacity: 1' : 'opacity: 0;pointer-events:none;'"></loading>
    <router-view/>
  </div>
</template>
<script>
import Loading from '@/components/Loading'
export default {
  name: 'App',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
  },
  components: {
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
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
}
#noty_layout__topRight {
  margin-top: 60px !important;
}
</style>
