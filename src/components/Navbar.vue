<template>
<div id="navbar">
    <nav id="main-menubar" class="main-menubar-color">
    <div id="menu-header">
      <img src="@/assets/logo_70.jpg" class="logo" alt="MC Myth">
      <span id="name">{{ $store.state.blog_name }}</span>
    </div>
    <div class="menu-btn" v-bind:class="menu_open" @click="isMenuOpen">
      <div class="menu-btn__burger"></div>
    </div>
    <ul :class="menu_open" id="menu-items">
      <div id="mobile_logo_container">
        <img src="@/assets/logo_70.jpg" :class="'logo ' + menu_open" alt="MC Myth">
        <span id="username">MC Myth</span>
      </div>
      <div id="search" :class="search_open" @mousedown="isSearchOpen()" >
        <div id="search-box" @mousedown="isSearchOpen()">
          <div  id="search-title">想要搜点什么呢?</div>
          <input name="search_input" class="search_input" type="text" placeholder="Search..."  @keydown.enter="isSearchOpen()"/>
          <div id="search-btn"><font-awesome-icon :icon="['fas', 'search']" /></div>
<!--          <span class="line" @mousedown.stop = ""></span>-->
        </div>

      </div>
      <router-link to="/" tag="a"><li><font-awesome-icon class="menu-icon" :icon="['fas', 'home']" />主页</li></router-link>
      <router-link to="/login" tag="a"><li><font-awesome-icon class="menu-icon" :icon=" ['fas', 'home']" />登录</li></router-link>
      <router-link to="" tag="a"><li @click="isSearchOpen()"><font-awesome-icon class="menu-icon" :icon=" ['fas', 'home']" />搜索</li></router-link>
    </ul>
      <div id="black-bg" :class="menu_open" @click="isMenuOpen"></div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data: function() {
    return {
      menu_open: 'close',
      viewport_width: 0,
      search_open: ''
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    document.body.style.padding = '74px 0 0 0'
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    isMenuOpen() {
      this.menu_open === 'open' ? this.menu_open = 'close' : this.menu_open = 'open'
    },
    isSearchOpen() {
      this.search_open === '' ? this.search_open = 'search-active' : this.search_open = ''
    },
    handleResize (event) {
      this.viewport_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    }
  }
}
</script>

<style lang="sass">
$main-menubar-bgcolor: #2196f3
$main-menubar-fgcolor: #fff
$small-width: 410px
@import "/src/assets/style/public"
nav#main-menubar
  color: $main-menubar-fgcolor
  background-color: transparentize(darken($main-menubar-bgcolor,3%), .2)
  backdrop-filter: blur(10px)
  display: flex
  flex-direction: row
  align-items: center
  height: 70px
  width: 100%
  position: fixed
  top: 0
  font-size: 1.5rem
  box-shadow: rgba($main-menubar-bgcolor, 0.3) 0px 4px 0px
  z-index: 10
  #search
    position: fixed
    display: flex
    width: 100vw
    left: 0
    height: 100vh
    top: 0
    justify-content: center
    align-items: center
    background-color: rgba(0,0,0,.3)
    backdrop-filter: blur(0px)
    pointer-events: none
    opacity: 0
    transform: translateY(-20px)
    transition: opacity .2s ease-in-out , backdrop-filter .2s ease-in-out, transform .2s ease-in-out
    flex-direction: column
    color: #333
    #search-box
      width: 80vw
      max-width: 500px
      background-color: white
      padding: 20px
      box-sizing: border-box
      text-align: center
      border-radius: 8px
      #search-btn
        display: inline-block
        height: 40px
        width: 40px
        margin-top: 20px
        background-color: #e0e0e0
        border-bottom-right-radius: 3px
        border-top-right-radius: 3px
        cursor: pointer
        svg
          vertical-align: -5px
          horiz-align: -15px
          color: #666
          font-size: 18px
        &:hover svg
          color: darken(#666, 10%)
    #search-title
      width: 100%
      text-align: center
    .search_input
      @include input
      width: calc(80% - 40px)
      margin-top: 20px
      border-bottom-right-radius: 0
      border-top-right-radius: 0
      &:focus + span
        width: 80% !important
        border-bottom-color: $main-menubar-bgcolor !important
        border-bottom-width: 3px !important
        opacity: 1
      &:focus
        //animation: zoom .3s 1
        //border-bottom-color: $main-menubar-bgcolor
    .line
      content: ''
      @extend .search_input
      position: absolute
      transform: translateY(26px)
      width: 0
      opacity: 0
      transition: width .3s ease-in-out
      pointer-events: none
  #search.search-active
    //backdrop-filter: blur(10px)
    opacity: 1
    pointer-events: unset
    transform: translateY(0)
  #black-bg
    background-color: rgba(0, 0, 0, 0.3)
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    z-index: 5
    opacity: 0
    pointer-events: none
    transition: opacity .2s ease-in-out
  #menu-items
    flex: 1
    padding: 0
    margin: 0
    list-style-type: none
    display: flex
    justify-content: flex-end
    left: -70vw
    overflow-y: auto
    overflow-x: hidden
    a
      color: unset
      text-decoration: unset
      margin-right: 2vw
    @media screen and (max-width: $small-width)
      .logo
        display: block
        width: 50px
        margin: 13px 25px 10px 25px
        border-radius: 50%
        box-shadow: rgba(0,0,0,0.1) 5px 5px 15px
    li
      cursor: pointer
      font-size: 1.2rem
      &:hover::before
        opacity: 1
        transform: translateY(0px)
        transition: all .2s ease-in-out
      &::before
        content: ""
        position: absolute
        height: 2px
        width: 2.4rem
        top: 55px
        transform: translateY(10px)
        opacity: 0
        transition: all .2s ease-in-out
        background-color: #fff
      @media screen and (max-width: $small-width)
        margin: 10px 0
        padding: 15px 0 15px 25px
        transition: background-color 0.3s ease-in-out
        font-size: 15px
        &:hover
          background-color: rgba(0,0,0,0.1)
        &:hover::before
          display: none
        .menu-icon
          display: inline
          margin-right: 10px
    .menu-icon
      display: none
    #mobile_logo_container
      display: none
    @media screen and (max-width: $small-width)
        position: fixed
        top: 0
        height: 100vh
        background-color: rgba(255,255,255,1)
        color: #333
        width: 250px
        animation: none
        transition: left 0.3s ease-in-out
        z-index: 11
        flex-flow: column
        display: flex
        justify-content: flex-start !important
        .menu-icon
          display: inline
        #mobile_logo_container
          display: flex
          align-items: center
          margin-bottom: 10px
  #menu-header
    flex: 1
    #name
      margin-left: 10px
      font-size: 1.2rem
      @media screen and (max-width: 400px)
        font-size: .9rem
    .logo
      width: 3rem
      height: 3rem
      border-radius: 50%
      vertical-align: middle
      margin-left: 1rem
      transition: all 0.3s linear
      animation: logo-rotae 1.5s infinite
      @media screen and (max-width: 400px)
        width: 2rem
        height: 2rem
      &:hover
        animation: logo-rotae .2s infinite
        cursor: pointer
        width: 3.2rem
        height: 3.2rem
        font-size: 1.2rem
  #menu-items #mobile_logo_container::before
    content: ''
    display: block
    height: 1px
    width: 230px
    background-color: #dfdfdf
    position: absolute
    left: 10px
    top: 80px
  @media screen and (max-width: $small-width)
    #menu-items.open
      left: 0
    #menu-items.close
      left: -250px
    #black-bg.open
      opacity: 1
      pointer-events: unset

/*Hamburger menu*/
.menu-btn
  --box-shadow-color: rgba(255, 101, 47, 0.2)
  width: 70px
  height: 70px
  position: relative
  justify-content: center
  align-items: center
  cursor: pointer
  transition: all 0.2s ease-in-out
  display: none
  .menu-btn__burger,
  .menu-btn__burger::before,
  .menu-btn__burger::after
    width: 2.5rem
    height: .2rem
    border-radius: 5px
    background-color: #fff
    box-shadow: 0 2px 5px var(--box-shadow-color)
    transition: all 0.2s ease-in-out
  .menu-btn__burger::before,
  .menu-btn__burger::after
    content: ""
    position: absolute
  .menu-btn__burger::before
    transform: translateY(-12px)
  .menu-btn__burger::after
    transform: translateY(12px)
/* ANIMATION */
.menu-btn.open .menu-btn__burger
  transform: translateX(-50px)
  background-color: transparent
  box-shadow: none
.menu-btn.open .menu-btn__burger::before
  transform: rotate(45deg) translate(35px, -35px)
.menu-btn.open .menu-btn__burger::after
  transform: rotate(-45deg) translate(35px, 35px)
@media screen and (max-width: $small-width)
  .menu-btn
    display: flex

@keyframes zoom
  0%
    transform: scale(1)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)

@keyframes logo-rotae
  from
    transform: rotateZ(0deg)
  to
    transform: rotateZ(360deg)
</style>
