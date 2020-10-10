<template>
  <div id="home-container">
    <div id="content">
      <div id="posts">
        <div v-for="(value, index) in post" :key="index" class="post-container">
          <div class="post-image"><img @error="postImgError('banner',index)" :id="'banner_' + index" alt="banner" :src="value.banner_img"/></div>
          <div class="post">
            <div class="post-content">
              <div class="post-avatar"><img @error="postImgError('avatar',index)" :id="'avatar_' + index" alt="avatar" :src="value.avatar_img" height="512" width="512"/></div>
              <div class="post-title"><a :href="'/post/' + value.id">{{ value.title }}</a></div>
              <hr>
              <div class="post-context">
                <div class="post-text">{{ value.content_html }}</div>
              </div>
              <div class="post-footer">
                <div class="post-detail">
            <span class="post-time">
              <font-awesome-icon class="menu-icon login"  :icon="['fas', 'clock']" />
              {{ value.update_date }}
            </span>
                  <span class="post-author">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'user-circle']" />
              {{ value.nickname }}
            </span>
                </div>
                <div class="footer-more">
                  <a href="javascript:void(0);" class="post-more">阅读全文 <font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageButton :maxpage="page_count"></PageButton>
      </div>
    </div>
    <div id="user">
        <div class="user-panel" id="user-main">
          <div id="user-image">
            <img id="user-banner" @error="imgError('banner')"  :src="profile.banner_img"/>
          </div>
          <div id="user-avatar"><img @error="imgError('avatar')" :src="profile.avatar_img"/></div>
          <div id="user-nickname">{{profile.nickname}}</div>
          <div id="user-username">{{profile.username}}</div>
          <a :href="$store.state.isLogin ? '/profile/' + profile.username : '/login'"><button id="user-profile-btn">{{ $store.state.isLogin ? '个人中心' : '登录'}}</button></a>
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
      page_count: null,
      profile: {},
      post: null,
      BlogConfig: null
    }
  },
  components: {
    PageButton
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
      } else {
        this.post = res.post
        this.page_count = res.page_count
      }
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
