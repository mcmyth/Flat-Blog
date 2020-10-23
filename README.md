# Flat Blog

![npm version](https://img.shields.io/badge/npm-6.14.6-blue)![vue version](https://img.shields.io/badge/vue-2.6.11-brightgreen)![license](https://img.shields.io/badge/license-MIT-brightgreen)

**\*后端请移步到[Flat-Blog-Server](https://github.com/mcmyth/Flat-Blog-Server)**

一个扁平化设计的博客,基于Vue CLI 4.5.6和Sass样式预处理器进行开发,支持响应式采用前后端分离的SPA应用.使用腾讯云COS+CDN托管JavaScript和CSS以提高加载速度.

Demo: [https://blog.mc-myth.cn](https://blog.mc-myth.cn)

### 功能

1. 账户系统
   - 登录
   - 注册
   - 找回密码
   - 邮箱验证
   - 设置个人资料头像/头图
2. 文章系统
   - 发表文章(Markdown)
   - 删除文章
   - 发表/删除评论

更多功能开发中...

### 安装

```
npm install
```

### 编译和热重载进行开发
```
npm run serve
```

### 构建项目
```
npm run build
```

### 修复Eslint问题
```
npm run lint
```

### 配置项目

#### 基本配置

##### 配置后端api的URL

`src/config/blog.config.js`

```JavaScript
export const BlogConfig = {
  blogName: 'MC Myth Blog',
  apiURL: 'YOUR API URL',
  defaultAvatar: '/assets/default-avatar.svg',
  defaultBanner: '/assets/default-banner.jpg'
}
```

*如跨域须在后端`src/config/blog.config.ts的`CrossOrigin方法中配置allowedOrigins

#### 配置COS

用于自动发布*.js/\*.css文件到[腾讯云对象储存](https://cloud.tencent.com/product/cos)

新建文件`config/env.config.js`

````JavaScript
exports.cos = {
  secretId: 'YOUR ID',
  secretKey: 'YOUR KEY',
  Bucket: ' YOUR Bucket',
  Region: 'YOUR REGION',
  remoteBasePath: 'YOUR Path',
  assetsDomain: 'YOUR DOMAIN'
}
````

------

#### 移除COS配置

如果你不需要通过腾讯云COS托管.js/\*.css文件可参照以下方法移除相关代码.

1. 从`vue.config.js`中移除`config.set('externals', {...})`相关代码和`publicPath`.
2. 从`public/index.html`中移除`<% if (process.env.NODE_ENV === "production") { %> ... <% } %>`
3. 从`package.json`中的`scripts`对象中的`build`中移除`&& node release.js`

