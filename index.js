import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// static images
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/music', express.static(path.join(__dirname, 'music')))
// หน้าแรก
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'))
})

// API: list รูปในโฟลเดอร์ images
app.get('/api/images', (req, res) => {
  const imageDir = path.join(__dirname, 'images')
  fs.readdir(imageDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read images folder' })

    // filter เฉพาะ jpg / jpeg / png
    const images = files.filter(f => /\.(jpe?g|png)$/i.test(f))
                        .map(f => `/images/${f}`) // path สำหรับ browser
    res.json(images)
  })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
