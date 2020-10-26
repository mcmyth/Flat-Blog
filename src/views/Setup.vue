<template>
  <div id="account-container">
    <div id="account-content">
        <div id="account-title">完善资料</div>
        <div :style="'background-image: url(\'' + bannerImg +'\')'" @click="beforeUpload('banner_img')" id="header-banner">
          <div class="black-mask">
            <input @change="upload($event,'banner_img')" v-show="false" ref="bannerIMG" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"/>
            <div class="icon-container"><font-awesome-icon class="icon-upload" :icon="['fas', 'arrow-circle-up']" /></div>
            上传头图
          </div>
        </div>
      <hr>
        <div id="profile">
          <div id="username">
            <span class="item-title">更改昵称</span>
            <span class="tips">*仅支持10位英文/数字/下划线组成的字符<br/>*仅昵称可修改,用户名无法修改</span><br/>
            <input :value="profile.nickname" ref="nickname" type="text">
            <button @click="updateNickname">保存</button>
          </div>
          <div id="avatar-container">
            <div :style="'background-image: url(\'' + avatarImg +'\')'" id="avatar" @click="beforeUpload('avatar_img')">
              <div class="black-mask">
                <input @change="upload($event,'avatar_img')" v-show="false" ref="avatarIMG" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"/>
                <div class="icon-container"><font-awesome-icon class="menu-icon icon-upload" :icon="['fas', 'camera']" /></div>
                <div id="upload-avatar-text">上传头像</div>
              </div>
            </div>
          </div>

        </div>
      <hr>
        <div id="change-email">
          <span class="item-title">邮箱验证</span>
          <span class="tips">*请务必验证邮箱,否则该邮箱可以随时被任何人更改</span>
          <input class="readonly"  v-if="profile.email_verified === 1" type="text" :value="profile.email" readonly>
          <input  v-else  type="text" v-model="email">
          <button @click="changeEmail">发送验证邮件</button>
        </div>
      <hr>
      <router-link to="/" id="complete" tag="button">完成</router-link>
    </div>
  </div>
</template>

<script>
const profileUpload = require('@/network/profileUpload')
export default {
  name: 'Setup',
  data() {
    return {
      email: '',
      bannerImg: null,
      avatarImg: null,
      profile: {
        nickname: null,
        username: null,
        banner_img: null,
        avatar_img: null,
        email: null
      }
    }
  },
  methods: {
    async setupProfile() {
      await this.$store.dispatch('updateProfile')
      this.profile = this.$store.state.profile
      this.email = this.profile.email
      this.bannerImg = this.profile.banner_img
      this.avatarImg = this.profile.avatar_img
    },
    async updateNickname() {
      const res = await this.$post('user/profile', {
        nickname: this.$refs.nickname.value
      })
      if (res.status === 'ok') {
        this.profile.nickname = this.$refs.nickname.value
        this.$noty.success(res.msg, {
          killer: true
        })
        await this.setupPost()
      } else {
        this.$noty.error(res.msg, {
          killer: true
        })
      }
    },
    upload(event, type) { profileUpload.upload(this, event, type) },
    beforeUpload(type) {
      if (type === 'banner_img') {
        this.$refs.bannerIMG.click()
      }
      if (type === 'avatar_img') {
        this.$refs.avatarIMG.click()
      }
    },
    async changeEmail() {
      if (this.profile.email_verified === 0) {
        const res = await this.$post('user/verification', {
          type: 'email',
          id: this.profile.id,
          email: this.email
        })
        this.$noty.success(res.msg, {
          killer: true
        })
      }
      if (this.profile.email_verified === 1) {
        const res = await this.$post('user/verification', {
          type: 'email',
          id: this.profile.id
        })
        this.$noty.success(res.msg, {
          killer: true
        })
      }
    }
  },
  created() {
    if (this.$store.state.isLogin) {
      this.setupProfile()
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/style/views/Setup"
</style>
