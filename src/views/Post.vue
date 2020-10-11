<template>
  <div id="post-container">
    <div id="post-body">
      <div id="header-img"><img @error="imgError('banner')" :src="post.header_img"/></div>
      <div id="post-header">
        <div id="post-title">{{post.title}}</div>
        <div id="post-avatar"><img  @error="imgError('avatar')" :src="post.user.avatar_img"/></div>
        <div id="nickname">{{post.user.nickname}}</div>
        <div id="post-toolbar">
          <div id="post-date">
            <span>由 <span>{{ post.user.nickname }}</span> 更新于 <span>{{ post.update_date }}</span></span>
          </div>
          <div id="post-option">
            <router-link tag="span" :to="'/postedit/' + post.id" id="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></router-link>
            <span  @click="isDeletePostActive = 'active'" tag="span" id="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
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
              <img @error="imgError('avatar')" src="../assets/logo_512.png" height="512" width="512"/>
              <span class="comment-nickname">MC Myth</span>
            </span>
            <span class="time">2020/09/25</span>
          </div>
          <div class="post-comment-context">Comment</div>
        </div>
      </div>
    </div>
    <confirm-dialog :id="post.id" :setpost="setupPost"  @status="setConfirmStatus" :class="isDeletePostActive">
      <template v-slot:title>删除文章</template>
      <template v-slot:content>即将永久移除该文章,确定删除吗?</template>
    </confirm-dialog>
    <black-mask @click.native="setConfirmStatus('disable')" :class="isDeletePostActive"></black-mask>
  </div>
</template>

<script>
import { BlogConfig } from '@/config/blog.config'
import ConfirmDialog from '@/components/DelPost'
import BlackMask from '@/components/BlackMask'
export default {
  name: 'Post',
  data() {
    return {
      BlogConfig,
      isDeletePostActive: 'disable',
      post: {
        id: null,
        title: null,
        content_html: null,
        update_time: null,
        header_img: null,
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
        this.post.header_img = BlogConfig.defaultBanner
      }
    },
    async setupPost() {
      const res = await this.$get(`post/get?id=${this.$route.params.id}`)
      if (res.header_img === '') res.header_img = res.user.banner_img
      if (res.status === 'error') {
        await this.$router.push('/')
        this.$noty.error(res.msg, {
          killer: true
        })
        return
      }
      this.post = res
    },
    setConfirmStatus(status) {
      this.isDeletePostActive = status
    }
  },
  created() {
    this.setupPost()
  },
  components: {
    ConfirmDialog,
    BlackMask
  }
}
</script>

<style scoped lang="sass">
  @import "src/assets/style/views/Post"
</style>
