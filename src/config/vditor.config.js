import { BlogConfig } from '@/config/blog.config'
import store from '@/store'
export const mobileToobBar = [
  'emoji',
  'link',
  'upload',
  'edit-mode',
  {
    name: 'more',
    toolbar: [
      'insert-after',
      'fullscreen',
      'preview',
      'info',
      'help'
    ]
  }
]

export const uploadConfig = {
  accept: 'image/*,.mp3, .wav',
  token: store.state.token,
  url: BlogConfig.apiURL + 'user/media',
  linkToImgUrl: '/api/upload/fetch',
  filename(name) {
    return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5.)]/g, '').replace(/[?\\/:|<>*[\]()$%{}@~]/g, '').replace('/\\s/g', '')
  }
}
