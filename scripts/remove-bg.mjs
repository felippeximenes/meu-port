import { removeBackground } from '@imgly/background-removal-node'
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('public', { recursive: true })

console.log('Removing background (may take ~30s on first run — downloads WASM model)...')
const blob = await removeBackground('images/image.png')
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync('public/assets/felippe3.png', buffer)
console.log('Done → public/assets/felippe3.png')
