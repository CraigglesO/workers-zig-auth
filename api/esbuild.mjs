import esbuild from 'esbuild'

// BUNDLERS SUCK.
// no matter how convoluted, this works...

// step 1: migrate to dist folder
esbuild
  .buildSync({
    entryPoints: ['./src/index.ts'],
    format: 'esm',
    sourcemap: false,
    treeShaking: true,
    bundle: true,
    minify: true,
    outfile: './dist/worker.mjs'
  })
