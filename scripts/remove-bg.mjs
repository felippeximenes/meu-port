import { removeBackground } from '@imgly/background-removal-node'
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('public', { recursive: true })

console.log('Removing background (may take ~30s on first run — downloads WASM model)...')
const blob = await removeBackground('public/assets/ChatGPT Image 20 de jul. de 2026, 23_22_57.png')
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync('public/assets/felippe2.png', buffer)
console.log('Done → public/assets/felippe2.png')
