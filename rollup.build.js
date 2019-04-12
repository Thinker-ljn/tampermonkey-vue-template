const rollup = require('rollup');
const config = require('./rollup.config').build;
const inputOptions = config;
const outputOptions = config.output;

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  console.log(`[INFO] 开始编译 ${inputOptions.input}`)
  await bundle.write(outputOptions);
  console.log(`[SUCCESS] 编译结束 ${outputOptions.file}`)
}

build()
