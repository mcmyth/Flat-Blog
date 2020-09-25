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
      return this.$route.path + '?p=' + page
    }
  },
  beforeMount() {
    let p = this.$route.query.p
    if (p === undefined) p = 1
    this.current = Number(p)
    console.log(this.$route.query)
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/style/public"
@mixin page-btn
  display: flex
  align-items: center
  font-size: 15px
  justify-content: center
  background-color: $foreground-color
  transition: background-color .3s ease-in-out
  border-radius: 4px
  &:hover
    background-color: lighten($foreground-color,10%)
  &:active
    background-color: darken($foreground-color,10%)
#page-container
  color: #565656
  #page-btn
    display: flex
    align-items: center
    justify-content: center
    .page-number,#page-previous,#page-next
      a
        @include page-btn
        padding: 5px
        box-sizing: border-box
        height: 30px
        margin: 0 5px
        color: white
        user-select: none
        cursor: pointer
        text-decoration: none
        min-width: 30px
    .page-number.middle
      a
        background-color: #c0c5cb
        cursor: default
    @media screen and (max-width: 480px)
      .page-number.before,.page-number.after
        display: none
  #page-count
    margin-top: 10px
    text-align: center
</style>
