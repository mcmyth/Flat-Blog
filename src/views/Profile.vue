<template>
  <div @mousemove="move($event)" id="profile-container">
    <div id="header">
      <div id="header-edit" :class="isProfileEditorActive">
        <div id="header-edit-btn" @click="openProfileEditor">
          <font-awesome-icon v-if="isProfileEditorActive === 'disable'"  class="menu-icon login" :icon="['fas', 'pen']" />
          <font-awesome-icon v-else  class="menu-icon close" :icon="['fas', 'times']" />
        </div>
        <div id="edit-container">
          <div id="edit-container-title">更改资料</div>
          <div class="edit-container-item header-banner">
            <div class="icon-container"><font-awesome-icon class="icon-upload" :icon="['fas', 'arrow-circle-up']" /></div>
            更改头图
          </div>
          <div class="edit-container-item header-avatar">
            <div>
              <img/>
              <div ><font-awesome-icon class="menu-icon icon-upload" :icon="['fas', 'camera']" /></div>
            </div>
          </div>
          <div class="edit-container-item username">
            <input type="text" value="MC Myth"><br/>
            <span class="edit-container-tips">*仅支持10位英文/数字/下划线组成的字符</span>
          </div>
          <div class="edit-container-item password">
            <span>修改密码</span>
            <button>发送验证邮件</button>
          </div>
          <div class="edit-container-item password">
            <span>更改邮箱</span>
            <button>发送验证邮件</button>
          </div>
        </div>
      </div>
      <img id="banner" :style="'transform:' + imgTransform" src="../assets/banner.jpg" height="1080" width="1920" alt="header"/>
      <div id="avatar">
        <img src="../assets/logo_512.png" height="512" width="512"/>
        <div id="avatar-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></div>
      </div>
    </div>
    <div id="user">
      <div id="nickname">{{ profile.nickname }}</div>
      <div id="username" v-if="profile.username !== undefined">{{ profile.username }}</div>
    </div>
    <hr>
    <div id="content">
      <div id="title">Posts</div>
      <div id="posts">
        <div v-for="index of 5" :key="index" class="post">
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
    <black-mask :class="isProfileEditorActive" @click.native="openProfileEditor"></black-mask>
  </div>
</template>

<script>
import PageButton from '@/components/PageButton'
import BlackMask from '@/components/BlackMask'
export default {
  name: 'profile',
  data() {
    return {
      imgTransform: '555',
      profile: {},
      isProfileEditorActive: 'disable'
    }
  },
  methods: {
    move(event) {
      // if (document.documentElement.scrollTop > 300) return
      // const horizontal = event.clientX / parseInt(getComputedStyle(document.querySelector('#profile-container')).width, 10)
      // const vertical = event.clientY / parseInt(getComputedStyle(document.querySelector('#profile-container')).width, 10)
      // this.imgTransform = this.calculateTransform(horizontal, vertical, 15)
    },
    calculateTransform(horizontal, vertical, offset) {
      return `translate(calc(${horizontal * offset / 0.5}px - 50%), calc(${vertical * offset / 0.5}px - 50%))`
    },
    setupProfile() {
      if (this.profile.avatar === '') this.profile.avatar = 'assets/default-avatar.svg'
    },
    openProfileEditor() {
      this.isProfileEditorActive = this.isProfileEditorActive === 'disable' ? 'active' : 'disable'
    }
  },
  components: {
    PageButton,
    BlackMask
  },
  mounted() {
    const token = this.$cookie.get('token')
    if (token !== null) {
      this.profile.username = '登陆中...'
      this.$get('/user/profile').then(res => {
        this.profile = res
        this.setupProfile()
      })
    } else {
      this.profile.nickname = '未登录'
      this.profile.avatar = 'assets/default-avatar.svg'
    }
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Profile"
</style>
