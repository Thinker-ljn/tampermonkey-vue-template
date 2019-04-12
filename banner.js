const oldPackageJson = require('./package.json')
// const tampermonkeyKey = [
//   'namespace', 'include', 'require', 'homepage', 'homepageURL', 'website', 'source', 'icon', 'iconURL', 
//   'defaulticon', 'icon64', 'icon64URL', 'updateURL', 'downloadURL', 'supportURL', 'match', 'exclude', 
//   'resource', 'connect', 'run-at', 'grant', 'noframes', 'unwrap', 'nocompat'
// ]
module.exports = function gen (packageJson, requireFile = '') {
  if (!packageJson) packageJson = oldPackageJson
  const identity = '// ==UserScript==\n'
  const namespace = 'http://tampermonkey.net/'
  const {name, version, description, author, tampermonkey} = packageJson
  const banners = {namespace, name, version, description, author}
  
  if (tampermonkey) {
    for (let key in tampermonkey) {
      banners[key] = tampermonkey[key]
    }
    if (!banners.include) {
      banners.include = '*'
    }
  }

  if (requireFile) {
    banners.require = (banners.require || []).concat('file:///' + process.cwd().replace(/\\/g, '/') + '/' + requireFile)
  }
  
  const headerKeys = Object.keys(banners)
  const maxKeyLen = Math.max.apply(null, headerKeys.map(k => k.length))
  const headers = headerKeys.map(key => {
    const value = banners[key]
    const spaces = Array(maxKeyLen - key.length + 8).join(' ')
    if (Array.isArray(value)) {
      return value.map(v => `// @${key}${spaces}${v}\n`).join('')
    }
    return `// @${key}${spaces}${value}\n`
  })

  return identity +
    headers.join('') +
    identity.replace('U', '/U')
}
