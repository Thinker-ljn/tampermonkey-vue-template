const gulp = require('gulp')
const rollup = require('rollup')
const bannerGen = require('./banner')
const watchOptions = require('./rollup.config').watch
const fs = require('fs')
const dist = 'dist'
gulp.task('watch-pkg-json', () => {
  gulp.watch('package.json', gulp.series('gen-banner'))
})

gulp.task('gen-banner', (cb) => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}))
  const headers = bannerGen(packageJson, watchOptions.output.file)
  if (!fs.existsSync(dist)){
    fs.mkdirSync(dist);
  }
  fs.writeFileSync(`${dist}/banner.js`, headers)
  cb()
})

gulp.task('watch-src', () => {
  gulp.watch('src/**', gulp.series('build'))
})

gulp.task('build', async () => {
  const bundle = await rollup.rollup(watchOptions);
  await bundle.write(watchOptions.output);
})

gulp.task('default', gulp.parallel('build', 'gen-banner', 'watch-src', 'watch-pkg-json'))
