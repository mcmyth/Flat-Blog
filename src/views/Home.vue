<template>
  <div id="home-container">
    <div id="content">
      <div id="posts">
        <div v-for="(item, index) in posts" :key="index" class="post-container">
          <div class="post-image"><img src="../assets/banner.jpg"/></div>
          <div class="post">
            <div class="post-content">
              <div class="post-avatar"><img src="../assets/logo_512.png" height="512" width="512"/></div>
              <div class="post-title"><a href="/post/1">Title{{item}}</a></div>
              <hr>
              <div class="post-context">
                <div class="post-text">balabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbalabalabalabalbala</div>
              </div>
              <div class="post-footer">
                <div class="post-detail">
            <span class="post-time">
              <font-awesome-icon class="menu-icon login" :icon="['fas', 'clock']" />
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
          <div id="user-avatar"><img src="../assets/logo_512.png"/></div>
          <div id="user-nickname">MC Myth</div>
          <div id="user-username">@mcmyth</div>
          <a href="/profile/mcmyth"><button id="user-profile-btn">个人中心</button></a>

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
      posts: ['', '', '', '', '', '']
    }
  },
  components: {
    PageButton
  }
}
</script>
<style scoped lang="sass">
@import "/src/assets/style/public"
#home-container
  display: flex
  width: 75vw
  justify-content: center
  margin: 70px auto
  font-size: 15px
  #content
    font-size: 15px
    color: $font-color
    margin-bottom: 30px
    width: 80vw
  #user
    width: 300px
    border: 10px
    box-sizing: border-box
    padding-top: 16px
    a
      text-decoration: none
    .user-panel
      background-color: #f8f9fa
      position: relative
      border-radius: 10px
      padding-bottom: 15px
      margin-bottom: 15px
      transition: box-shadow 0.3s ease-in-out
      &:hover
        box-shadow: rgba(0,0,0,.09) 7px 7px 0px
      #user-image
        overflow: hidden
        height: 170px
        #user-banner
          position: relative
          transform: translate(-50%, -50%)
          left: 50%
          top: 50%
      #user-avatar
        $avatar-size: 70px
        border-radius: 50%
        border: solid white 2px
        overflow: hidden
        height: $avatar-size
        width: $avatar-size
        position: absolute
        top: 130px
        left: 50%
        transform: translateX(-50%)
        img
          height: $avatar-size
          width: $avatar-size
    #user-nickname
      font-weight: bold
      font-size: 1.1rem
    #user-username
      font-size: .9rem
      color: rgb(138, 138, 138)
    #user-nickname, #user-username
      text-align: center
#posts
  position: relative
  margin: 15px 30px 0 0
  .post-content
    .post-avatar
      width: 30px
      height: 30px
      position: absolute
      right: 25px
      img
        width: 100%
        height: 100%
        border-radius: 50%
  .post-container
    box-shadow: rgba(0,0,0,.06) 5px 5px 0px
    transition: box-shadow 0.3s ease-in-out
    border-radius: 5px
    &:hover
      box-shadow: rgba(0,0,0,.09) 7px 7px 0px
    .post-image
      height: 150px
      width: 100%
      overflow: hidden
      position: relative
      border-top-left-radius: 5px
      border-top-right-radius: 5px
      img
        min-height: 100%
        width: 100%
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        transition: transform .5s ease-in-out
    &:hover .post-image img
      transform: translate(-50%, -50%) scale(1.1)
  .post
    word-break: break-all
    color: #808080
    background-color: #F9F9F9
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
    padding: 20px
    margin-bottom: 25px
    .post-title
      font-size: 1.5rem
      margin-bottom: 10px
      max-width: calc(100% - 40px)
      a
        text-decoration: none
        color: #404040
        transition: color .2s ease-in-out
        &:hover
          color: $foreground-color
    .post-detail
      span:not(:last-child)
        margin-right: 15px
        display: inline-block
  .post-footer
    margin-top: 15px
    display: flex
    align-items: center
    .post-detail
      flex: 2
      font-size: .9rem
    .footer-more
      flex: 1
      justify-content: right
      text-align: right
      a.post-more
        @include button
        font-size: 10px
        display: inline-block
        text-decoration: none
        padding: 8px 13px
        margin: 0

#user-main
  overflow: hidden
  #user-image
    margin-bottom: 45px
  #user-profile-btn
    margin-top: 10px
    @include button
    width: 80%

@media screen and (max-width: 850px)
  #home-container
    flex-direction: column
    margin: 20px auto !important
    width: 90vw
  #content
    order: 2
    width: 90vw !important
    #posts
      margin: 0
  #user
    order: 1
    padding-top: 16px
    margin: 0 auto 15px auto
    width: 65vw !important
@media screen and (max-width: 480px)
  #user
    width: 80vw !important
  #posts
    .post-container
      .post-image
        height: 100px
  .post-footer
    flex-direction: column
    text-align: center
    .post-detail
      width: 100%
      order: 2
      margin-top: 10px
      font-size: 10px !important
      color: #aeaeae
    .footer-more
      order: 1
      width: 100%
      justify-content: center
      text-align: center !important
      a
        text-align: center
        width: 80%
@media screen and (max-width: 1280px)
  #home-container
    width: 90vw
</style>
