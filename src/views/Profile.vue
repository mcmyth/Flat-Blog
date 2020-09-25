<template>
  <div @mousemove="move($event)" id="profile-container">
    <div id="header">
      <div id="header-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></div>
      <img id="banner" :style="'transform:' + a" src="../assets/banner.jpg" height="1080" width="1920" alt="header"/>
      <div id="avatar">
        <img src="../assets/logo_512.png" height="512" width="512"/>
        <div id="avatar-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></div>
      </div>
    </div>
    <div id="user">
      <div id="nickname">MC Myth</div>
      <div id="username">mc_myth</div>
    </div>
    <hr>
    <div id="content">
      <div id="title">Posts</div>
      <div id="posts">
        <div v-for="(item , index)  in  post" :key="index" class="post">
          <div class="post-option">
            <span class="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></span>
            <span class="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
          </div>
          <div class="post-title"><a href="/post">文章标题{{item}}</a></div>
          <div class="post-detail">
            <span class="post-time">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'clock']" />
              2020/09/24
            </span>
            <span class="post-author">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'user-circle']" />
              MC Myth
            </span>
          </div>
          <hr>
          <div class="post-context">
            balabalabalabalabalabalabalabalabalabalabala...balabalabalabalabalabalabala....balabalabalabalabalabalabalabala...
            balabalabalabalabalabalabalabalabalabalabala...balabalabalabalabalabalabala....balabalabalabalabalabalabalabala...
          </div>
          <div class="post-footer">
            <a href="javascript:void(0);" class="post-more">阅读全文 <font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></a>
          </div>
        </div>
      </div>
      <div id="content-footer">
<!--        old button-->
<!--        <div id="page-btn">-->
<!--          <span id="page-previous"><font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-left']" /></span>-->
<!--          <input type="number" id="page-number" value="1">-->
<!--          <span id="page-next"><font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></span>-->
<!--        </div>-->
<!--        <div id="page-count">共2页</div>-->
        <PageButton :maxpage="10"></PageButton>
      </div>
    </div>

  </div>
</template>

<script>
import PageButton from '@/components/PageButton'
export default {
  name: 'profile',
  data() {
    return {
      a: '555',
      post: ['', '', '', '', '', '']
    }
  },
  methods: {
    move(event) {
      const horizontal = event.clientX / parseInt(getComputedStyle(document.querySelector('#profile-container')).width, 10)
      const vertical = event.clientY / parseInt(getComputedStyle(document.querySelector('#profile-container')).width, 10)
      this.a = this.calculateTransform(horizontal, vertical, 15)
    },
    calculateTransform(horizontal, vertical, offset) {
      return `translate(calc(${horizontal * offset / 0.5}px - 50%), calc(${vertical * offset / 0.5}px - 50%))`
    }
  },
  components: {
    PageButton
  }
}
</script>

<style scoped lang="sass">
$font-color: #444
$foreground-color: #2196f3
$background-color: #414141
#profile-container
  font-size: 15px
  color: $font-color
  margin-bottom: 30px
  // 74 = menubarHeight(70px) + menubarShadowWeight(4px)
  min-height: calc(100vh - 74px)
#header
  width: 100%
  height: 300px
  overflow: hidden
  #header-edit
    position: absolute
    width: 40px
    height: 40px
    background-color: white
    z-index: 1
    text-align: center
    line-height: 40px
    border-radius: 8px
    margin-top: 10px
    right: 20px
    border: solid #d4d4d4
    cursor: pointer
    font-size: 15px
    transition: font-size .2s ease-in-out
    &:hover
      animation: jump .5s ease-in-out
      font-size: 17px
    &:active
      font-size: 15px
  #banner
    position: relative
    transform: translate(-50%,-50%)
    top: 50%
    left: 50%
  #avatar
    position: absolute
    border-radius: 50%
    top: 300px
    transform: translate(-50%, calc(-50% + 75px))
    left: 50%
    width: 180px
    height: 180px
    border-radius: 50%
    overflow: hidden
    border: solid #fff 5px
    transition: transform 0.3s ease-in-out , border 0.3s ease-in-out
    cursor: pointer
    &:hover
      transform: translate(-50%, calc(-50% + 75px)) scale(1.1)
      border: solid #fff 3px
    & #avatar-edit
      position: absolute
      width: 100%
      top: 200px
      text-align: center
      transition: top .3s ease-in-out
      color: white
      background-color: rgba(0,0,0,.3s)
      padding: 10px 0
      font-size: 1rem
    &:hover #avatar-edit
      top: 140px
    img
      width: 100%
      height: 100%
#user
  margin-top: 100px
  text-align: center
  width: 100%
  & + hr
    margin: 15px auto
    width: 80vw
    max-width: 1000px
  #nickname
    font-size: 2rem
  #username
    margin-top: 10px
    font-size: 1.2rem
    color: lighten($font-color,15%)
    &::before
      content: '@'

#content
  width: 80vw
  max-width: 1000px
  margin: 0 auto
  #content-footer
    #page-btn
      display: flex
      justify-content: center
      #page-previous,#page-number,#page-next
        display: inline-block
        border: none
        margin: 0 10px
        padding: 0
        outline: none
        background-color: #e9e9e9
        height: 30px
        text-align: center
        font-size: 1.2rem
      #page-number
        border-radius: 5px
        margin: 0
        width: 50px
        padding: 10px 8px
        appearance: none
        box-sizing: border-box
        &::-webkit-inner-spin-button
          appearance: none
      #page-previous,#page-next
        width: 30px
        border-radius: 50%
        line-height: 30px
        transition: background-color .2s ease-in-out
        cursor: pointer
        &:hover
          background-color: rgba(0,0,0,.2)
    #page-count
      margin: 10px 0
      text-align: center
  #title
    font-size: 2rem
    color: $foreground-color
  #posts
    position: relative
    margin: 15px 0
    .post
      word-break: break-all
      color: #808080
      background-color: #F9F9F9
      border-radius: 5px
      padding: 20px
      margin: 25px 0
      box-shadow: rgba(0,0,0,.06) 5px 5px 0px
      transition: box-shadow 0.3s ease-in-out
      &:hover
        box-shadow: rgba(0,0,0,.09) 7px 7px 0px
      .post-option
        right: 15px
        position: absolute
        span
          margin: 0 5px
          background-color: rgba(0,0,0,.1)
          border-radius: 50%
          width: 30px
          height: 30px
          text-align: center
          line-height: 30px
          color: rgb(100, 100, 100)
          font-size: 12px
          display: inline-block
          cursor: pointer
          transition: background-color .2s ease-in-out
          &:hover
            background-color: rgba(0,0,0,.2)
      .post-title
        font-size: 1.5rem
        margin-bottom: 10px
        a
          color: #404040
          text-decoration: none
      .post-detail
        span:not(:last-child)
          margin-right: 15px
        & + hr
          margin: 15px 0
      .post-footer
        margin-top: 15px
        a.post-more
          color: $foreground-color
          text-decoration: none
          transition: text-shadow .3s ease-in-out
          display: inline-block
          &:hover
            text-shadow: 5px 5px 9px
@keyframes jump
  0%
    transform: scale(1)
  25%
    transform: scale(.8)
  50%
    transform: scale(1.2)
  100%
    transform: scale(1)
</style>
