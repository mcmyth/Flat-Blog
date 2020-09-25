<template>
  <div id="post-container">
    <div id="post-body">
      <div id="post-header">
        <div id="post-title">Title</div>
        <div id="post-avatar"><img src="../assets/logo_512.png" height="512" width="512"/></div>
        <div id="nickname">MC Myth</div>
        <div id="post-toolbar">
          <div id="post-date">
            <span>由 MC Myth 更新于 2020/09/25 20:34</span>
          </div>
          <div id="post-option">
            <span id="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></span>
            <span id="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
          </div>
        </div>
      </div>
      <div id="post-context">
        balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabal
        abalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala
        balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala
      </div>
      <div id="post-comment">
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button id="submit-comment">发表评论</button>
      </div>
      <div id="post-comment-context">
        <div class="post-comment">
          <div class="post-comment-header">
            <span class="avatar"><img src="../assets/logo_512.png" height="512" width="512"/> MC Myth</span>
            <span class="time">2020/09/25</span>
          </div>
          <div class="post-comment-context">Comment</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post'
}
</script>

<style scoped lang="sass">
$foreground-color: #2196f3
$font-color: #2b2b2b
$page-weight: 90vw
@import "src/assets/style/public"
#post-container
  font-size: 15px
  color: $font-color
  #post-body
    width: $page-weight
    margin: 25px auto
    #post-context
      word-break: break-all
      margin: 15px 0
    #post-comment
      border-top: solid #bababa 1px
      padding-top: 15px
      margin-top: 10px
      textarea
        max-width: $page-weight
        width: $page-weight !important
        outline: none
        box-sizing: border-box
        margin: 0 !important
        height: 120px
        @include input
      #submit-comment
        float: right
        margin: 0
        @include button
        padding: 5px 15px
        margin-top: 10px !important
    #post-header
      position: relative
      #nickname
        position: absolute
        right: 55px
        top: 0
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
      #post-toolbar
        display: flex
        padding-top: 12px
        font-size: .8rem
        margin: 10px 0
        height: 30px
        align-items: center
        position: relative
        &::before
          content: ''
          width: 90vw
          position: absolute
          top: -3px
          border-top: solid #bababa 1px
      #post-date
        color: lighten($font-color,40%)
        flex: 1
      #post-option
        flex: 1
        text-align: right
        span
          @include btn-post-option
      #post-title
        display: inline-block
        font-size: 1.5rem
        margin-bottom: 10px
        max-width: calc(100% - 40px)
        color: #737373
        box-sizing: border-box
        word-break: break-all
        &::before
          content: '#'
          color: $foreground-color
          margin-right: 5px
        #post-avatar
          width: 30px
          height: 30px
          position: absolute
          right: 25px
          img
            width: 100%
            height: 100%
            border-radius: 50%
    #post-avatar
      display: inline-block
      height: 40px
      width: 40px
      position: absolute
      right: 0
      top: -5px
      img
        width: 100%
        height: 100%
        border-radius: 50%
      cursor: pointer
      &:hover + #nickname
        transform: translateX(-0) !important
        transition: transform .3s ease-in-out , opacity .3s ease-in-out !important
        opacity: 1 !important
  #post-comment-context
    clear: both
    .post-comment
      .post-comment-header
        display: flex
        align-items: center
        border-bottom: solid #b7b7b7 1px
        padding-bottom: 10px
        margin-bottom: 10px
        .time
          flex: 1
          text-align: right
          font-size: .8rem
          color: #808080
        .avatar
          flex: 1
          font-size: .9rem
          color: #5b5b5b
          img
            width: 40px
            height: 40px
            border-radius: 50%
            vertical-align: middle
            margin-right: 10px
</style>
