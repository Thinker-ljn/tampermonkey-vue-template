const packageJson = require('./package.json');
const identity = '// ==UserScript==\n'
const namespace = 'http://tampermonkey.net/'
const {name, version, description, author} = packageJson
const include = '*'
const banners = {namespace, name, version, description, author, include}
// banners.require = 'file:///' + process.cwd().replace(/\\/g, '/') + '/dist/bundle.js'

export default function gen () {
  const headerKeys = Object.keys(banners)
  const maxKeyLen = Math.max.apply(null, headerKeys.map(k => k.length))
  const headers = headerKeys.map(key => {
    const value = banners[key]
    const spaces = Array(maxKeyLen - key.length + 8).join(' ') 
    return `// @${key}${spaces}${value}\n`
  })

  return identity +
    headers.join('') +
    identity.replace('U', '/U')
}
