export const upload = (source, evnet, type) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('type', type)
  formData.append(type, file)
  if (formData.get(type) !== undefined && file !== undefined) {
    source.$post('cos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      if (res.status === 'ok') {
        if (type === 'banner_img') source.bannerImg = res.link + '?ramdom=' + Math.random() * 10
        if (type === 'avatar_img') source.avatarImg = res.link + '?ramdom=' + Math.random() * 10
      }
    })
  }
}
