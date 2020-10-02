<template>
<div id="navbar">
    <nav id="main-menubar" class="main-menubar-color">
    <div id="menu-header">
      <img src="@/assets/logo_70.jpg" class="logo" alt="MC Myth">
      <span id="name">{{ $store.state.blogName }}</span>
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
      <a href="javascript:void(0)" @click="Login">
        <li>
          <font-awesome-icon class="menu-icon" :icon=" ['fas', 'home']" />
          {{ $store.state.isLogin ? '登出' : '登录'}}
       </li>
      </a>
      <router-link to="" tag="a"><li @click="isSearchOpen()"><font-awesome-icon class="menu-icon" :icon=" ['fas', 'home']" />搜索</li></router-link>
    </ul>
      <black-mask  @click.native="isMenuOpen" class="menubar-mask" :active="menu_open"></black-mask>
  </nav>
</div>
</template>

<script>
import BlackMask from '@/components/BlackMask'
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
    },
    Login() {
      const token = localStorage.getItem('accessToken')
      if (token !== null) {
        localStorage.removeItem('accessToken')
        location.reload()
      } else {
        this.$router.push('/login')
      }
    }
  },
  components: {
    BlackMask
  }
}
</script>

<style lang="sass">
  @import "src/assets/style/components/Navbar"
</style>
