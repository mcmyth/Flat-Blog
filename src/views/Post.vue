<template>
  <div id="post-container">
    <div id="post-body">
      <div id="header-img"><img @error="imgError('banner')" :src="post.user.banner_img"/></div>
      <div id="post-header">
        <div id="post-title">{{post.title}}</div>
        <div id="post-avatar"><img  @error="imgError('avatar')" :src="post.user.avatar_img"/></div>
        <div id="nickname">{{post.user.nickname}}</div>
        <div id="post-toolbar">
          <div id="post-date">
            <span>由 {{ post.user.nickname }} 更新于 {{ post.update_date }}</span>
          </div>
          <div id="post-option">
            <span id="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></span>
            <span id="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
          </div>
        </div>
      </div>
      <div id="post-context" v-html="post.content_html"></div>
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
import { BlogConfig } from '@/config/blog.config'
export default {
  name: 'Post',
  data() {
    return {
      BlogConfig,
      post: {
        title: null,
        content_html: null,
        update_time: null,
        user: {
          nickname: null,
          banner_img: null,
          avatar_img: null
        }
      }
    }
  },
  methods: {
    imgError(type) {
      if (type === 'avatar') {
        this.post.user.avatar_img = BlogConfig.defaultAvatar
      }
      if (type === 'banner') {
        this.post.user.banner_img = BlogConfig.defaultBanner
      }
    }
  },
  async created() {
    const post = await this.$get(`post/get?id=${this.$route.params.id}`)
    if (post.status === 'error') {
      // todo Not Found
    }
    this.post = post
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Post"
</style>
