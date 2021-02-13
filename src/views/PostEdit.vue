<template>
  <base-layout>
    <div id="postedit-container">
      <div id="postedit-body">
        <div id="header-img">
          <div @click="$refs.bannerIMG.click()" :class="bannerIMG !== '' ? 'active' : ''" id="header-img-upload">
            <font-awesome-icon :icon="['fas', 'arrow-circle-up']" />
            <span>选择图片进行上传...<br/>(不上传以用户主页头图作为封面)</span>
          </div>
          <input @change="updateBanner" v-show="false" ref="bannerIMG" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"/>
          <img :src="bannerIMG" onload="this.style.opacity = 1"/>
        </div>
        <div id="postedit-header">
          <span id="hashtag">#</span>
          <input v-model="post.title" id="postedit-title" maxlength="255" type="text" value="Title">
          <div id="postedit-avatar">
            <router-link :to="'/profile/' + post.user.username">
              <img @error="imgError('avatar')" :src="post.user.avatar_img"/>
            </router-link>
          </div>
          <div id="nickname">{{ post.user.nickname }}</div>
        </div>
        <div id="postedit-editor">
          <div id="postedit-tips">
            <span>*上传的文件大小不得超过4MB</span>
            <span><a href="https://ld246.com/guide/markdown">使用说明</a></span>
          </div>
          <div id="vditor"></div>
        </div>
        <div id="postedit-toolbar">
        <span>
          <captcha-key ref="captchaKey"></captcha-key>
          <input @keypress.enter="submit" v-model="captchaKey" type="text">
        </span>
          <span>
          <router-link v-if="id.toLowerCase() !== 'new'" :to="'/post/' + $route.params.id" tag="button" id="view-btn">查看文章</router-link>
          <button @click="submit" id="submit-btn">{{ id.toLowerCase() === 'new' ? '发布' : '更新'}}</button>
        </span>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
import { mobileToobBar, uploadConfig } from '@/config/vditor.config'
import captchaKey from '@/components/captchaKey'
import { BlogConfig } from '@/config/blog.config'
import BaseLayout from '@/components/BaseLayout'
export default {
  name: 'PostEdit',
  data() {
    return {
      BlogConfig,
      contentEditor: '',
      screenWidth: document.body.clientWidth,
      captchaKey: '',
      bannerIMG: '',
      id: 'new',
      post: {
        banner: '',
        title: '',
        content: '',
        user: {
          avatar_img: null,
          nickname: null,
          username: null
        }
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.setupEditor()
  },
  methods: {
    init() {
      if (!this.$store.state.isLogin) this.$router.push('/login')
      if (typeof this.$route.params.id !== 'undefined') {
        this.id = this.$route.params.id
      }
      if (this.id.toLowerCase() === 'new') {
        document.title = `发表文章 - ${this.BlogConfig.blogName}`
        this.post.user.avatar_img = this.$store.state.profile.avatar_img
        this.post.user.nickname = this.$store.state.profile.nickname
        this.post.user.username = this.$store.state.profile.username
      }
    },
    async setupContent() {
      const res = await this.$get(`post/edit?id=${this.id.toLowerCase()}`)
      if (res.status === 'ok') {
        this.contentEditor.setValue(res.content_md)
        this.post.title = res.title
        this.post.user.avatar_img = res.user.avatar_img
        this.post.user.nickname = res.user.nickname
        this.post.user.username = res.user.username
        if (res.header_img !== undefined && res.header_img !== '' && res.header_img !== null) {
          this.bannerIMG = res.header_img
        }
        document.title = `${res.title} - ${this.BlogConfig.blogName}`
      } else {
        await this.$router.push('/postedit/new')
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    },
    imgError(type) {
      if (type === 'avatar') {
        this.post.user.avatar_img = BlogConfig.defaultAvatar
      }
      if (type === 'banner') {
        this.post.header_img = BlogConfig.defaultBanner
      }
    },
    setupEditor () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
      let toolbar
      if (this.screenWidth < 480) toolbar = mobileToobBar
      this.contentEditor = new Vditor('vditor', {
        minHeight: 550,
        height: window.innerHeight / 2,
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false
        },
        upload: uploadConfig,
        toolbar,
        after: () => {
          if (this.id.toLowerCase() !== 'new') {
            this.setupContent()
          }
        }
      })
    },
    async submit() {
      this.post.content = this.contentEditor.getValue()
      const captchaKey = this.captchaKey
      const bannerImgInput = this.$refs.bannerIMG
      const formData = new FormData()
      formData.append('id', this.id)
      formData.append('title', this.post.title)
      formData.append('content_md', this.post.content)
      formData.append('captchaKey', captchaKey)
      formData.append('header_img', bannerImgInput.files[0])
      const res = await this.$post('post/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      this.$refs.captchaKey.refreshCaptchaKey()
      if (res.status === 'ok') {
        if (this.id.toLowerCase() === 'new') {
          await this.$router.push('/postedit/' + res.post_id)
        }
        this.init()
        document.title = `${this.post.title} - ${this.BlogConfig.blogName}`
        this.$noty.success(res.msg, {
          killer: true
        })
      } else {
        this.captchaKey = ''
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    },
    updateBanner() {
      const bannerImgInput = this.$refs.bannerIMG
      const file = bannerImgInput.files[0]
      this.bannerIMG = URL.createObjectURL(file)
    }
  },
  watch: {
    screenWidth(val) {
      console.log(this.contentEditor.toolbar)
      if (val < 350) {
      }
    }
  },
  components: {
    captchaKey,
    BaseLayout
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/PostEdit"
</style>
