<template>
  <div id="home-container">
    <div id="content">
      <div id="posts">
        <div id="void-content" v-show="postIsNull">
          <span id="void-title">空空如也~~</span>
        </div>
        <div v-for="(value, index) in post" :key="index" class="post-container" >
          <div class="post-image">
            <img onload="this.style.opacity = 1" @error="postImgError('banner',index)" :id="'banner_' + index" alt="banner" :src="value.banner_img"/>
          </div>
          <div class="post">
            <div class="post-content">
              <div class="post-avatar">
                <router-link :to="'/profile/' + value.username">
                  <img onload="this.style.opacity = 1" :title="value.username" @error="postImgError('avatar',index)" :id="'avatar_' + index" alt="avatar" :src="value.avatar_img"/>
                </router-link>
              </div>
              <div class="post-title"><router-link :to="'/post/' + value.id">{{ value.title }}</router-link></div>
              <hr>
              <div class="post-context">
                <div class="post-text">{{ value.content_html }}</div>
              </div>
              <div class="post-footer">
                <div class="post-detail">
            <span class="post-time">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'clock']" />
              {{ value.update_date }}
            </span>
                  <span class="post-author">
                    <router-link tag="a" :to="'/profile/' + value.username">
                      <font-awesome-icon class="menu-icon login" :icon="['fas', 'user-circle']" />
                      {{ value.nickname }}
                    </router-link>
            </span>
                </div>
                <div class="footer-more">
                  <router-link tag="a"  :to="'/post/' + value.id" class="post-more">阅读全文 <font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <page-button v-show="!postIsNull && $store.state.loaded" :maxpage="page_count"></page-button>
      </div>
    </div>
    <div id="user" v-show="$store.state.loaded">
        <div class="user-panel" id="user-main">
          <div id="user-image">
            <img id="user-banner" onload="this.style.opacity = 1" @error="imgError('banner')"  :src="profile.banner_img"/>
          </div>
          <div id="user-avatar"><router-link :to="'/profile/' + profile.username"><img onload="this.style.opacity = 1" @error="imgError('avatar')" :src="profile.avatar_img"/></router-link></div>
          <div id="user-nickname">{{profile.nickname}}</div>
          <div id="user-username">{{$store.state.isLogin ? '@' + profile.username : '未登录'}}</div>
          <router-link :to="$store.state.isLogin ? '/profile/' + profile.username : '/login'"><button id="user-profile-btn">{{ $store.state.isLogin ? '个人中心' : '登录'}}</button></router-link>
          <div id="user-post">
            <span class="user-post-tips-top"><span v-if="!userPostIsNull">来写篇文章吧 <font-awesome-icon class="icon-arrow" :icon="['fas', 'angle-right']" /></span></span>
            <input type="checkbox" id="show-post" checked/>
            <label for="show-post">
              <span class="user-post-option"><span v-if="userPostIsNull">最近文章 <font-awesome-icon class="icon-arrow" :icon="['fas', 'angle-up']" /></span></span>
              <span class="user-post-option"><router-link tag="a" to="/postedit/new" class="post-list-new">发表文章 <font-awesome-icon class="icon-plus" :icon="['fas', 'plus']" /></router-link></span>
            </label>
            <div id="post-list">
              <span id="post-list-title" v-if="userPostIsNull">最近文章</span>
              <span class="user-post-tips"><span v-if="!userPostIsNull">来写篇文章吧 <font-awesome-icon class="icon-arrow" :icon="['fas', 'angle-right']" /></span></span>
              <router-link tag="a" to="/postedit/new" class="post-list-new">发表文章 <font-awesome-icon class="icon-plus" :icon="['fas', 'plus']" /></router-link>
              <ul>
                <li v-for="(item, index) in userPost" :key="index">
                  <router-link :to="'/post/' + item.id" tag="a"><font-awesome-icon class="icon-arrow" :icon="['fas', 'angle-right']" /> {{ item.title }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import PageButton from '@/components/PageButton'
import { BlogConfig } from '@/config/blog.config'
export default {
  name: 'Home',
  data() {
    return {
      postIsNull: null,
      page_count: null,
      profile: {},
      post: null,
      userPost: [],
      BlogConfig: null
    }
  },
  components: {
    PageButton
  },
  computed: {
    userPostIsNull() {
      return (this.userPost.length > 0)
    }
  },
  methods: {
    imgError(type) {
      if (type === 'avatar') this.profile.avatar_img = '/assets/default-avatar.svg'
      if (type === 'banner') this.profile.banner_img = '/assets/default-banner.jpg'
    },
    postImgError(type, index) {
      if (type === 'avatar') document.querySelector(`#${type}_${index}`).src = BlogConfig.defaultAvatar
      if (type === 'banner') document.querySelector(`#${type}_${index}`).src = BlogConfig.defaultBanner
    },
    async setupPost() {
      const query = this.$route.query
      const s = query.s === undefined ? '' : `&s=${query.s}`
      let res
      const page = query.p === undefined ? 'page=1' : 'page=' + query.p
      if (this.isMe) {
        res = await this.$get(`post/?${page}${s}`)
      } else {
        res = await this.$get(`post/?${page}${s}`)
      }
      if (res.post.length <= 0) {
        this.page_count = 1
        this.postIsNull = true
      } else {
        this.post = res.post
        this.page_count = res.page_count
      }
      res = await this.$get(`post/user?page=1&id=${this.profile.id}`)
      this.userPost = res.post.slice(0, 5)
    }
  },
  mounted() {
    this.profile = this.$store.state.profile
  },
  created() {
    this.BlogConfig = BlogConfig
    this.setupPost()
  },
  watch: {
    '$store.state.profile': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== null) {
          this.profile = newValue
        }
      }
    },
    $route(to, from) {
      this.setupPost()
    }
  }
}
</script>
<style scoped lang="sass">
  @import "src/assets/style/views/Home"
</style>
