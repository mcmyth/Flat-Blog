<template>
  <div id="postedit-container">
    <div id="postedit-body">
      <div id="header-img">
        <div id="header-img-upload">
          <font-awesome-icon :icon="['fas', 'arrow-circle-up']" />
          <span>选择图片进行上传...<br/>(不上传以用户主页头图作为封面)</span>
        </div>
        <img src="../assets/banner.jpg" height="1080" width="1920"/>
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
@import "src/assets/style/public"
$page-width: 80vw
$min-page-width: 70vw
#postedit-container
  #postedit-body
    width: $page-width
    @media screen and (max-width: 600px)
      width: $min-page-width
      padding: 15px
    transition: box-shadow 0.3s ease-in-out
    margin: 25px auto
    background: white
    padding: 25px
    border-radius: 10px !important
    @include base-container
    #header-img
      height: 180px
      width: 100%
      margin-bottom: 20px
      position: relative
      img
        height: 100%
        object-fit: cover
        width: 100%
        border-radius: 10px
      #header-img-upload
        $bgcolor: #bec8d6
        width: 100%
        height: 100%
        background: #bec8d6
        position: absolute
        border-radius: 10px
        display: flex
        justify-content: center
        align-items: center
        color: white
        top: 0
        left: 0
        flex-direction: column
        font-size: 4.5rem
        cursor: pointer
        transition: background-color .2s ease-in-out
        user-select: none
        &:hover
          background-color: lighten($bgcolor,3%)
        &:active
          background-color: darken($bgcolor,3%)
        span
          font-size: .8rem
          display: inline-block
          margin-top: 10px
          text-align: center
    #postedit-editor
      margin-top: 25px
    #postedit-toolbar
      text-align: right
      button#submit-btn
        @include button
        margin-top: 10px
        display: inline-block
        padding: 10px 30px
    #postedit-header
      position: relative
      border-bottom: solid #bababa 1px
      padding-bottom: 8px
      #postedit-title
        display: inline-block
        font-size: 1.5rem
        color: #737373
        outline: none
        border: none
        background-color: transparent
        width: 100%
        max-width: calc(100% - 80px)
      #hashtag
        font-size: 1.5rem
        color: $foreground-color
        margin-right: 5px
      #postedit-avatar
        width: 30px
        height: 30px
        position: absolute
        right: 15px
        top: 0
        cursor: pointer
        img
          width: 100%
          height: 100%
          border-radius: 50%
        &:hover + #nickname
          transform: translateX(-0) !important
          transition: transform .3s ease-in-out , opacity .3s ease-in-out !important
          opacity: 1 !important
      #nickname
        position: absolute
        right: 55px
        top: -1px
        display: block
        background-color: #2196f3
        color: #fff
        height: 30px
        line-height: 30px
        border-radius: 5px
        padding: 3px 7px
        font-size: .8rem
        transform: translateX(-10px)
        transition: transform .2s ease-in-out , opacity .2s ease-in-out
        pointer-events: none
        opacity: 0
        &::before
          content: ''
          width: 0
          height: 0
          border-top: 5px solid transparent
          border-bottom: 5px solid transparent
          border-left: 5px solid #2196f3
          position: absolute
          right: -5px
          top: 50%
          transform: translateY(-50%)
</style>
