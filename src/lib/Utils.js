export const usernameIsValid = v => /^((?=.*[A-Z])|(?=.*[a-z]))[0-9a-zA-Z_]{3,10}$/.test(v)

export const passwordIsValid = v => /^(?=.*[0-9])(?=.*[a-zA-Z!@#$%^&*?+_])[a-zA-Z0-9!@#$%^&*?+_]{6,16}$/.test(v)

export const emailIsValid = v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)

export const decodeJwt = (token) => {
  const raw = String(token).split(' ').pop()
  const base64Url = raw.split('.')[1]
  if (base64Url !== undefined) {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(window.atob(base64))
  } else {
    return ''
  }
}
