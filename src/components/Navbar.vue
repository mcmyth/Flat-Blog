<template>
<div id="navbar">
    <nav id="main-menubar" class="main-menubar-color">
    <div id="menu-header">
      <router-link class="profile" :to="$store.state.isLogin ? '/profile/' + profile.username : '/login'">
        <img onload="this.style.opacity = 1" @error="imgError('avatar')" :src="profile.avatar_img" class="logo" alt="avatar">
      <span id="name">{{  $store.state.isLogin ? profile.nickname : $store.state.blogName }}</span>
      </router-link>
    </div>
    <div class="menu-btn" v-bind:class="menu_open" @click="isMenuOpen">
      <div class="menu-btn__burger"></div>
    </div>
    <ul :class="menu_open" id="menu-items">
      <div id="mobile_logo_container">
        <router-link class="profile" :to="$store.state.isLogin ? '/profile/' + profile.username : '/login'">
        <img @click="closeMenu" onload="this.style.opacity = 1" @error="imgError('avatar')"  :src="profile.avatar_img" :class="'logo ' + menu_open" alt="avatar">
        </router-link>
        <router-link class="profile" :to="$store.state.isLogin ? '/profile/' + profile.username : '/login'">
        <span @click="closeMenu" id="username">{{  $store.state.isLogin ? $store.state.profile.nickname : $store.state.blogName }}</span>
        </router-link>
      </div>
      <div id="search" :class="search_open" @mousedown="isSearchOpen()" >
        <div id="search-box" @mousedown="isSearchOpen()">
          <div  id="search-title">文章搜索</div>
          <div id="search-content">
            <input v-model="searchValue" name="search_input" class="search_input" type="text" placeholder="Search..." @keydown.enter="search"/>
            <div @click="search" id="search-btn"><font-awesome-icon :icon="['fas', 'search']" /></div>
          </div>
        </div>
      </div>
      <router-link to="/" tag="a"><li @click="closeMenu"><font-awesome-icon class="menu-icon" :icon="['fas', 'home']" />主页</li></router-link>
      <a href="javascript:void(0)" @click="Login">
        <li>
          <font-awesome-icon class="menu-icon" :icon=" ['fas', 'user']" />
          {{ $store.state.isLogin ? '登出' : '登录'}}
       </li>
      </a>
      <a><li @click="isSearchOpen()"><font-awesome-icon class="menu-icon" :icon=" ['fas', 'search']" />搜索</li></a>
    </ul>
      <black-mask  @click.native="closeMenu" class="menubar-mask" :active="menu_open"></black-mask>
  </nav>
</div>
</template>

<script>
import BlackMask from '@/components/BlackMask'
import { BlogConfig } from '@/config/blog.config'
export default {
  name: 'Navbar',
  data: function() {
    return {
      menu_open: 'close',
      viewport_width: 0,
      search_open: '',
      searchValue: '',
      profile: {
        nickname: null
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    document.body.style.padding = '74px 0 0 0'
    this.profile = this.$store.state.profile
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    isMenuOpen() {
      this.menu_open === 'open' ? this.menu_open = 'close' : this.menu_open = 'open'
    },
    closeMenu () {
      this.menu_open = 'close'
    },
    isSearchOpen() {
      this.closeMenu()
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
    imgError(type) {
      if (type === 'avatar') this.profile.avatar_img = BlogConfig.defaultAvatar
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
      this.$store.commit('setLoadingStatus', true)
      if (/\/profile/.test(this.$route.path) !== true || /\/profile/.test(this.$route.path) !== true) {
        this.$router.push('/')
      }
      location.href = location.protocol + '//' + location.host + location.pathname + '?s=' + this.searchValue
      this.searchValue = ''
    }
  },
  components: {
    BlackMask
  },
  watch: {
    '$store.state.profile': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== null) {
          this.profile = newValue
        }
      }
    }
  }
}
</script>

<style lang="sass">
  @import "src/assets/style/components/Navbar"
</style>
