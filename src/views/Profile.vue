<template>
  <base-layout>
    <div @mousemove="move($event)" id="profile-container">
      <div id="header">
        <div id="header-edit" ref="headerEditor" :class="isProfileEditorActive" v-if="isMe">
          <div id="header-edit-btn" @click="openProfileEditor" >
            <font-awesome-icon v-if="isProfileEditorActive === 'disable'"  class="menu-icon login" :icon="['fas', 'pen']" />
            <font-awesome-icon v-else  class="menu-icon close" :icon="['fas', 'times']" />
          </div>
          <div id="edit-container">
            <div id="edit-container-title">更改资料</div>
            <div :style="'background-image: url(\'' + bannerImg +'\')'" @click="beforeUpload('banner_img')" class="edit-container-item header-banner">
              <div class="black-mask">
                <input @change="upload($event,'banner_img')" v-show="false" ref="bannerIMG" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"/>
                <div class="icon-container"><font-awesome-icon class="icon-upload" :icon="['fas', 'arrow-circle-up']" /></div>
                更改头图
              </div>
            </div>
            <div :style="'background-image: url(\'' + avatarImg +'\')'" class="edit-container-item header-avatar" @click="beforeUpload('avatar_img')">
              <div class="black-mask">
                <input @change="upload($event,'avatar_img')" v-show="false" ref="avatarIMG" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"/>
                <div><font-awesome-icon class="menu-icon icon-upload" :icon="['fas', 'camera']" /></div>
              </div>
            </div>
            <div class="edit-container-item username">
              <input :value="profile.nickname" ref="nickname" type="text"><br/>
              <span class="edit-container-tips">*仅支持10位英文/数字/下划线组成的字符</span><br/>
              <button @click="updateNickname">保存更改</button>
            </div>
            <div class="edit-container-item password">
              <span>修改密码</span>
              <button  @click="changePassword">发送验证邮件</button>
            </div>
            <div class="edit-container-item password">
              <span>更改邮箱</span>
              <div id="change-email">
                <span v-if="profile.email_verified === 0">*您的邮箱还未验证,如果邮箱有误请修改</span>
                <input class="readonly"  v-if="profile.email_verified === 1" type="text" :value="profile.email" readonly>
                <input  v-else  type="text" v-model="email">
                <button @click="changeEmail">发送验证邮件</button>
              </div>
            </div>
          </div>
        </div>
        <img @error="imgError('banner')" id="banner" :style="'transform:' + imgTransform" :src="bannerImg === null ? $store.state.profile.banner_img : bannerImg" height="1080" width="1920" alt="header"/>
        <div @click="openProfileEditor" id="avatar">
          <img onload="this.style.opacity = 1" @error="imgError('avatar')" :src="avatarImg === null ? $store.state.profile.avatar_img : avatarImg"/>
          <div v-if="isMe" id="avatar-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></div>
        </div>
      </div>
      <div id="user">
        <div id="nickname">{{ profile.nickname }}</div>
        <div id="username" v-if="profile.username !== undefined">{{ profile.username }}</div>
      </div>
      <hr>
      <div id="content">
        <div id="post-title">
          <span>Posts</span>
          <router-link v-if="isMe" tag="span" to="/postedit/new" id="post-add"><font-awesome-icon class="menu-icon login" :icon="['fas', 'plus']" /></router-link>
        </div>
        <div id="void-content" v-show="postIsNull">{{ $route.query.search ? '没有搜索到匹配的文章' : '还没有任何文章哦~' }}</div>
        <div id="posts">
          <div v-for="(value, index) in post" :key="index" class="post">
            <div v-if="isMe" class="post-option">
              <span @click="$router.push('/postedit/' + value.id)" class="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></span>
              <span @click="setConfirmStatus('active', value.id)" class="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
            </div>
            <div class="post-title"><router-link :style="isMe ? '' : 'max-width: 100%;'" :to="/post/ + value.id">{{ value.title }}</router-link></div>
            <div class="post-detail">
            <span class="post-time">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'clock']" />
              {{ value.update_date }}
            </span>
              <span class="post-author">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'user-circle']" />
              {{ value.nickname }}
            </span>
            </div>
            <hr>
            <div class="post-context" v-html="value.content_html"></div>
            <div class="post-footer">
              <router-link :to="/post/ + value.id" class="post-more">阅读全文 <font-awesome-icon class="menu-icon login" :icon="['fas', 'angle-right']" /></router-link>
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
          <page-button v-show="!postIsNull" :maxpage="page_count"></page-button>
        </div>
      </div>
      <black-mask :class="isProfileEditorActive" @click.native="openProfileEditor"></black-mask>
      <confirm-dialog :id="postCursor" :setpost="setupPost" @status="setConfirmStatus" :class="isDeletePostActive">
        <template v-slot:title>删除文章</template>
        <template v-slot:content>即将永久移除该文章,确定删除吗?</template>
      </confirm-dialog>
      <black-mask @click.native="setConfirmStatus('disable')" :class="isDeletePostActive"></black-mask>
    </div>
  </base-layout>
</template>

<script>
import PageButton from '@/components/PageButton'
import ConfirmDialog from '@/components/DelPost'
import BlackMask from '@/components/BlackMask'
import { BlogConfig } from '@/config/blog.config'
import BaseLayout from '@/components/BaseLayout'
const profileUpload = require('@/network/profileUpload')
export default {
  name: 'profile',
  data() {
    return {
      BlogConfig,
      imgTransform: '555',
      email: null,
      profile: {},
      isProfileEditorActive: 'disable',
      bannerImg: null,
      avatarImg: null,
      isMe: false,
      page_count: 0,
      post: null,
      isDeletePostActive: 'disable',
      postCursor: null
    }
  },
  computed: {
    postIsNull: function () {
      return (this.post === null)
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
      if (this.profile.avatar === '') {
        this.profile.avatar = 'assets/default-avatar.svg'
      } else {
        this.avatarImg = this.profile.avatar_img
        this.bannerImg = this.profile.banner_img
      }
      if (this.avatarImg === undefined) {
        this.avatarImg = BlogConfig.defaultAvatar
      }
      if (this.bannerImg === undefined) {
        this.bannerImg = BlogConfig.defaultBanner
      }
      this.email = this.profile.email
      document.title = `${this.profile.nickname} - ${this.BlogConfig.blogName}`
    },
    imgError(type) {
      if (type === 'avatar') {
        this.profile.avatar_img = BlogConfig.defaultAvatar
        this.avatarImg = this.profile.avatar_img
      }
      if (type === 'banner') {
        this.profile.banner_img = BlogConfig.defaultBanner
        this.bannerImg = this.profile.banner_img
      }
    },
    async setupPost() {
      this.post = null
      let res
      const query = this.$route.query
      const s = query.search === undefined ? '' : `&s=${query.search}`
      const page = this.$route.query.p === undefined ? 'page=1' : 'page=' + this.$route.query.p
      if (this.isMe) {
        res = await this.$get(`post/user?${page}${s}`)
      } else {
        res = await this.$get(`post/user?${page}&id=${this.$route.params.id}${s}`)
      }
      if (res.post.length <= 0) {
        this.page_count = 1
      } else {
        this.post = res.post
        this.page_count = res.page_count
      }
    },
    setConfirmStatus(status, id) {
      this.isDeletePostActive = status
      this.postCursor = id
    },
    openProfileEditor() {
      if (!this.isMe) return
      this.$refs.headerEditor.scrollTop = 0
      this.isProfileEditorActive = this.isProfileEditorActive === 'disable' ? 'active' : 'disable'
    },
    beforeUpload(type) {
      if (type === 'banner_img') {
        this.$refs.bannerIMG.click()
      }
      if (type === 'avatar_img') {
        this.$refs.avatarIMG.click()
      }
    },
    upload(event, type) { profileUpload.upload(this, event, type) },
    async updateNickname() {
      const res = await this.$post('user/profile', {
        nickname: this.$refs.nickname.value
      })
      if (res.status === 'ok') {
        this.profile.nickname = this.$refs.nickname.value
        document.title = `${this.profile.nickname} - ${this.BlogConfig.blogName}`
        this.$noty.success(res.msg, {
          killer: true
        })
        await this.setupPost()
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    },
    async changeEmail() {
      if (this.profile.email_verified === 0) {
        const res = await this.$post('user/verification', {
          type: 'email',
          id: this.profile.id,
          email: this.email
        })
        this.$noty.success(res.msg, {
          killer: true
        })
      }
      if (this.profile.email_verified === 1) {
        const res = await this.$post('user/verification', {
          type: 'email',
          id: this.profile.id
        })
        this.$noty.success(res.msg, {
          killer: true
        })
      }
    },
    async changePassword() {
      const res = await this.$post('user/verification', {
        type: 'password',
        id: this.profile.id
      })
      this.$noty.success(res.msg, {
        killer: true
      })
    },
    async loadProfile() {
      if (!this.$store.state.isLogin && this.$route.params.id === undefined) {
        await this.$router.push('/login')
        return
      }
      if (this.$route.params.id === undefined) this.$route.params.id = this.$store.state.profile.id
      const token = localStorage.getItem('accessToken')
      if (token !== null) {
        if (this.$route.params.id === this.$store.state.profile.id) {
          // is Me
          this.profile = this.$store.state.profile
          this.isMe = true
          this.profile.email = this.$store.state.profile.email
          this.setupProfile()
          await this.setupPost()
        } else {
          // is Not Me
          await this.setupPost()
          const res = await this.$get(`user/profile?id=${this.$route.params.id}`)
          if (res.status === 'error') {
            this.profile = {
              nickname: '该用户不存在',
              username: '404'
            }
            return
          }
          this.profile = res
          if (this.profile.id === this.$store.state.profile.id) {
            this.isMe = true
            this.profile.email = this.$store.state.profile.email
          } else { this.isMe = false }
          this.setupProfile()
        }
      } else {
        this.profile = await this.$get(`user/profile?id=${this.$route.params.id}`)
        if (this.profile.status === 'error') {
          this.profile = {
            nickname: '该用户不存在',
            username: '404'
          }
        }
        this.setupProfile()
        await this.setupPost()
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.loadProfile()
      },
      deep: true
    }
  },
  components: {
    PageButton,
    BlackMask,
    ConfirmDialog,
    BaseLayout
  },
  created() {
    this.loadProfile()
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Profile"
</style>
