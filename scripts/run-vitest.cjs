'use strict'
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const cwd = process.cwd()
const repoRoot = path.join(__dirname, '..')

function resolveVitestBin() {
  const bases = [cwd, repoRoot]
  for (const base of bases) {
    try {
      const pkgJson = require.resolve('vitest/package.json', { paths: [base] })
      const vitestDir = path.dirname(pkgJson)
      const bin = path.join(vitestDir, 'vitest.mjs')
      if (fs.existsSync(bin)) return bin
    } catch {
      /* try next */
    }
  }
  return null
}

const bin = resolveVitestBin()
if (!bin) {
  console.error('Could not find vitest in node_modules.')
  process.exit(1)
}

const args = process.argv.slice(2)
const result = spawnSync(process.execPath, [bin, ...args], {
  stdio: 'inherit',
  cwd,
  env: process.env,
})

process.exit(result.status ?? 1)
