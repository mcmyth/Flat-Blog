<template>
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
            <button>发送验证邮件</button>
          </div>
          <div class="edit-container-item password">
            <span>更改邮箱</span>
            <button>发送验证邮件</button>
          </div>
        </div>
      </div>
      <img @error="imgError('banner')" id="banner" :style="'transform:' + imgTransform" :src="bannerImg === null ? $store.state.profile.banner_img : bannerImg" height="1080" width="1920" alt="header"/>
      <div @click="openProfileEditor" id="avatar">
        <img @error="imgError('avatar')" :src="avatarImg === null ? $store.state.profile.avatar_img : avatarImg" height="512" width="512"/>
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
      <div id="void-content" v-show="postIsNull">还没有任何文章哦~</div>
      <div id="posts">
        <div v-for="(value, index) in post" :key="index" class="post">
          <div v-if="isMe" class="post-option">
            <span @click="$router.push('/postedit/' + value.id)" class="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></span>
            <span @click="setConfirmStatus('active', value.id)" class="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
          </div>
          <div class="post-title"><a href="/post">{{ value.title }}</a></div>
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
        <PageButton :maxpage="page_count"></PageButton>
      </div>
    </div>
    <black-mask :class="isProfileEditorActive" @click.native="openProfileEditor"></black-mask>
    <confirm-dialog :id="postCursor" :setpost="setupPost" @status="setConfirmStatus" :class="isDeletePostActive">
      <template v-slot:title>删除文章</template>
      <template v-slot:content>即将永久移除该文章,确定删除吗?</template>
    </confirm-dialog>
    <black-mask :class="isDeletePostActive"></black-mask>
  </div>
</template>

<script>
import PageButton from '@/components/PageButton'
import ConfirmDialog from '@/components/DelPost'
import BlackMask from '@/components/BlackMask'
import { BlogConfig } from '@/config/blog.config'
const profileUpload = require('@/network/profileUpload')
export default {
  name: 'profile',
  data() {
    return {
      imgTransform: '555',
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
      let res
      const page = this.$route.query.p === undefined ? 'page=1' : 'page=' + this.$route.query.p
      if (this.isMe) {
        res = await this.$get(`post/user?${page}`)
      } else {
        res = await this.$get(`post/user?${page}&id=${this.$route.params.id}`)
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
    deletePost() {},
    openProfileEditor() {
      this.$refs.headerEditor.scrollTop = 0
      console.log(this.$refs.headerEditor)
      if (this.isMe) this.isProfileEditorActive = this.isProfileEditorActive === 'disable' ? 'active' : 'disable'
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
        this.$noty.success(res.msg, {
          killer: true
        })
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    }
  },
  components: {
    PageButton,
    BlackMask,
    ConfirmDialog
  },
  async created() {
    if (this.$route.params.id === undefined) this.$route.params.id = this.$store.state.profile.id
    const token = localStorage.getItem('accessToken')
    if (token !== null) {
      this.profile = this.$store.state.profile
      console.log(this.profile)
      if (this.$route.params.id === this.profile.username) {
        // is Me
        this.isMe = true
        this.setupProfile()
        await this.setupPost()
      } else {
        // is Not Me
        this.isMe = false
        await this.setupPost()
        this.profile = await this.$get(`user/profile?id=${this.$route.params.id}`)
        this.setupProfile()
      }
    } else {
      this.profile = await this.$get(`user/profile?id=${this.$route.params.id}`)
      this.setupProfile()
      await this.setupPost()
    }
  },
  watch: {
    '$store.state.profile': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== null) {
          this.profile = newValue
          if (this.$route.params.id === this.profile.username) {
            // is Me
            this.isMe = true
          } else {
            // is Not Me
            this.isMe = false
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Profile"
</style>
