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
          <input v-model="searchValue" name="search_input" class="search_input" type="text" placeholder="Search..."  @keydown.enter="isSearchOpen()"/>
          <div @click="search" id="search-btn"><font-awesome-icon :icon="['fas', 'search']" /></div>
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
      <a><li @click="isSearchOpen()"><font-awesome-icon class="menu-icon" :icon=" ['fas', 'home']" />搜索</li></a>
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
      search_open: '',
      searchValue: ''
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
    },
    search() {
      // const obj = this.$route.query
      // let query = ''
      // Object.keys(obj).forEach(function(key) {
      //   if (key !== 's' && key !== '') {
      //     query += `${key}=${obj[key]}&`
      //   }
      // })
      // query = '?s=' + this.searchValue + '&' + query.substr(0, query.length - 1)
      // location.href = location.protocol + '//' + location.host + location.pathname + query
      if (/\/profile/.test(this.$route.path) !== true || /\/profile/.test(this.$route.path) !== true) {
        this.$router.push('/')
      }
      location.href = location.protocol + '//' + location.host + location.pathname + '?s=' + this.searchValue
      this.searchValue = ''
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
