<template>
  <div id="post-container">
    <div id="post-body" :class="$store.state.loaded ? '' : 'hide'">
      <div id="header-img" ><img onload="this.style.opacity = 1"  @error="imgError('banner')" :src="post.header_img"/></div>
      <div id="post-header">
        <div id="post-title">{{post.title}}</div>
        <div id="post-avatar">
          <router-link :to="'/profile/' + post.user.username">
            <img onload="this.style.opacity = 1"  @error="imgError('avatar')" :src="post.user.avatar_img"/>
          </router-link>
        </div>
        <div id="nickname">{{post.user.nickname}}</div>
        <div id="post-toolbar">
          <div id="post-date">
            <span>由 <span>{{ post.user.nickname }}</span> 更新于 <span>{{ post.update_date }}</span></span>
          </div>
          <div v-if="post.user.id === $store.state.profile.id" id="post-option">
            <router-link tag="span" :to="'/postedit/' + post.id" id="post-edit"><font-awesome-icon class="menu-icon login" :icon="['fas', 'pen']" /></router-link>
            <span  @click="isDeletePostActive = 'active'" tag="span" id="post-delete"><font-awesome-icon class="menu-icon login" :icon="['fas', 'trash']" /></span>
          </div>
        </div>
      </div>
        <div id="post-context"></div>
      <div id="post-comment">
        <span id="submit-comment-title">发表评论</span>
        <textarea @keypress.ctrl.enter="postComment" v-model="commentValue" name="" id="" cols="30" rows="10"></textarea>
        <button @click="postComment" id="submit-comment">提交留言</button>
      </div>
      <div id="post-comment-context">
        <span v-show="!postIsNull" id="post-comment-title">Comments</span>
        <div v-for="(value, index) in comment" :key="index" class="post-comment">
          <div class="post-comment-header">
            <span class="avatar">
              <router-link :to="'/profile/' + value.user.username">
              <img onload="this.style.opacity = 1" @error="avatarImgError(index)" :src="value.user.avatar_img" :id="'comment_avatar_' + index"/>
              <span class="comment-nickname">{{ value.user.nickname }}</span>
                </router-link>
            </span>
            <span class="time">{{ value.comment_date }}</span>
          </div>
          <div class="post-comment-context">{{ value.content }}</div>
          <div class="post-comment-options">
            <span @click="delComment(value.id)" v-if="value.user.id === $store.state.profile.id">删除评论</span>
          </div>
        </div>
        <page-button v-show="!postIsNull" :maxpage="page_count"></page-button>
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
import PageButton from '@/components/PageButton'
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
export default {
  name: 'Post',
  data() {
    return {
      BlogConfig,
      isDeletePostActive: 'disable',
      commentValue: null,
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
      },
      comment: null,
      page_count: null
    }
  },
  computed: {
    postIsNull: function () {
      return (this.comment === null)
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
    avatarImgError(index) {
      document.querySelector(`#comment_avatar_${index}`).src = BlogConfig.defaultAvatar
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
      await Vditor.preview(document.querySelector('#post-context'), res.content_md)
      document.title = `${res.title} - ${this.BlogConfig.blogName}`
    },
    async setupComment() {
      this.comment = null
      this.commentValue = ''
      const query = this.$route.query
      const params = this.$route.params
      const page = query.p === undefined ? 'page=1' : 'page=' + query.p
      const res = await this.$get(`post/comment?id=${params.id}&${page}`)
      if (res.comment.length <= 0) {
        this.page_count = 1
      } else {
        this.comment = res.comment
        this.page_count = res.page_count
      }
    },
    setConfirmStatus(status) {
      this.isDeletePostActive = status
    },
    async postComment() {
      const res = await this.$post('post/comment', {
        post_id: this.post.id,
        comment_content: this.commentValue
      })
      if (res.status === 'ok') {
        this.$noty.success(res.msg, {
          killer: true
        })
        await this.setupComment()
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
      await this.setupComment()
    },
    async delComment(commentId) {
      const postId = Number(this.$route.params.id)
      const res = await this.$post('post/comment', {
        mode: 'del',
        post_id: postId,
        comment_id: commentId
      })
      if (res.status === 'ok') {
        this.$noty.success(res.msg, {
          killer: true
        })
        await this.setupComment()
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    }
  },
  created() {
    this.setupPost()
    this.setupComment()
  },
  mounted() {
  },
  components: {
    ConfirmDialog,
    BlackMask,
    PageButton
  }
}
</script>

<style lang="sass">
  @import "src/assets/style/views/Post"
</style>
