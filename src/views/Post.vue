<template>
  <div id="post-container">
    <div id="post-body">
      <div id="header-img"><img src="../assets/banner.jpg" height="1080" width="1920"/></div>
      <div id="post-header">
        <div id="post-title">Title{{$route.params.id}}</div>
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
        <span id="submit-comment-title">有什么想说的吗?</span>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button id="submit-comment">发表评论</button>
      </div>
      <div id="post-comment-context">
        <span id="post-comment-title">Comments</span>
        <div v-for="(item, index) of 5" :key="index" class="post-comment">
          <div class="post-comment-header">
            <span class="avatar">
              <img src="../assets/logo_512.png" height="512" width="512"/>
              <span class="comment-nickname">MC Myth</span>
            </span>
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
  @import "src/assets/style/views/Post"
</style>
