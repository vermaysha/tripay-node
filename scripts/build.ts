import { execSync } from 'child_process'
import { buildSync } from 'esbuild'
import { rmSync, writeFileSync } from 'fs'
import { performance } from 'perf_hooks'
import { sync as globSync } from 'fast-glob'

const startTime: number = performance.now()

// Cleaning dist dir
console.log('\x1b[32mCleaning dist directory\x1b[0m')
rmSync('dist', {
  force: true,
  recursive: true,
})

// Generate entry-points for cjs compatibility
const target: string[] = ['ESNext', 'node8.17']
const entryPoints: string[] = globSync('./src/**/*.ts')

console.log('\x1b[34mBuilding dist for node (cjs)...\x1b[0m')
buildSync({
  entryPoints,
  outdir: './dist',
  bundle: false,
  sourcemap: false,
  minify: false,
  format: 'cjs',
  platform: 'node',
  target,
})

buildSync({
  entryPoints,
  outdir: './dist/esm',
  bundle: true,
  sourcemap: false,
  minify: false,
  splitting: true,
  format: 'esm',
  target,
  platform: 'node',
  outExtension: {
    '.js': '.mjs',
  },
  external: ['node-fetch'],
})
writeFileSync('./dist/esm/package.json', '{"type": "module"}', {
  flag: 'w',
})

console.log('\x1b[34mGenerating typescript declaration ...\x1b[0m')
execSync(
  'tsc --declaration --emitDeclarationOnly --declarationDir ./dist/types/',
)

const endTime: number = performance.now()
const executionTime: number = (endTime - startTime) / 1000
console.log(
  `\x1b[32mBuild Success with execution time ${executionTime.toFixed(
    2,
  )} s\x1b[0m`,
)
