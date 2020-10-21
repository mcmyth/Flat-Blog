<template>
  <div id="page-container">
    <div id="page-btn">
      <span id="page-previous" v-if="current > 1" class="">
        <router-link :to="getURL(current - 1)"><font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-left']" /></router-link>
      </span>
      <span v-for="index of maxbtn" :key='getPrevious(index)' class="page-number previous before">
        <router-link :to="getURL(getPrevious(index))" v-if="getPrevious(index) > 0">{{ getPrevious(index)}} </router-link>
      </span>
      <span class="page-number middle">
        <a>{{getMiddle()}}</a>
      </span>
      <span v-for="index of maxbtn" :key='getNext(index)' class="page-number next after">
        <router-link :to="getURL(getNext(index))" v-if="getNext(index) <= maxpage">{{ getNext(index)}}</router-link>
      </span>
      <span id="page-next" v-if="current < maxpage">
        <router-link :to="getURL(current + 1)"><font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></router-link>
      </span>
    </div>
    <div id="page-count">共{{ maxpage }}页</div>
  </div>
</template>
<script>
export default {
  name: 'PageButton',
  data() {
    return {
      current: 95,
      maxbtn: 2
    }
  },
  props: {
    maxpage: Number
  },
  methods: {
    getPrevious(index) {
      return this.current - this.maxbtn + index - 1
    },
    getMiddle() {
      return this.current
    },
    getNext(index) {
      return this.current + index
    },
    getURL(page) {
      const obj = this.$route.query
      let query = ''
      Object.keys(obj).forEach(function(key) {
        if (key !== 'p' && key !== '') {
          query += `${key}=${obj[key]}&`
        }
      })
      query = query.substr(0, query.length - 1)
      if (query !== '') query = '&' + query
      return this.$route.path + '?p=' + page + query
    },
    setupButton() {
      let p = this.$route.query.p
      if (p === undefined) p = 1
      this.current = Number(p)
      // console.log(this.$route.query)
    }
  },
  beforeMount() {
    this.setupButton()
  },
  watch: {
    $route(to, from) {
      this.setupButton()
    }
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/components/PageButton"
</style>
