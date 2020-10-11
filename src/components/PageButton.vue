<template>
  <div id="page-container">
    <div id="page-btn">
      <span id="page-previous" v-if="current > 1" class="">
        <a :href="getURL(current - 1)"><font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-left']" /></a>
      </span>
      <span v-for="index of maxbtn" :key='getPrevious(index)' class="page-number previous before">
        <a :href="getURL(getPrevious(index))" v-if="getPrevious(index) > 0">{{ getPrevious(index)}} </a>
      </span>
      <span class="page-number middle">
        <a>{{getMiddle()}}</a>
      </span>
      <span v-for="index of maxbtn" :key='getNext(index)' class="page-number next after">
        <a :href="getURL(getNext(index))" v-if="getNext(index) <= maxpage">{{ getNext(index)}}</a>
      </span>
      <span id="page-next" v-if="current < maxpage">
        <a :href="getURL(current + 1)"><font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></a>
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
