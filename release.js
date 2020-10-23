const env = require('./src/config/env.config')
const glob = require('glob')
const fs = require('fs')
const COS = require('cos-nodejs-sdk-v5')
const cos = new COS({
  SecretId: env.cos.secretId,
  SecretKey: env.cos.secretKey
})

const put = (localFilename, remoteFilename) => {
  return new Promise(resolve => {
    cos.putObject({
      Bucket: env.cos.Bucket,
      Region: env.cos.Region,
      Key: env.cos.remoteBasePath + remoteFilename,
      StorageClass: 'STANDARD',
      Body: fs.createReadStream(localFilename),
      onProgress: function (progressData) {
        // console.log(JSON.stringify(progressData));
      }
    }, (err, data) => {
      resolve(err || data)
    })
  })
}

const dist = './dist/'
const js = glob.sync(`${dist}js/` + '**/*.*').map(v => v.substr(`${dist}js/`.length)).filter(v => !v.endsWith('.map'))
const css = glob.sync(`${dist}css/` + '**/*.*').map(v => v.substr(`${dist}css/`.length)).filter(v => !v.endsWith('.map'))

const start = async () => {
  for (const task of js) {
    const result = await put(`${dist}js/${task}`, `js/${task}`)
    console.log(result)
  }
  for (const task of css) {
    const result = await put(`${dist}css/${task}`, `/css/${task}`)
    console.log(result)
  }
}
start()
