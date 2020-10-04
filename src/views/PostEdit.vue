<template>
  <div id="postedit-container">
    <div id="postedit-body">
      <div id="header-img">
        <div id="header-img-upload">
          <font-awesome-icon :icon="['fas', 'arrow-circle-up']" />
          <span>选择图片进行上传...<br/>(不上传以用户主页头图作为封面)</span>
        </div>
        <img src="/assets/default-banner.jpg" height="1080" width="1920"/>
      </div>
      <div id="postedit-header">
        <span id="hashtag">#</span>
        <input id="postedit-title" type="text" value="Title">
        <div id="postedit-avatar"><img src="../assets/logo_512.png" height="512" width="512"/></div>
        <div id="nickname">MC Myth</div>
      </div>
      <div id="postedit-editor">
        <div id="vditor"></div>
      </div>
      <div id="postedit-toolbar">
        <button id="submit-btn">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
import { mobileToobBar } from '@/config/vditor.config'
export default {
  name: 'PostEdit',
  data() {
    return {
      contentEditor: '',
      screenWidth: document.body.clientWidth
    }
  },
  mounted() {
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
      toolbar,
      after: () => {
        // this.contentEditor.setValue('hello, Vditor + Vue!')
      }
    })
  },
  methods: {
    show() {
      console.log(this.contentEditor.getHTML())
    }
  },
  watch: {
    screenWidth(val) {
      console.log(this.contentEditor.toolbar)
      if (val < 350) {
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/PostEdit"
</style>
