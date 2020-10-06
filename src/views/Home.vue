<template>
  <div id="home-container">
    <div id="content">
      <div id="posts">
        <div v-for="(item, index) in posts" :key="index" class="post-container">
          <div class="post-image"><img alt="banner" src="../../public/assets/default-banner.jpg"/></div>
          <div class="post">
            <div class="post-content">
              <div class="post-avatar"><img alt="avatar" src="../../public/assets/default-avatar.svg" height="512" width="512"/></div>
              <div class="post-title"><a href="/post/1">Title{{item}}</a></div>
              <hr>
              <div class="post-context">
                <div class="post-text">balabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbala</div>
              </div>
              <div class="post-footer">
                <div class="post-detail">
            <span class="post-time">
              <font-awesome-icon class="menu-icon login"  :icon="['fas', 'clock']" />
              2020/09/24 00:00
            </span>
                  <span class="post-author">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'user-circle']" />
              MC Myth
            </span>
                </div>
                <div class="footer-more">
                  <a href="javascript:void(0);" class="post-more">阅读全文 <font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageButton :maxpage="1"></PageButton>
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
export default {
  name: 'Home',
  data() {
    return {
      posts: ['', '', '', '', '', ''],
      profile: {
      }
    }
  },
  components: {
    PageButton
  },
  methods: {
    imgError(type) {
      if (type === 'avatar') this.profile.avatar_img = '/assets/default-avatar.svg'
      if (type === 'banner') this.profile.banner_img = '/assets/default-banner.jpg'
    }
  },
  mounted() {
    this.profile = this.$store.state.profile
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
<style scoped lang="sass">
  @import "src/assets/style/views/Home"
</style>
