<template>
  <div id="postedit-container">
    <div id="postedit-body">
      <div id="header-img">
        <div @click="$refs.bannerIMG.click()" :class="bannerIMG !== '' ? 'active' : ''" id="header-img-upload">
          <font-awesome-icon :icon="['fas', 'arrow-circle-up']" />
          <span>选择图片进行上传...<br/>(不上传以用户主页头图作为封面)</span>
        </div>
        <input @change="updateBanner" v-show="false" ref="bannerIMG" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"/>
        <img :src="bannerIMG" height="1080" width="1920"/>
      </div>
      <div id="postedit-header">
        <span id="hashtag">#</span>
        <input v-model="post.title" id="postedit-title" type="text" value="Title">
        <div id="postedit-avatar"><img src="../assets/logo_512.png" height="512" width="512"/></div>
        <div id="nickname">MC Myth</div>
      </div>
      <div id="postedit-editor">
        <div id="vditor"></div>
      </div>
      <div id="postedit-toolbar">
        <span>
          <captcha-key ref="captchaKey"></captcha-key>
          <input v-model="captchaKey" type="text">
        </span>
        <span><button @click="submit" id="submit-btn">{{ $route.params.id.toLowerCase() === 'new' ? '发布' : '更新'}}</button></span>
      </div>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
import { mobileToobBar, uploadConfig } from '@/config/vditor.config'
import captchaKey from '@/components/captchaKey'
export default {
  name: 'PostEdit',
  data() {
    return {
      contentEditor: '',
      screenWidth: document.body.clientWidth,
      captchaKey: '',
      bannerIMG: '',
      post: {
        banner: '',
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this.setupEditor()
  },
  methods: {
    async setupContent() {
      const res = await this.$get(`post/edit?id=${this.$route.params.id.toLowerCase()}`)
      if (res.status === 'ok') {
        this.contentEditor.setValue(res.content)
        this.post.title = res.title
        if (res.header_img !== undefined && res.header_img !== '') {
          this.bannerIMG = res.header_img
        }
      } else {
        await this.$router.push('/postedit/new')
        this.$noty.error(res.msg, {
          killer: true
        })
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
          if (this.$route.params.id.toLowerCase() !== 'new') {
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
      formData.append('id', this.$route.params.id)
      formData.append('title', this.post.title)
      formData.append('content', this.post.content)
      formData.append('captchaKey', captchaKey)
      formData.append('header_img', bannerImgInput.files[0])
      const res = await this.$post('post/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.status === 'ok') {
        await this.$router.push('/postedit/' + res.post_id)
        this.$noty.success(res.msg, {
          killer: true
        })
      } else {
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
    captchaKey
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/PostEdit"
</style>
