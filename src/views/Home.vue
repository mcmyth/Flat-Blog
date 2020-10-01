<template>
  <div id="home-container">
    <div id="content">
      <div id="posts">
        <div v-for="(item, index) in posts" :key="index" class="post-container">
          <div class="post-image"><img src="../assets/banner.jpg"/></div>
          <div class="post">
            <div class="post-content">
              <div class="post-avatar"><img src="../../public/assets/default-avatar.svg" height="512" width="512"/></div>
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
            <img id="user-banner" src="../assets/banner.jpg"/>
          </div>
          <div id="user-avatar"><img :src="profile.avatar"/></div>
          <div id="user-nickname">{{profile.nickname}}</div>
          <div id="user-username">{{profile.username}}</div>
          <a href="/profile/mcmyth"><button id="user-profile-btn">{{ $store.state.isLogin ? '个人中心' : '登录'}}</button></a>

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
        username: '',
        nickname: '',
        avatar: 'assets/default-avatar.svg'
      }
    }
  },
  components: {
    PageButton
  },
  methods: {
    setupProfile(username, avatar) {
      this.profile.username = username
      this.profile.nickname = '@' + username
      if (avatar !== '') this.profile.avatar = avatar
    }
  },
  mounted() {
    const token = this.$cookie.get('token')
    if (token !== null) {
      this.profile.username = '登陆中...'
      this.$get('/user/profile').then(res => {
        this.setupProfile(res.username, res.avatar)
      })
    } else {
      this.profile.username = '未登录'
    }
  }
}
</script>
<style scoped lang="sass">
  @import "src/assets/style/views/Home"
</style>
